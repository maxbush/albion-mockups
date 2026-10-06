import { chromium } from "playwright-core";
import fs from "node:fs";

const OUT = "/home/user/albion/qa";
fs.mkdirSync(OUT, { recursive: true });

const shots = [
  ["01-hero-start", 0],
  ["02-hero-mid", 0.45],
  ["03-hero-end", 0.92],
  ["04-route-head", null, "#route"],
  ["05-dossier-1", null, ".stack-pin:nth-child(1)"],
  ["06-dossier-2", null, ".stack-pin:nth-child(2)", 300],
  ["07-dossier-4", null, ".stack-pin:nth-child(4)", 200],
  ["08-diff", null, ".diff-pin", 100],
  ["09-world-mid", null, ".world", 0.35],
  ["10-world-end", null, ".world", 0.8],
  ["11-people", null, "#people"],
  ["12-proof", null, "#proof"],
  ["13-journal", null, "#journal"],
  ["14-consult", null, "#consult"],
  ["15-footer", null, ".footer"],
];

const run = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  for (const [name, heroP, sel, extra] of shots) {
    if (heroP !== null && heroP !== undefined) {
      await page.evaluate((p) => {
        const hero = document.querySelector(".hero");
        const total = hero.scrollHeight - window.innerHeight;
        window.scrollTo({ top: total * p, behavior: "instant" });
      }, heroP);
    } else if (sel) {
      await page.evaluate(([s, ex]) => {
        const el = document.querySelector(s);
        const r = el.getBoundingClientRect();
        // ex > 1 => pixel offset from element top; ex <= 1 => fraction of the
        // element's scrollable travel (for tall sticky scenes)
        const top =
          ex !== undefined && ex !== null && ex <= 1
            ? window.scrollY + r.top + (el.scrollHeight - window.innerHeight) * ex
            : window.scrollY + r.top - (ex ?? 60);
        window.scrollTo({ top, behavior: "instant" });
      }, [sel, extra]);
    }
    await page.waitForTimeout(1400);
    await page.screenshot({ path: `${OUT}/${name}.png` });
  }

  // mobile pass
  const m = await browser.newPage({ viewport: { width: 375, height: 740 } });
  await m.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await m.waitForTimeout(1200);
  await m.screenshot({ path: `${OUT}/m-01-hero.png` });
  for (const [name, sel] of [["m-02-dossier", ".stack-pin:nth-child(2)"], ["m-03-people", "#people"], ["m-04-consult", "#consult"]]) {
    await m.evaluate((s) => {
      const el = document.querySelector(s);
      window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 40, behavior: "instant" });
    }, sel);
    await m.waitForTimeout(900);
    await m.screenshot({ path: `${OUT}/${name}.png` });
  }
  // overflow check at 320
  const t = await browser.newPage({ viewport: { width: 320, height: 700 } });
  await t.goto("http://localhost:3000", { waitUntil: "networkidle" });
  const overflow = await t.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log("320px horizontal overflow:", overflow);
  await browser.close();
};

run();
