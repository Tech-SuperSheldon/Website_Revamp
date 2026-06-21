import { chromium } from 'playwright';
const b = await chromium.launch({ args:['--disable-dev-shm-usage','--no-sandbox','--disable-gpu','--single-process'] });
const ctx = await b.newContext({ viewport:{width:1440,height:980} });
const p = await ctx.newPage();
await p.goto('http://localhost:3000/new-home',{waitUntil:'networkidle',timeout:120000}).catch(()=>{});
await p.waitForTimeout(8000);
await p.evaluate(()=>window.scrollTo(0,0));
await p.waitForTimeout(500);
await p.screenshot({ path:'/tmp/shots/decisive-d.png' });
// also report painted state of header + headline bounding boxes
const r = await p.evaluate(()=>{
  const head = document.querySelector('header');
  const h1 = document.querySelector('h1');
  const bb = el => el? {top:Math.round(el.getBoundingClientRect().top),h:Math.round(el.getBoundingClientRect().height),op:getComputedStyle(el).opacity}:null;
  return { header: bb(head), h1: bb(h1) };
});
console.log(JSON.stringify(r));
await b.close();
