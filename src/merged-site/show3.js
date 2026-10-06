const { chromium } = require('playwright');
(async () => {
  const b = await chromium.connectOverCDP('http://localhost:29229');
  const ctx = b.contexts()[0];
  const pg = ctx.pages()[0] || await ctx.newPage();
  await pg.evaluate(() => {
    const img = [...document.querySelectorAll('img')].find(i => i.src.includes('portrait'));
    if (!img) return;
    const abs = img.getBoundingClientRect().top + scrollY;
    window.scrollTo({ top: abs - 140, behavior: 'instant' });
  });
  await pg.waitForTimeout(1500);
  const st = await pg.evaluate(() => ({ scrollY: Math.round(scrollY), tops: [...document.querySelectorAll('img')].filter(i => i.src.includes('portrait')).map(i => Math.round(i.getBoundingClientRect().top)) }));
  console.log(JSON.stringify(st));
  try { await pg.screenshot({ path: '/home/ubuntu/screenshots/people_live.png', timeout: 8000 }); console.log('shot ok'); } catch (e) { console.log('shot failed'); }
})();
