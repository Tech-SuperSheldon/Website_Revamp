import { chromium } from 'playwright';
const PORT = process.env.PORT || '3000';
const browser = await chromium.launch({ args: ['--disable-dev-shm-usage','--no-sandbox','--disable-gpu','--single-process'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();
await page.route('**/*.mp4', (r) => r.request().url().includes('/newsite/anim/') ? r.continue() : r.abort());
await page.goto(`http://localhost:${PORT}/new-home`, { waitUntil: 'domcontentloaded', timeout: 60000 });
const section = page.locator('section').filter({ hasText: 'The SuperSheldon Experience' }).first();
await section.scrollIntoViewIfNeeded();
await page.waitForTimeout(5000);
const dims = await section.locator('video').evaluateAll(vs => vs.map(v => ({
  src: v.currentSrc.split('/').slice(-2).join('/'),
  vw: v.videoWidth, vh: v.videoHeight,
  ratio: v.videoWidth && v.videoHeight ? +(v.videoWidth/v.videoHeight).toFixed(3) : null,
  boxW: Math.round(v.getBoundingClientRect().width), boxH: Math.round(v.getBoundingClientRect().height),
})));
console.log(JSON.stringify(dims, null, 2));
await ctx.close(); await browser.close();
