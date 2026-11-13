// Mini Arcade Service Worker (Offline & PWA Caching)
// CacheStorage is origin-wide; isolate this installation without deleting other apps' caches.
const CACHE_NAME = `mini-arcade-v3:${self.registration.scope}`;
const LEGACY_CACHE_NAME = 'mini-arcade-v2';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];
const SCOPE_URL = new URL(self.registration.scope);
const INDEX_URL = new URL('./index.html', SCOPE_URL).href;

function isLocal(url) {
  return url.origin === SCOPE_URL.origin && url.pathname.startsWith(SCOPE_URL.pathname);
}

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS.map((asset) => new Request(new URL(asset, SCOPE_URL), { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    // Keep previously visited games offline, but never migrate the stale hub HTML.
    // Leave the shared legacy cache intact: another scope may still depend on it.
    if ((await caches.keys()).includes(LEGACY_CACHE_NAME)) {
      const legacy = await caches.open(LEGACY_CACHE_NAME);
      const cache = await caches.open(CACHE_NAME);
      for (const request of await legacy.keys()) {
        const url = new URL(request.url);
        if (!isLocal(url) || url.pathname === SCOPE_URL.pathname || url.pathname === new URL(INDEX_URL).pathname) continue;
        if (!(await cache.match(request))) await cache.put(request, await legacy.match(request));
      }
    }
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  // Never intercept writes, external requests, or another app's URLs/cache entries.
  if (e.request.method !== 'GET' || !isLocal(new URL(e.request.url))) return;

  e.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    if (e.request.mode === 'navigate') {
      // HTML must revalidate online; cache-first leaves returning clients on old ticket UI.
      try {
        const response = await fetch(e.request, { cache: 'no-cache' });
        if (response.status === 200 && response.type === 'basic') {
          await cache.put(e.request, response.clone()).catch(() => {});
        }
        return response;
      } catch {
        return (await cache.match(e.request)) || (await cache.match(INDEX_URL)) || Response.error();
      }
    }

    const cached = await cache.match(e.request);
    if (cached) return cached;
    const response = await fetch(e.request);
    if (response.status === 200 && response.type === 'basic') {
      await cache.put(e.request, response.clone()).catch(() => {});
    }
    return response;
  })());
});
