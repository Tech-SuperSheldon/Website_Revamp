import { chromium } from 'playwright';
const OUT='/tmp/shots';
const b = await chromium.launch({ args:['--disable-dev-shm-usage','--no-sandbox','--disable-gpu','--single-process'] });
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
const p = await ctx.newPage();
await p.goto('http://localhost:3000/new-home',{waitUntil:'domcontentloaded'}).catch(()=>{});
await p.waitForTimeout(3500);
const info = await p.evaluate(()=>{
  const sec = document.querySelector('section');
  const r = sec.getBoundingClientRect();
  const h1 = document.querySelector('h1');
  const h1r = h1?.getBoundingClientRect();
  const imgs=[...sec.querySelectorAll('img')].map(i=>({src:(i.getAttribute('src')||'').replace(/%2F/g,'/').match(/url=([^&]+)/)?.[1]||i.getAttribute('src'),w:Math.round(i.getBoundingClientRect().width),h:Math.round(i.getBoundingClientRect().height),top:Math.round(i.getBoundingClientRect().top)}));
  return {section:{w:Math.round(r.width),h:Math.round(r.height),top:Math.round(r.top)}, h1:{text:h1?.innerText,top:Math.round(h1r?.top),h:Math.round(h1r?.height)}, imgs};
});
console.log(JSON.stringify(info,null,2));
const sec = await p.$('section');
await sec.screenshot({ path:`${OUT}/replica-hero-full.png` });
await b.close(); console.log('done');
