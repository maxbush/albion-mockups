#!/usr/bin/env node
// Post-build: prefix absolute /images/ references (next/image is unoptimized, CSS url(), inline styles)
// with the gh-pages subpath. Internal links and _next assets are prefixed by Next itself (basePath).
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "out");
const BASE = process.env.SITE_BASE_PATH ?? "/albion-mockups/albion-v2";
const EXT = new Set([".html", ".css", ".js", ".txt", ".json"]);
let files = 0;
let changed = 0;

function walk(d) {
  for (const name of readdirSync(d)) {
    const p = join(d, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (EXT.has(name.slice(name.lastIndexOf(".")))) {
      files++;
      const t = readFileSync(p, "utf8");
      // a quote, paren, equals sign or backslash-escaped quote directly before /images/ (not already prefixed)
      const next = t.replace(/(["'(=`]|\\")\/images\//g, `$1${BASE}/images/`);
      if (next !== t) {
        writeFileSync(p, next);
        changed++;
      }
    }
  }
}
walk(OUT);
console.log(`prefix-build: ${changed}/${files} files rewritten with ${BASE}/images/`);
