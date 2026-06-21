import { chromium } from 'playwright';

const PORT = process.env.PORT || '3000';
const TARGET = process.env.TARGET || 'hero'; // 'hero' | 'footer'
const url = `http://localhost:${PORT}/new-home`;

const browser = await chromium.launch({
  args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-gpu', '--single-process'],
});

const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.route('**/*.mp4', (r) => r.abort());
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(4000);

if (TARGET === 'hero') {
  const hero = page.locator('section').first();
  await hero.screenshot({ path: 'scripts/hero-desktop.png' });
  console.log('saved hero-desktop.png');
} else {
  // scroll to bottom so footer mounts/animates in, then capture the footer element
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2500);
  const footer = page.locator('footer').last();
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await footer.screenshot({ path: 'scripts/footer-desktop.png' });
  console.log('saved footer-desktop.png');
}

await ctx.close();
await browser.close();
