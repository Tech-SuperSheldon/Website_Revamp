import { chromium } from 'playwright';

const PORT = process.env.PORT || '3000';
const url = `http://localhost:${PORT}/new-home`;

const browser = await chromium.launch({
  args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-gpu', '--single-process'],
});

async function shot(width, height, file) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  // block videos to avoid OOM
  await page.route('**/*.mp4', (r) => r.abort());
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(4500);
  // full hero (top of page)
  await page.screenshot({ path: `scripts/${file}`, clip: { x: 0, y: 0, width, height } });
  await ctx.close();
  console.log('saved', file);
}

await shot(1440, 900, 'hero-desktop.png');
await shot(390, 844, 'hero-mobile.png');
await browser.close();
