const { chromium } = require('playwright');
(async () => {
  const b = await chromium.connectOverCDP('http://localhost:29229');
  const ctx = b.contexts()[0];
  const pages = ctx.pages();
  console.log(pages.map(p => p.url()).join('\n'));
  const pg = pages.find(p => p.url().includes(':4032')) || pages.find(p => p.url().includes('devinapps')) || pages[0];
  if (!pg.url().includes(':4032')) { await pg.goto('http://localhost:4032/en', { waitUntil: 'domcontentloaded' }); await pg.waitForTimeout(4000); }
  const y = parseInt(process.argv[2], 10);
  await pg.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y);
  await pg.waitForTimeout(1800);
  await b.close();
})();
