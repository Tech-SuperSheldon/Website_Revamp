import { chromium } from 'playwright';

const browser = await chromium.launch({ args: ['--disable-dev-shm-usage', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:3000/new-home', { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(2000);

const info = await page.evaluate(() => {
  function findSectionFor(text) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.textContent.includes(text)) {
        let el = node.parentElement;
        while (el && el.tagName !== 'SECTION') el = el.parentElement;
        if (el) {
          const rect = el.getBoundingClientRect();
          return { top: rect.top + window.scrollY, height: el.offsetHeight };
        }
      }
    }
    return null;
  }
  return {
    choose: findSectionFor('Why Choose'),
    anim: findSectionFor('SuperSheldon Experience'),
    app: findSectionFor('Try our app, LevelUp'),
    alex: findSectionFor('Ace Your Exams'),
  };
});
console.log(JSON.stringify(info, null, 2));

// screenshot near end of NSChoose (choose.top + choose.height - ~50px) to check for blank tail
const chooseEnd = info.choose.top + info.choose.height;
for (const y of [chooseEnd - 700, chooseEnd - 400, chooseEnd - 150, chooseEnd - 20]) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(400);
  await page.screenshot({ path: `/tmp/claude-1000/-workspaces-codespaces-blank-revamp-Website-Revamp/de32ffbf-726c-4087-a8a2-0cf259830396/scratchpad/after_choose_${Math.round(y)}.png` });
}

await browser.close();
