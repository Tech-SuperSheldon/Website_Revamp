import { chromium } from 'playwright';

const PORT = process.env.PORT || '3000';
const url = `http://localhost:${PORT}/new-home`;

const browser = await chromium.launch({
  args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-gpu', '--single-process'],
});

const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();

// Allow ONLY the SuperSheldon Experience clips; block every other video to spare memory.
await page.route('**/*.mp4', (r) => {
  r.request().url().includes('/newsite/anim/') ? r.continue() : r.abort();
});

await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(2000);

const section = page.locator('section').filter({ hasText: 'The SuperSheldon Experience' }).first();
await section.scrollIntoViewIfNeeded();
await page.waitForTimeout(5000); // let the 4 videos load + autoplay a frame
await section.screenshot({ path: 'scripts/supersheldon-experience.png' });
console.log('saved scripts/supersheldon-experience.png');

await ctx.close();
await browser.close();
