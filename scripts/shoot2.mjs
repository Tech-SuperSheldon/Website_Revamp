import { chromium } from 'playwright';

const URL = 'http://localhost:3000/new-home';
const OUT = '/tmp/shots';

const browser = await chromium.launch({
  args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-gpu', '--single-process'],
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
// block only big videos, keep images
await ctx.route('**/*', (route) => {
  const u = route.request().url();
  if (/\.(mp4|webm|mov|m4v)(\?|$)/i.test(u)) return route.abort();
  return route.continue();
});
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 120000 }).catch(() => {});
await page.waitForTimeout(4000); // let images paint + animations settle

// HERO
const hero = await page.$('#hero');
if (hero) { await hero.scrollIntoViewIfNeeded().catch(()=>{}); await page.waitForTimeout(1500);
  await hero.screenshot({ path: `${OUT}/focus-hero.png` }).catch(e=>console.log('hero err', e.message)); }

// Report whether hero student image is actually in DOM/visible
const heroImgInfo = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll('#hero img')].map(i => ({
    src: i.getAttribute('src')?.slice(0,60), natW: i.naturalWidth, natH: i.naturalHeight,
    w: Math.round(i.getBoundingClientRect().width), h: Math.round(i.getBoundingClientRect().height),
    opacity: getComputedStyle(i).opacity,
  }));
  const rot = document.querySelector('#hero h1')?.innerText;
  return { imgs, headline: rot };
});
console.log('HERO:', JSON.stringify(heroImgInfo, null, 2));

// COURSE TREE — find the section with "Focused Exam"
const treeShot = await page.evaluate(() => {
  const h2s = [...document.querySelectorAll('h2')];
  const t = h2s.find(h => /Focused Exam/i.test(h.innerText));
  if (!t) return null;
  const sec = t.closest('section');
  sec?.scrollIntoView();
  return true;
});
await page.waitForTimeout(2000);
if (treeShot) {
  const t = await page.evaluate(() => {
    const h2s = [...document.querySelectorAll('h2')];
    const t = h2s.find(h => /Focused Exam/i.test(h.innerText));
    const sec = t.closest('section');
    const r = sec.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: r.height };
  });
  await page.screenshot({ path: `${OUT}/focus-tree.png`, clip: { x: 0, y: t.top, width: 1440, height: Math.min(t.height, 1200) } }).catch(e=>console.log('tree err', e.message));
  // count rendered cards + their img sizes
  const cardInfo = await page.evaluate(() => {
    const h2s = [...document.querySelectorAll('h2')];
    const t = h2s.find(h => /Focused Exam/i.test(h.innerText));
    const sec = t.closest('section');
    const imgs = [...sec.querySelectorAll('img')].map(i => ({ src: i.getAttribute('src')?.slice(0,40), natW: i.naturalWidth, w: Math.round(i.getBoundingClientRect().width), h: Math.round(i.getBoundingClientRect().height) }));
    return imgs;
  });
  console.log('TREE IMGS:', JSON.stringify(cardInfo, null, 2));
}

await browser.close();
console.log('done');
