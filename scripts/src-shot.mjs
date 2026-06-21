import { chromium } from 'playwright';
const OUT='/tmp/shots';
const b = await chromium.launch({ args:['--disable-dev-shm-usage','--no-sandbox','--disable-gpu','--single-process'] });
for (const [label,w,h] of [['src-d',1440,900],['src-m',390,844]]) {
  const ctx = await b.newContext({ viewport:{width:w,height:h} });
  const p = await ctx.newPage();
  await p.goto('http://localhost:3100/',{waitUntil:'networkidle',timeout:120000}).catch(()=>{});
  await p.waitForTimeout(2500);
  await p.screenshot({ path:`${OUT}/${label}.png`, fullPage:false });
  await ctx.close();
}
await b.close(); console.log('source shots done');
