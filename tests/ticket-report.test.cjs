// Run: PLAYWRIGHT_MODULE=/path/to/playwright node --test tests/ticket-report.test.cjs
// Opens no real GitHub page and never submits an issue. Popup denial is fault-injected.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { once } = require('node:events');
let playwrightMod = process.env.PLAYWRIGHT_MODULE || 'playwright';
try { require.resolve(playwrightMod); } catch {
  for (const fb of ['/Users/hellmeet/.openclaw/workspace/micro-sfx/node_modules/playwright', '/Users/hellmeet/.hermes/cache/scratch/alatkilat-qa/node_modules/playwright']) {
    if (fs.existsSync(fb)) { playwrightMod = fb; break; }
  }
}
const { chromium } = require(playwrightMod);

async function withPage(blocked, exercise) {
  const html = fs.readFileSync(path.join(__dirname, '../index.html'));
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  let browser;
  try {
    browser = await chromium.launch({
      executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true
    });
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    // Block external fonts/navigation; ticket-list reads use an explicitly synthetic empty fixture.
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.hostname === '127.0.0.1') return route.continue();
      if (url.hostname === 'api.github.com') return route.fulfill({ json: [] });
      return route.abort();
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    if (blocked) await page.addInitScript(() => { window.open = () => null; });
    await page.goto(`http://127.0.0.1:${server.address().port}/`);
    await page.locator('#bugFab').click();
    await exercise(page, context);
    assert.deepEqual(errors, [], 'no uncaught page errors');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'no horizontal mobile overflow');
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}

async function enterDraft(page) {
  await page.locator('#bugGame').selectOption('hub / lainnya');
  await page.locator('#bugTitle').fill('Tombol & judul #1?');
  await page.locator('#bugDesc').fill('Baris pertama\nDetail = & ?');
}

async function assertDraftRetained(page) {
  assert.equal(await page.locator('#bugModal').evaluate(el => el.classList.contains('hidden')), false, 'draft stays visible, not auto-closed');
  assert.equal(await page.locator('#bugTitle').inputValue(), 'Tombol & judul #1?');
  assert.equal(await page.locator('#bugDesc').inputValue(), 'Baris pertama\nDetail = & ?');
  assert.doesNotMatch(await page.locator('#bugSend').innerText(), /✓|TERKIRIM|MENGIRIM/, 'opening a form is not sending a ticket');
  assert.equal(await page.locator('#bugSend').isEnabled(), true, 'retry remains available');
  const status = page.locator('#bugStatus');
  assert.equal(await status.count(), 1, 'must provide truthful draft status instead of sent success');
  assert.match(await status.innerText(), /belum terkirim/i);
  assert.match(await status.innerText(), /GitHub/);
  assert.ok(await status.evaluate(el => parseFloat(getComputedStyle(el).fontSize) >= 12), 'draft instructions need readable mobile text');
  assert.doesNotMatch(await page.locator('#bugSend').innerText(), /✓|TERKIRIM|MENGIRIM/);
  const fallback = page.locator('#bugIssueLink');
  assert.equal(await fallback.isVisible(), true, 'manual fallback remains available even when popup is denied');
  const url = new URL(await fallback.getAttribute('href'));
  assert.equal(url.origin, 'https://github.com');
  assert.equal(url.pathname, '/lwn2210/mini-arcade/issues/new');
  assert.equal(url.searchParams.get('title'), '[TICKET][hub / lainnya] Tombol & judul #1?');
  assert.match(url.searchParams.get('body'), /^Baris pertama\nDetail = & \?/);
  assert.equal(url.searchParams.get('labels'), 'ticket');
  assert.match(await fallback.getAttribute('rel'), /noopener/);
  return url;
}

test('opening GitHub draft never claims an issue was submitted', async () => {
  await withPage(false, async (page, context) => {
    await enterDraft(page);
    const popupPromise = context.waitForEvent('page');
    await page.locator('#bugSend').click();
    const popup = await popupPromise;
    assert.equal(await popup.evaluate(() => window.opener === null), true, 'external draft tab cannot access opener');
    await assertDraftRetained(page);
    await page.waitForTimeout(1350); // Guard the old auto-close timer.
    await assertDraftRetained(page);
    if (process.env.EVIDENCE_DIR) {
      fs.mkdirSync(process.env.EVIDENCE_DIR, { recursive: true });
      await page.screenshot({ path: path.join(process.env.EVIDENCE_DIR, 'mini-ticket-mobile.png') });
    }
  });
});

test('popup denial preserves draft and offers encoded GitHub fallback', async () => {
  await withPage(true, async page => {
    await enterDraft(page);
    await page.locator('#bugSend').click();
    await assertDraftRetained(page);
    await page.waitForTimeout(1350);
    await assertDraftRetained(page);
  });
});

test('mobile draft actions are readable and at least 44px tall', async () => {
  await withPage(true, async page => {
    for (const selector of ['#bugSend', '#bugCancel']) {
      const metrics = await page.locator(selector).evaluate(el => ({ height: el.getBoundingClientRect().height, font: parseFloat(getComputedStyle(el).fontSize) }));
      assert.ok(metrics.height >= 44, `${selector} needs a 44px touch target (actual ${metrics.height})`);
      assert.ok(metrics.font >= 12, `${selector} text must be readable`);
    }
    for (const label of await page.locator('.bug-box label').all()) {
      assert.ok(await label.evaluate(el => parseFloat(getComputedStyle(el).fontSize) >= 12), 'field labels must be readable');
    }
  });
});

test('empty title does not open a GitHub draft', async () => {
  await withPage(false, async (page, context) => {
    await page.locator('#bugTitle').fill('   ');
    await page.locator('#bugSend').click();
    assert.equal(context.pages().length, 1);
    assert.equal(await page.locator('#bugModal').isVisible(), true);
  });
});
