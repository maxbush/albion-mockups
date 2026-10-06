const { chromium } = require('playwright');
(async () => {
  const b = await chromium.connectOverCDP('http://localhost:29229');
  const ctx = b.contexts()[0];
  const pg = await ctx.newPage();
  const cdp = await ctx.newCDPSession(pg);
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 375, height: 780, deviceScaleFactor: 2, mobile: true });
  await pg.goto('http://localhost:4033/', { waitUntil: 'domcontentloaded' });
  await pg.waitForSelector('#menuBtn', { timeout: 8000 });
  await pg.waitForTimeout(2000);
  await pg.click('#menuBtn');
  await pg.waitForTimeout(900);
  try { await pg.screenshot({ path: '/home/ubuntu/screenshots/s07n_menu.png', timeout: 6000 }); console.log('menu ok'); } catch { console.log('menu fail'); }
  await pg.evaluate(() => { document.getElementById('mmenu').querySelector('.mmenu-tax').scrollIntoView(); });
  await pg.waitForTimeout(600);
  try { await pg.screenshot({ path: '/home/ubuntu/screenshots/s07n_menu2.png', timeout: 6000 }); } catch {}
  await cdp.send('Emulation.clearDeviceMetricsOverride', {});
  await pg.close(); await b.close();
  console.log('done');
})();
