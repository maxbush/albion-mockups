const { chromium } = require('playwright');
(async () => {
  const b = await chromium.connectOverCDP('http://localhost:29229');
  const ctx = b.contexts()[0];
  const pgs = ctx.pages();
  const pg = await ctx.newPage();
  await pg.goto('http://localhost:4033/?r=' + Date.now(), { waitUntil: 'domcontentloaded' });
  await pg.waitForTimeout(2000);
  await pg.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 50)); }
    document.querySelectorAll('.st,.rv').forEach(s => s.classList.add('in'));
    window.scrollTo(0, 5553);
  });
  await pg.waitForTimeout(1500);
  await pg.bringToFront();
})();
