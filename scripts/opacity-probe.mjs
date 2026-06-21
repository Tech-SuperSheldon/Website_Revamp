import { chromium } from 'playwright';
const b = await chromium.launch({ args:['--disable-dev-shm-usage','--no-sandbox','--disable-gpu','--single-process'] });
const ctx = await b.newContext({ viewport:{width:1440,height:980}, reducedMotion:'no-preference' });
const p = await ctx.newPage();
await p.goto('http://localhost:3000/new-home',{waitUntil:'domcontentloaded'}).catch(()=>{});
await p.waitForTimeout(5000);
const r = await p.evaluate(()=>{
  const h1 = document.querySelector('h1');
  const headlineWrap = h1?.parentElement?.parentElement; // motion.div centered block
  const studentImg = document.querySelector('img[src*="student-1"]');
  const studentWrap = studentImg?.closest('div[style]') || studentImg?.parentElement;
  const cs = el => el ? { opacity: getComputedStyle(el).opacity, transform: getComputedStyle(el).transform, visibility: getComputedStyle(el).visibility } : null;
  return {
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    headlineWrap: cs(headlineWrap),
    studentWrap: cs(studentWrap),
    h1: cs(h1),
  };
});
console.log(JSON.stringify(r,null,2));
await b.close();
