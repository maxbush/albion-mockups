const { chromium } = require('playwright');
(async () => {
  const b = await chromium.connectOverCDP('http://localhost:29229');
  const ctx = b.contexts()[0];
  const pg = ctx.pages()[0] || await ctx.newPage();
  const cdp = await ctx.newCDPSession(pg);
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await cdp.send('Emulation.clearDeviceMetricsOverride', {});
  await pg.setViewportSize({ width: 1440, height: 900 });
  await pg.goto('http://localhost:4031/', { waitUntil: 'networkidle' });
  await pg.waitForTimeout(3000);
  const target = await pg.evaluate(() => {
    const imgs = [...document.querySelectorAll('img')].filter(i => i.src.includes('portrait'));
    const sec = imgs[0] ? imgs[0].closest('section') || imgs[0].closest('div') : null;
    if (sec) { sec.scrollIntoView({ block: 'center' }); return { found: imgs.length, y: scrollY }; }
    return { found: 0 };
  });
  console.log(JSON.stringify(target));
  await pg.waitForTimeout(1200);
  await pg.screenshot({ path: '/home/ubuntu/screenshots/people_live.png' });
  console.log('done');
})();
