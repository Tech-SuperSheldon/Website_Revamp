import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const URL = 'http://localhost:3000/new-home';
const OUT = '/tmp/shots';
mkdirSync(OUT, { recursive: true });

const LAUNCH = {
  args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-gpu',
         '--disable-software-rasterizer', '--single-process',
         '--js-flags=--max-old-space-size=384', '--disable-extensions'],
};

const consoleErrors = [];

async function pass(label, width, height, stepPx) {
  const browser = await chromium.launch(LAUNCH);
  const ctx = await browser.newContext({ viewport: { width, height } });
  // block heavy media so the renderer doesn't OOM
  await ctx.route('**/*', (route) => {
    const u = route.request().url();
    if (/\.(mp4|webm|mov|m4v)(\?|$)/i.test(u)) return route.abort();
    return route.continue();
  });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(`[${label}] ${m.text()}`); });
  page.on('pageerror', (e) => consoleErrors.push(`[${label}] PAGEERROR ${e.message}`));

  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 120000 }).catch(() => {});
  // stop any videos that slipped through
  await page.addStyleTag({ content: 'video{display:none!important}' }).catch(() => {});
  await page.waitForTimeout(2500);

  let docH = 12000;
  try { docH = await page.evaluate(() => document.body.scrollHeight); } catch {}

  let y = 0, i = 0;
  while (y < docH) {
    try {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(900);
      const n = String(i).padStart(2, '0');
      await page.screenshot({ path: `${OUT}/${label}-${n}.png` });
    } catch (e) {
      consoleErrors.push(`[${label}] STEP ${i} crashed: ${e.message}`);
      break;
    }
    i++;
    y += stepPx;
    if (i > 45) break;
  }
  console.log(`${label}: docHeight=${docH}px, shots=${i}`);
  await browser.close().catch(() => {});
}

await pass('d', 1440, 900, 760);
await pass('m', 390, 844, 700);

console.log('\n=== CONSOLE ERRORS ===');
console.log(consoleErrors.length ? [...new Set(consoleErrors)].join('\n') : 'none');
