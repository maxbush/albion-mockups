#!/usr/bin/env node
// Crawls the built site through a local static server mimicking GitHub Pages and reports broken links/assets and text issues.
// usage: node scripts/crawl-check.mjs http://localhost:3200/albion-mockups/albion-v2
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = (process.argv[2] ?? "http://localhost:3200/albion-mockups/albion-v2").replace(/\/$/, "");
const ORIGIN = new URL(BASE).origin;
const PREFIX = new URL(BASE).pathname;
const pages = JSON.parse(readFileSync(join(ROOT, "src/generated/pages.json"), "utf8")).pages;
const urls = ["/", "/ru/", ...pages.map((p) => p.url)];
const cache = new Map();
async function ok(u) {
  if (cache.has(u)) return cache.get(u);
  let r = false;
  try { r = (await fetch(ORIGIN + u, { method: "GET" })).status === 200; } catch {}
  cache.set(u, r);
  return r;
}
const issues = [];
let n = 0;
for (const u of urls) {
  const res = await fetch(BASE + (u === "/" ? "/" : u));
  if (res.status !== 200) { issues.push(`${u}: HTTP ${res.status}`); continue; }
  n++;
  // canonical/hreflang are written for the production root (no mockup subpath), so they are skipped
  const html = (await res.text()).replace(/<link[^>]+rel="(?:canonical|alternate)"[^>]*>/g, "");
  const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ");
  if (/undefined|\[object|NaN|TBC|TODO|PLACEHOLDER/.test(text)) issues.push(`${u}: suspicious text (${(text.match(/undefined|\[object|NaN|TBC|TODO|PLACEHOLDER/) || [])[0]})`);
  if (!u.startsWith("/ru/") && /—/.test(text)) issues.push(`${u}: em dash in EN`);
  const refs = new Set();
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)"/g)) refs.add(m[1]);
  for (const r of refs) {
    if (!r.startsWith(PREFIX + "/") && r !== PREFIX) { issues.push(`${u}: unprefixed ${r}`); continue; }
    if (!(await ok(r))) issues.push(`${u}: broken ${r}`);
  }
}
console.log(`crawled ${n}/${urls.length} pages, ${cache.size} unique targets checked`);
console.log(issues.length ? "ISSUES:\n  " + [...new Set(issues)].slice(0, 80).join("\n  ") : "no issues");
