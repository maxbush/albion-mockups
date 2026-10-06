const { chromium } = require('playwright');
(async () => {
  const b = await chromium.connectOverCDP('http://localhost:29229');
  const ctx = b.contexts()[0];
  const pg = await ctx.newPage();
  await pg.goto('http://localhost:4035/', { waitUntil: 'domcontentloaded' });
  await pg.waitForTimeout(1500);
  const r = await pg.evaluate(() => ({ h: document.body.scrollHeight, title: document.title }));
  console.log(JSON.stringify(r));
  await pg.bringToFront();
  console.log('brought');
})();
