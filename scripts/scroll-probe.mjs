import { chromium } from 'playwright';
const PORT = process.env.PORT || '3000';
const browser = await chromium.launch({ args: ['--disable-dev-shm-usage','--no-sandbox','--disable-gpu','--single-process'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.route('**/*.mp4', (r) => r.abort());
await page.goto(`http://localhost:${PORT}/new-home`, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(2000);
await page.evaluate(() => window.scrollTo(0, 700));
await page.waitForTimeout(1500);
const info = await page.evaluate(() => {
  const h = document.querySelector('header');
  const r = h?.getBoundingClientRect();
  const cs = h ? getComputedStyle(h) : null;
  return {
    winScrollY: window.scrollY,
    docScrollTop: document.documentElement.scrollTop,
    bodyScrollTop: document.body.scrollTop,
    headerWidthPx: r ? Math.round(r.width) : null,
    headerBg: cs?.backgroundColor,
    headerBackdrop: cs?.backdropFilter,
  };
});
console.log(JSON.stringify(info, null, 2));
await ctx.close(); await browser.close();
