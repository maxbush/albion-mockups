const { chromium } = require('playwright');
(async () => {
  const b = await chromium.connectOverCDP('http://localhost:29229');
  const ctx = b.contexts()[0];
  const pg = ctx.pages()[0] || await ctx.newPage();
  const cdp = await ctx.newCDPSession(pg);
  const y = await pg.evaluate(() => {
    const img = [...document.querySelectorAll('img')].find(i => i.src.includes('portrait'));
    return img ? { top: Math.round(img.getBoundingClientRect().top), scrollY: Math.round(scrollY) } : null;
  });
  console.log('before:', JSON.stringify(y));
  if (y) {
    const target = y.scrollY + y.top - 220;
    for (let i = 0; i < 12; i++) {
      await pg.mouse.wheel(0, Math.round(target / 12));
      await pg.waitForTimeout(120);
    }
    await pg.waitForTimeout(800);
  }
  const after = await pg.evaluate(() => ({ scrollY: Math.round(scrollY), imgs: [...document.querySelectorAll('img')].filter(i => i.src.includes('portrait')).map(i => Math.round(i.getBoundingClientRect().top)) }));
  console.log('after:', JSON.stringify(after));
})();
