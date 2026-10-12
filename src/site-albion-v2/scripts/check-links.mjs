#!/usr/bin/env node
// Checks that every URL in lib/site.ts (P map) and every internal link in dictionaries exists as a page.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const pages = JSON.parse(readFileSync(join(ROOT, "src/generated/pages.json"), "utf8")).pages;
const urls = new Set(pages.map((p) => p.url));
const STATIC = new Set(["/", "/ru/"]);
const norm = (u) => (u === "/" ? "/" : u.replace(/\/$/, "") + "/");
const bad = [];

const site = readFileSync(join(ROOT, "src/lib/site.ts"), "utf8");
for (const m of site.matchAll(/:\s*"(\/[^"]*)"/g)) {
  const u = norm(m[1]);
  if (!urls.has(u) && !STATIC.has(u)) bad.push(`site.ts: ${u}`);
}

function walk(d, out = []) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(n)) out.push(p);
  }
  return out;
}
for (const f of walk(join(ROOT, "src/dictionaries")).concat(walk(join(ROOT, "src/components")))) {
  const t = readFileSync(f, "utf8");
  for (const m of t.matchAll(/href[=:]\s*[{]?\s*"(\/(?:ru\/)?[a-z][^"#?]*)"/g)) {
    const u = norm(m[1]);
    if (!urls.has(u) && !STATIC.has(u)) bad.push(`${f.slice(ROOT.length + 1)}: ${u}`);
  }
}
console.log(bad.length ? "BROKEN:\n  " + [...new Set(bad)].join("\n  ") : `links ok (${urls.size} pages)`);
process.exit(bad.length ? 1 : 0);
