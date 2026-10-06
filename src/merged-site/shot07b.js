const { chromium } = require('playwright');
(async () => {
  const b = await chromium.connectOverCDP('http://localhost:29229');
  const ctx = b.contexts()[0];
  const pg = await ctx.newPage();
  const cdp = await ctx.newCDPSession(pg);
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await pg.goto('http://localhost:4033/', { waitUntil: 'load' });
  await pg.waitForTimeout(2800);
  await pg.screenshot({ path: '/home/ubuntu/screenshots/s07n_hero.png' });
  // offers + map + finale via element scroll into view (top-only viewport shots)
  const sel = ['.offer-line', '.mapsec', '.finale .over'];
  for (const [i, s] of sel.entries()) {
    const el = await pg.$(s);
    if (el) { await el.scrollIntoViewIfNeeded(); await pg.waitForTimeout(900); }
    try { await pg.screenshot({ path: `/home/ubuntu/screenshots/s07n_${s.replace(/[^a-z]/g,'')}.png`, timeout: 6000 }); } catch { console.log('skip', s); }
  }
  // mobile menu
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 375, height: 780, deviceScaleFactor: 2, mobile: true });
  await pg.goto('http://localhost:4033/', { waitUntil: 'load' });
  await pg.waitForTimeout(2200);
  await pg.evaluate(() => document.getElementById('menuBtn').click());
  await pg.waitForTimeout(900);
  try { await pg.screenshot({ path: '/home/ubuntu/screenshots/s07n_menu.png', timeout: 6000 }); } catch { console.log('menu shot fail'); }
  await cdp.send('Emulation.clearDeviceMetricsOverride', {});
  await pg.close(); await b.close();
  console.log('done');
})();
