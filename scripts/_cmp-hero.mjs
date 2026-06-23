import { chromium } from 'playwright';
import fs from 'fs';
fs.mkdirSync('_cmp', { recursive: true });

const URL = 'http://localhost:3001/new-home';
const browser = await chromium.launch({
  args: ['--disable-dev-shm-usage', '--disable-gpu', '--no-sandbox', '--js-flags=--max-old-space-size=512'],
});
const page = await browser.newPage({ viewport: { width: 1536, height: 1024 } });
await page.goto(URL, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(4500);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(700);
await page.screenshot({ path: '_cmp/hero-top.png' });

// Capture parallax layer transforms at several scroll offsets
function probe() {
  return page.evaluate(() => {
    const all = [...document.querySelectorAll('*')];
    const out = [];
    for (const label of ['BACKGROUND', 'MIDGROUND', 'FOREGROUND', 'CONTENT']) {}
    // Grab elements that have a transform translate applied (parallax layers)
    const layers = all.filter(el => {
      const t = getComputedStyle(el).transform;
      return t && t !== 'none' && /matrix/.test(t);
    }).slice(0, 40).map(el => {
      const t = getComputedStyle(el).transform;
      const m = t.match(/matrix\(([^)]+)\)/);
      let ty = null;
      if (m) { const p = m[1].split(',').map(Number); ty = Math.round(p[5]); }
      const cls = (el.className && el.className.toString) ? el.className.toString().slice(0, 40) : '';
      return { ty, cls };
    }).filter(x => x.ty !== null && x.ty !== 0);
    return { scrollY: Math.round(window.scrollY), layers };
  });
}

const offsets = [0, 200, 400, 700];
const report = [];
for (const y of offsets) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(700);
  const p = await probe();
  report.push(p);
  await page.screenshot({ path: `_cmp/hero-scroll-${y}.png` });
  console.log(`scrollY=${p.scrollY} translatedLayers=${p.layers.length} -> ${JSON.stringify(p.layers.slice(0,10))}`);
}
console.log('done');
await browser.close();
