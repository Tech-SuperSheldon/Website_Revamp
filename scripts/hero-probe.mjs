import { chromium } from 'playwright';
const b = await chromium.launch({ args:['--disable-dev-shm-usage','--no-sandbox','--disable-gpu','--single-process'] });
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
await ctx.route('**/*', r => /\.(mp4|webm|mov|m4v)(\?|$)/i.test(r.request().url()) ? r.abort() : r.continue());
const p = await ctx.newPage();
await p.goto('http://localhost:3000/new-home',{waitUntil:'domcontentloaded'}).catch(()=>{});
await p.waitForTimeout(4000);
const info = await p.evaluate(() => {
  const out = [];
  document.querySelectorAll('#hero img').forEach(i=>{
    const r=i.getBoundingClientRect();
    out.push({src:(i.getAttribute('src')||'').replace(/%2F/g,'/').slice(0,55),natW:i.naturalWidth,w:Math.round(r.width),h:Math.round(r.height),top:Math.round(r.top),left:Math.round(r.left),op:getComputedStyle(i).opacity});
  });
  const wrap = document.querySelector('#hero .aspect-3\\/2');
  let wrapInfo=null;
  if(wrap){const r=wrap.getBoundingClientRect();wrapInfo={w:Math.round(r.width),h:Math.round(r.height),top:Math.round(r.top),left:Math.round(r.left)};}
  return {imgs:out, wrap:wrapInfo};
});
console.log(JSON.stringify(info,null,2));
await b.close();
