import { chromium } from 'playwright';

const url = 'http://localhost:3001/new-home';
const out = process.argv[2] || '/tmp/levelup.png';
const vw = parseInt(process.argv[3] || '1280', 10);
const vh = parseInt(process.argv[4] || '800', 10);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: vw, height: vh } });
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });

// Find the "Try our app, LevelUp" heading and scroll so its section is in view
const heading = page.getByText('Try our app, LevelUp');
await heading.scrollIntoViewIfNeeded();
await page.waitForTimeout(800);

await page.screenshot({ path: out });
console.log('saved', out);
await browser.close();
