import { chromium } from 'playwright';
const OUT = '/tmp/shots';
const URL = 'http://localhost:3000/new-home';
const b = await chromium.launch({ args:['--disable-dev-shm-usage','--no-sandbox','--disable-gpu','--single-process'] });
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
await ctx.route('**/*', r => /\.(mp4|webm|mov|m4v)(\?|$)/i.test(r.request().url()) ? r.abort() : r.continue());
const p = await ctx.newPage();
await p.goto(URL,{waitUntil:'domcontentloaded'}).catch(()=>{});
await p.waitForTimeout(4500);

// hero image height now?
const hero = await p.evaluate(() => {
  const img = [...document.querySelectorAll('#hero img')].find(i=>(i.getAttribute('src')||'').includes('p2.png'));
  const r = img?.getBoundingClientRect();
  const word = document.querySelector('#hero h1 span span span')?.textContent || document.querySelector('#hero h1')?.innerText;
  return { p2: img? {w:Math.round(r.width),h:Math.round(r.height)} : 'NOT FOUND', headline: document.querySelector('#hero h1')?.innerText };
});
console.log('HERO p2 size:', JSON.stringify(hero.p2), '| headline:', JSON.stringify(hero.headline));
const h = await p.$('#hero'); if(h){ await h.scrollIntoViewIfNeeded(); await p.waitForTimeout(1200); await h.screenshot({path:`${OUT}/v-hero.png`}); }

// parents section
await p.evaluate(()=>{const t=[...document.querySelectorAll('h2')].find(h=>/Hear it from/i.test(h.innerText));t?.closest('section')?.scrollIntoView();});
await p.waitForTimeout(1500);
await p.screenshot({path:`${OUT}/v-parents.png`});

// course tree
await p.evaluate(()=>{const t=[...document.querySelectorAll('h2')].find(h=>/Focused Exam/i.test(h.innerText));t?.closest('section')?.scrollIntoView();});
await p.waitForTimeout(1800);
await p.screenshot({path:`${OUT}/v-tree.png`});

await b.close();
console.log('done');
