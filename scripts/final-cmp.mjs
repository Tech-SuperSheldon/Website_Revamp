import { chromium } from 'playwright';
const OUT='/tmp/shots';
const b = await chromium.launch({ args:['--disable-dev-shm-usage','--no-sandbox','--disable-gpu','--single-process'] });
// desktop viewport
let ctx = await b.newContext({ viewport:{width:1440,height:980} });
let p = await ctx.newPage();
await p.goto('http://localhost:3000/new-home',{waitUntil:'domcontentloaded'}).catch(()=>{});
await p.waitForTimeout(3500);
await p.screenshot({ path:`${OUT}/final-d.png` });
const m = await p.evaluate(()=>({h1:document.querySelector('h1')?.innerText}));
console.log('desktop h1:', JSON.stringify(m.h1));
await b.close();

// mobile in fresh browser (single-process needs restart between contexts)
const b2 = await chromium.launch({ args:['--disable-dev-shm-usage','--no-sandbox','--disable-gpu','--single-process'] });
const ctx2 = await b2.newContext({ viewport:{width:390,height:844} });
const p2 = await ctx2.newPage();
await p2.goto('http://localhost:3000/new-home',{waitUntil:'domcontentloaded'}).catch(()=>{});
await p2.waitForTimeout(3500);
const sec = await p2.$('section');
await sec.screenshot({ path:`${OUT}/final-m.png` });
await b2.close();
console.log('done');
