import { chromium } from 'playwright';
const OUT='/tmp/shots';
const b = await chromium.launch({ args:['--disable-dev-shm-usage','--no-sandbox','--disable-gpu','--single-process'] });
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
const p = await ctx.newPage();
await p.goto('http://localhost:3000/new-home',{waitUntil:'domcontentloaded',timeout:120000}).catch(()=>{});
await p.waitForTimeout(3500);
// screenshot the hero section (first section) — viewport top
await p.screenshot({ path:`${OUT}/replica-d.png`, fullPage:false });
// measure hero pieces
const info = await p.evaluate(()=>{
  const imgs=[...document.querySelectorAll('section img')].slice(0,5).map(i=>({src:(i.getAttribute('src')||'').replace(/%2F/g,'/').match(/[^?]+/)?.[0]?.slice(0,40),w:Math.round(i.getBoundingClientRect().width),h:Math.round(i.getBoundingClientRect().height)}));
  const h1=document.querySelector('h1')?.innerText;
  return {h1,imgs};
});
console.log(JSON.stringify(info,null,2));
await b.close(); console.log('replica shot done');
