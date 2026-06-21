import { chromium } from 'playwright';

const PORT = process.env.PORT || '3000';
const url = `http://localhost:${PORT}/new-home`;

const browser = await chromium.launch({
  args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-gpu', '--single-process'],
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.route('**/*.mp4', (r) => r.abort());
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(2500);

// top (not scrolled)
await page.screenshot({ path: 'scripts/navbar-top.png', clip: { x: 0, y: 0, width: 1440, height: 200 } });

// scrolled (pill state)
await page.evaluate(() => window.scrollTo(0, 700));
await page.waitForTimeout(2200);
await page.screenshot({ path: 'scripts/navbar-scrolled.png', clip: { x: 0, y: 0, width: 1440, height: 200 } });

console.log('saved navbar-top.png and navbar-scrolled.png');
await ctx.close();
await browser.close();
