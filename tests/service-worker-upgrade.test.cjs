// Run: PLAYWRIGHT_MODULE=/path/to/playwright node --test tests/service-worker-upgrade.test.cjs
// Local HTTP fixtures only: no GitHub issue is opened or submitted.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const cp = require('node:child_process');
const { once } = require('node:events');
let playwrightMod = process.env.PLAYWRIGHT_MODULE || 'playwright';
try { require.resolve(playwrightMod); } catch {
  for (const fb of ['/Users/hellmeet/.openclaw/workspace/micro-sfx/node_modules/playwright', '/Users/hellmeet/.hermes/cache/scratch/alatkilat-qa/node_modules/playwright']) {
    if (fs.existsSync(fb)) { playwrightMod = fb; break; }
  }
}
const { chromium } = require(playwrightMod);
const root = path.join(__dirname, '..');
// Pin the actual pre-fix release, not HEAD^ (which moves when the fix is committed).
const oldHtml = cp.execFileSync('git', ['show', '2c1608a78bde27a828466717ba0318886ea84c8b:index.html'], { cwd: root });
const oldWorker = cp.execFileSync('git', ['show', 'e9e4276f51c43cb45d9068903d984eca823cd06a:sw.js'], { cwd: root });
const currentHtml = fs.readFileSync(path.join(root, 'index.html'));
const currentWorker = fs.readFileSync(path.join(root, 'sw.js'));

test('returning v2 client upgrades to current ticket HTML, stays fresh and works offline without clearing other scopes', { timeout: 60000 }, async () => {
  let upgraded = false;
  let laterHtml = false;
  const prefix = '/mini-arcade/'; // Exercise real Pages-style subpath hosting.
  const evidence = { initial: null, pageErrors: [] };
  const server = http.createServer((req, res) => {
    const pathname = new URL(req.url, 'http://fixture').pathname;
    let body;
    let type = 'text/html; charset=utf-8';
    if (pathname === prefix || pathname === prefix + 'index.html') {
      body = upgraded ? currentHtml : oldHtml;
      if (laterHtml) body = Buffer.from(body.toString().replace('<title>', '<title>FRESH-NAVIGATION '));
    } else if (pathname === prefix + 'sw.js') {
      body = upgraded ? currentWorker : oldWorker;
      type = 'application/javascript';
    } else if (pathname === prefix + 'offline-game.html') {
      body = '<title>Previously visited game</title><p>offline game fixture</p>';
    } else if (pathname === '/unrelated/resource.txt') {
      body = 'UNRELATED NETWORK';
      type = 'text/plain';
    } else if (pathname.startsWith(prefix)) {
      // Serve only the four real core assets needed by worker installation.
      const name = pathname.slice(prefix.length);
      if (['manifest.webmanifest', 'icon-192.png', 'icon-512.png'].includes(name)) {
        body = fs.readFileSync(path.join(root, name));
        type = name.endsWith('.png') ? 'image/png' : 'application/manifest+json';
      }
    }
    res.writeHead(body ? 200 : 404, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    res.end(body || 'not found');
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  let browser;
  try {
    browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
    const context = await browser.newContext();
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.hostname === '127.0.0.1') return route.continue();
      if (url.hostname === 'api.github.com') return route.fulfill({ json: [] });
      return route.abort();
    });
    const page = await context.newPage();
    page.on('pageerror', error => evidence.pageErrors.push(error.message));
    const base = `http://127.0.0.1:${server.address().port}${prefix}`;
    await page.goto(base);
    await page.evaluate(() => navigator.serviceWorker.ready);
    await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller));
    await page.reload();
    evidence.initial = await page.locator('#bugSend').textContent();
    assert.equal(evidence.initial, 'KIRIM TICKET', 'fixture must be the old controlled returning client');
    evidence.oldCacheWarm = await page.evaluate(async () => {
      const cache = await caches.open('mini-arcade-v2');
      return (await (await cache.match(location.href)).text()).includes('KIRIM TICKET');
    });
    assert.equal(evidence.oldCacheWarm, true);
    // A real visited game must remain available after migration, not only the hub.
    await page.goto(base + 'offline-game.html');
    await page.waitForFunction(async () => Boolean(await (await caches.open('mini-arcade-v2')).match(location.href)));
    await page.goto(base);
    await page.evaluate(async () => {
      for (const name of ['unrelated-app-v1', 'mini-arcade-v3-other-scope']) {
        await (await caches.open(name)).put('/unrelated/resource.txt', new Response('UNRELATED CACHED'));
      }
      // A second installation may share the legacy cache on this origin.
      await (await caches.open('mini-arcade-v2')).put('/another-arcade/index.html', new Response('OTHER SCOPE LEGACY'));
    });
    const oldController = await page.evaluate(() => navigator.serviceWorker.controller.scriptURL);
    upgraded = true;
    assert.match(await (await context.request.get(base)).text(), /BUKA DRAF GITHUB/, 'network serves the current ticket fix');
    // Wait for the replacement controller, not a race-prone immediate reload.
    evidence.workerReplaced = await page.evaluate(async () => {
      const previous = navigator.serviceWorker.controller;
      const registration = await navigator.serviceWorker.getRegistration();
      await registration.update();
      return Promise.race([
        new Promise(resolve => {
          if (navigator.serviceWorker.controller !== previous) return resolve(true);
          navigator.serviceWorker.addEventListener('controllerchange', () => resolve(navigator.serviceWorker.controller !== previous), { once: true });
        }),
        new Promise(resolve => setTimeout(() => resolve(false), 5000))
      ]);
    });
    await page.reload();
    evidence.afterUpgrade = await page.locator('#bugSend').textContent();
    assert.equal(evidence.afterUpgrade, 'BUKA DRAF GITHUB', 'returning client must recover actual current HTML after worker update and navigation');
    assert.equal(evidence.workerReplaced, true, 'a new worker must actually activate');
    assert.equal(await page.evaluate(() => navigator.serviceWorker.controller.scriptURL), oldController, 'worker URL and scope stay unchanged');
    await page.evaluate(() => { window.open = () => null; });
    await page.locator('#bugFab').click();
    await page.locator('#bugTitle').fill('Returning-client disposable test');
    await page.locator('#bugDesc').fill('Local only, not submitted');
    await page.locator('#bugSend').click();
    await page.waitForTimeout(1400);
    evidence.deniedPopupLabel = await page.locator('#bugSend').textContent();
    assert.doesNotMatch(evidence.deniedPopupLabel, /TERKIRIM|✓/);
    assert.equal(await page.locator('#bugModal').isVisible(), true, 'no false-success auto-close');
    assert.match(await page.locator('#bugStatus').textContent(), /belum terkirim/i);
    assert.equal(await page.locator('#bugIssueLink').isVisible(), true);
    assert.equal(await page.locator('#bugTitle').inputValue(), 'Returning-client disposable test');
    // HTML-only follow-up must recover with the same worker, not another version bump.
    laterHtml = true;
    await page.goto(base + 'index.html');
    assert.match(await page.title(), /FRESH-NAVIGATION/);
    await page.goto(base);
    assert.match(await page.title(), /FRESH-NAVIGATION/);
    evidence.htmlOnlyFollowupFresh = true;
    evidence.cacheIsolation = await page.evaluate(async () => {
      const keys = await caches.keys();
      return {
        unrelated: await (await (await caches.open('unrelated-app-v1')).match('/unrelated/resource.txt')).text(),
        otherMini: await (await (await caches.open('mini-arcade-v3-other-scope')).match('/unrelated/resource.txt')).text(),
        legacyOtherScope: await (await (await caches.open('mini-arcade-v2')).match('/another-arcade/index.html')).text(),
        unrelatedFetch: await (await fetch('/unrelated/resource.txt')).text(),
        keys
      };
    });
    assert.equal(evidence.cacheIsolation.unrelated, 'UNRELATED CACHED');
    assert.equal(evidence.cacheIsolation.otherMini, 'UNRELATED CACHED');
    assert.equal(evidence.cacheIsolation.legacyOtherScope, 'OTHER SCOPE LEGACY');
    assert.equal(evidence.cacheIsolation.unrelatedFetch, 'UNRELATED NETWORK', 'do not globally match another app cache');
    // Playwright context offline does not reliably disable SW-owned requests with routing.
    // Stop the real origin as well, so fallback requires an actual failed network fetch.
    await new Promise(resolve => server.close(resolve));
    await context.setOffline(true);
    await page.reload();
    assert.equal(await page.locator('#bugSend').textContent(), 'BUKA DRAF GITHUB');
    assert.match(await page.title(), /FRESH-NAVIGATION/);
    await page.goto(base + 'index.html');
    assert.equal(await page.locator('#bugSend').textContent(), 'BUKA DRAF GITHUB');
    await page.goto(base + 'offline-game.html');
    assert.equal(await page.title(), 'Previously visited game', 'old visited game survives cache upgrade offline');
    const fallbackResponse = await page.goto(base + 'never-cached.html');
    evidence.offlineFallbackDiagnostic = { status: fallbackResponse.status(), viaWorker: fallbackResponse.fromServiceWorker(), html: (await page.content()).slice(0, 300) };
    assert.equal(await page.locator('#bugSend').textContent(), 'BUKA DRAF GITHUB', 'uncached offline navigation falls back to current shell');
    evidence.offline = { root: true, index: true, migratedGame: true, shellFallback: true };
    assert.deepEqual(evidence.pageErrors, []);
    evidence.passed = true;
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
    if (process.env.EVIDENCE_DIR) {
      fs.mkdirSync(process.env.EVIDENCE_DIR, { recursive: true });
      fs.writeFileSync(path.join(process.env.EVIDENCE_DIR, 'service-worker-upgrade.json'), JSON.stringify(evidence, null, 2) + '\n');
    }
    console.log(JSON.stringify(evidence, null, 2));
  }
});
