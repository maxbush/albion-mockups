#!/usr/bin/env node
// Build-time content pipeline: wave1 markdown → src/generated/pages.json
// Rules: wave1/HANDOFF.md — strip production markers (##### tails, > URL:, ⏳,
// [TBC]/[SCHOOL]/[PRICE TBC]/[SHOWCASE]/[КЕЙС] → HTML comments), keep internal links.
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = join(ROOT, "content");
const OUT = join(ROOT, "src", "generated");
const warnings = [];

/* ---------- helpers ---------- */
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function csvRows(text) {
  const rows = [];
  let row = [], cell = "", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else inQ = false; }
      else cell += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); cell = ""; rows.push(row); row = [];
    } else cell += c;
  }
  if (row.length || cell) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.length && r.some((c) => c.trim()));
}

/* ---------- taxonomy: EN↔RU pairs ---------- */
function loadPairs() {
  const rows = csvRows(readFileSync(join(CONTENT, "taksonomiya-saita.csv"), "utf8").replace(/^﻿/, ""));
  const head = rows[0];
  const iEN = head.indexOf("URL_EN"), iRU = head.indexOf("URL_RU");
  const pairs = {};
  for (const r of rows.slice(1)) {
    const en = (r[iEN] || "").trim(), ru = (r[iRU] || "").trim();
    if (en && ru) { pairs[en] = ru; pairs[ru] = en; }
  }
  return pairs;
}

/* ---------- RU meta files ---------- */
function pickRow(table, n) {
  for (const line of table.split("\n")) {
    const m = line.match(/^\|\s*(\d+)\s*\|\s*(.+?)\s*\|/);
    if (m && +m[1] === n) return m[2].replace(/\s*\|.*$/, "").trim();
  }
  return null;
}
function ruMeta(file) {
  if (!file || !existsSync(file)) return {};
  const t = readFileSync(file, "utf8");
  const rec = (t.match(/Рекомендация:\s*#(\d+)/) || [])[1] || "1";
  const titleBlock = (t.match(/##\s*Title[\s\S]*?(?=\n##\s|$)/) || [""])[0];
  const descBlock = (t.match(/##\s*Description[\s\S]*?(?=\n##\s|$)/) || [""])[0];
  const h1 = (t.match(/##\s*H1[^\n]*\n([^\n]+)/) || [])[1];
  return { title: pickRow(titleBlock, rec), description: pickRow(descBlock, rec), h1: h1?.trim() };
}

/* ---------- EN meta.csv ---------- */
function enMeta() {
  const map = {};
  const csv = join(CONTENT, "en", "meta.csv");
  if (!existsSync(csv)) return map;
  const rows = csvRows(readFileSync(csv, "utf8"));
  for (const r of rows.slice(1)) {
    const [file, url, title, description] = r;
    if (file) map[file.trim()] = { url: url?.trim(), title: title?.trim(), description: description?.trim() };
  }
  return map;
}

/* ---------- inline markdown → html ---------- */
function inline(s, todos) {
  let out = esc(s);
  // strip placeholder tokens inline: [ШКОЛА-1], [SCHOOL-1], [PRICE TBC: ...], [TBC], [КЕЙС …]
  out = out.replace(/\[([^\]]*(?:TBC|SCHOOL|ШКОЛА|КЕЙС|PRICE|SHOWCASE|ТЗ)[^\]]*)\]/gi, (m) => {
    todos.push(m);
    return "";
  });
  // leftover ⏳ fragments
  if (out.includes("⏳")) { todos.push(out.trim()); return ""; }
  // links: [text → /url/] and [text](/url/)
  out = out.replace(/\[([^\]]+?)\s*→\s*(\/[^\]\s]+)\]/g, '<a class="link-hair" href="$2">$1</a>');
  out = out.replace(/\[([^\]]+?)\]\((\/[^)\s]+)\)/g, '<a class="link-hair" href="$2">$1</a>');
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(?<![\w*])\*([^*\n]+)\*(?![\w*])/g, "<em>$1</em>");
  out = out.replace(/(?<![\w_])_([^_\n]+)_(?![\w_])/g, "<em>$1</em>");
  return out;
}

/* ---------- block parser ---------- */
function parseBlocks(md, page) {
  const todos = [];
  const lines = md.split("\n");
  const blocks = [];
  let i = 0;
  const isHeading = (l) => l.match(/^(#{1,4})\s+(.*)/);
  const isBlokLabel = (l) => /^##\s+Блок\s+\d/.test(l) || /^#\s+FINAL\b/.test(l);
  const isHr = (l) => /^---\s*$/.test(l);
  const isTodoLine = (l) =>
    /^\s*>\s*(URL|STATUS|Draft)\b/i.test(l) ||
    /^#####\s/.test(l) ||
    (/⏳/.test(l) && l.trim().startsWith("[")) ||
    /^\s*\[(?:TBC|⏳)/.test(l.trim()) ||
    /^\s*>\s*⏳/.test(l);

  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();
    if (!t || isTodoLine(t)) { i++; continue; }
    if (isBlokLabel(t)) { i++; continue; }
    if (isHr(t)) { blocks.push({ type: "hr" }); i++; continue; }

    const h = isHeading(t);
    if (h) {
      const lvl = h[1].length;
      blocks.push({ type: `h${Math.min(lvl, 3)}`, text: inline(h[2], todos) });
      i++; continue;
    }
    // table
    if (t.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const r = lines[i].trim();
        if (!/^\|[\s:|-]+\|$/.test(r)) {
          rows.push(r.slice(1, r.endsWith("|") ? -1 : undefined).split("|").map((c) => c.trim()));
        }
        i++;
      }
      if (rows.length) blocks.push({ type: "table", header: rows[0].map((c) => inline(c, todos)), rows: rows.slice(1).map((r) => r.map((c) => inline(c, todos))) });
      continue;
    }
    // blockquote (multi-line)
    if (t.startsWith(">")) {
      const q = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) { q.push(lines[i].trim().replace(/^>\s?/, "")); i++; }
      const text = q.join(" ").trim();
      if (text && !/^(URL|STATUS|Draft)\b/i.test(text) && !text.includes("⏳"))
        blocks.push({ type: "quote", html: inline(text, todos) });
      else if (text.includes("⏳")) todos.push(text);
      continue;
    }
    // list
    if (/^[-*]\s+/.test(t) || /^\d+[.)]\s+/.test(t)) {
      const ordered = /^\d/.test(t);
      const items = [];
      while (i < lines.length && /^([-*]|\d+[.)])\s+/.test(lines[i].trim())) {
        const it = lines[i].trim().replace(/^([-*]|\d+[.)])\s+/, "");
        const html = inline(it, todos);
        if (html.trim()) items.push(html);
        i++;
      }
      if (items.length) blocks.push({ type: "list", ordered, items });
      continue;
    }
    // standalone CTA line: whole paragraph is bracketed link(s)
    if (/^\[[^\]]+\s*(?:→|\]\()\s*\/[^\]]+\]?\s*$/.test(t) && (t.includes("→") || t.includes("]("))) {
      const link = t.match(/\[(.+?)\s*→\s*(\/[^\]\s]+)\]/) || t.match(/\[(.+?)\]\((\/[^)\s]+)\)/);
      if (link) blocks.push({ type: "cta", label: esc(link[1]), href: link[2] });
      i++; continue;
    }
    // FAQ question: **...?**
    if (/^\*\*[^*]+\?\*\*\s*$/.test(t)) {
      const items = [];
      while (i < lines.length && /^\*\*[^*]+\?\*\*\s*$/.test(lines[i].trim())) {
        const q = lines[i].trim().replace(/^\*\*|\*\*\s*$/g, "");
        i++;
        const ans = [];
        while (i < lines.length && lines[i].trim() && !/^\*\*[^*]+\?\*\*/.test(lines[i].trim()) && !isHeading(lines[i].trim()) && !isHr(lines[i].trim()) && !isBlokLabel(lines[i].trim()) && !/^#####\s/.test(lines[i].trim())) {
          const al = lines[i].trim();
          const html = inline(al, todos);
          if (html.trim() && !html.includes("⏳")) ans.push(html);
          else if (al.includes("⏳")) todos.push(al);
          i++;
        }
        items.push({ q: esc(q), a: ans });
      }
      if (items.length) blocks.push({ type: "faq", items });
      continue;
    }
    // paragraph (merge until blank/structural)
    const parts = [];
    while (i < lines.length) {
      const l = lines[i].trim();
      if (!l || isHeading(l) || isHr(l) || isBlokLabel(l) || isTodoLine(l) || l.startsWith("|") || l.startsWith(">") || /^[-*]\s+/.test(l) || /^\d+[.)]\s+/.test(l) || /^\*\*[^*]+\?\*\*\s*$/.test(l) || (/^\[[^\]]+\s*(?:→|\]\()\s*\/[^\]]+\]?\s*$/.test(l) && (l.includes("→") || l.includes("](")))) break;
      parts.push(l); i++;
    }
    const html = inline(parts.join(" "), todos);
    if (html.trim()) {
      // standalone bold paragraph → stat line
      if (/^<strong>.*<\/strong>$/.test(html.trim())) blocks.push({ type: "stat", html });
      else blocks.push({ type: "p", html });
    }
  }
  return { blocks, todos };
}

/* ---------- page collection ---------- */
// Fallback map for files whose header carries no URL (wave1/README.md table).
const RU_URLS = {
  "chastnye-shkoly/final.md": "/ru/chastnye-shkoly/",
  "boarding-schools/final.md": "/ru/chastnye-shkoly/pansiony/",
  "dnevnye/final.md": "/ru/chastnye-shkoly/dnevnye-shkoly/",
  "vstupitelnye-ekzameny/final.md": "/ru/chastnye-shkoly/vstupitelnye-ekzameny/",
  "opeka/final.md": "/ru/chastnye-shkoly/opeka/",
  "universitety/final.md": "/ru/postuplenie-v-universitety/",
  "universitety/oksbridzh-final.md": "/ru/postuplenie-v-universitety/oksbridzh/",
  "universitety/magistratura-final.md": "/ru/postuplenie-v-universitety/magistratura/",
  "universitety/motivatsionnoe-pismo-final.md": "/ru/postuplenie-v-universitety/motivatsionnoe-pismo/",
  "universitety/ekzameny-final.md": "/ru/postuplenie-v-universitety/ekzameny/",
  "executive/executive-obrazovanie-final.md": "/ru/executive-obrazovanie/",
  "executive/mba-final.md": "/ru/executive-obrazovanie/mba/",
  "executive/oksford-said-final.md": "/ru/executive-obrazovanie/mba/oksford-said/",
  "executive/oksford-emba-final.md": "/ru/executive-obrazovanie/mba/oksford-emba/",
  "repetitory/final.md": "/ru/repetitory/",
  "repetitory/gcse-final.md": "/ru/repetitory/gcse/",
  "repetitory/a-level-final.md": "/ru/repetitory/a-level/",
  "repetitory/ib-final.md": "/ru/repetitory/ib/",
  "repetitory/intensivy-final.md": "/ru/repetitory/intensivy/",
  "repetitory/paskha-final.md": "/ru/repetitory/intensivy/paskha/",
  "letnie-shkoly/letnie-final.md": "/ru/letnie-shkoly/",
  "letnie-shkoly/oksford-final.md": "/ru/letnie-shkoly/oksford/",
  "trust/glavnaya.md": "/ru/",
};

function urlOf(first, file) {
  const m = first.match(/>\s*URL:\s*(\/[^\s·]*)/) || first.match(/URL:\s*(\/[^\s·]+)/) || first.match(/[`"](\/ru\/[^`"]+)[`"]/) || first.match(/[`"](\/[^`"]+\/)[`"]/);
  if (!m) return null;
  const u = m[1];
  return u === "/" ? "/" : u.replace(/\/$/, "") + "/";
}

function collect(dir, lang) {
  const files = [];
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.isDirectory()) walk(join(d, e.name));
      else if (e.name.endsWith(".md") && !/README|meta|research|d0-|d1-|d2-/.test(e.name)) files.push(join(d, e.name));
    }
  };
  walk(dir);
  return files;
}

function splitProchee(md) {
  // prochee.md: one file, several "## /url/ — Title" stubs
  const parts = [];
  const re = /^##\s+(\/ru\/[^\s]+\/)\s*—\s*(.+)$/gm;
  let m, prev = null;
  const marks = [];
  while ((m = re.exec(md))) marks.push({ url: m[1], title: m[2].replace(/⏳.*/, "").replace(/\s*\(.*?\)/g, "").trim(), head: m.index, start: md.indexOf("\n", m.index) });
  for (let k = 0; k < marks.length; k++) {
    const end = k + 1 < marks.length ? marks[k + 1].head : md.length;
    parts.push({ url: marks[k].url, title: marks[k].title, body: md.slice(marks[k].start, end) });
  }
  return parts;
}

const pairs = loadPairs();
const enMetaMap = enMeta();

const pages = [];

/* RU */
const ruDir = join(CONTENT, "ru");
for (const file of collect(ruDir, "ru")) {
  const md = readFileSync(file, "utf8");
  const rel = file.slice(ruDir.length + 1);
  if (rel === "trust/prochee.md") {
    for (const p of splitProchee(md)) {
      if (p.url === "/ru/media/") continue; // §8: exclude
      const { blocks, todos } = parseBlocks(p.body, p);
      pages.push({ lang: "ru", url: p.url, file: rel, stub: true, stubTitle: p.title, h1: p.title, blocks, todos });
    }
    continue;
  }
  const head = md.split("\n").slice(0, 6).join("\n");
  const url = urlOf(head, file) || RU_URLS[rel];
  if (!url) { warnings.push(`no URL: ${rel}`); continue; }
  if (url === "/ru/media/") continue;
  const dir = dirname(rel);
  const stem = basename(rel).replace(/-final|final/, "").replace(/\.md$/, "");
  const metaFile = join(dir, `${stem === "" ? "" : stem + "-"}meta.md`);
  const meta = ruMeta(join(ruDir, metaFile));
  const { blocks, todos } = parseBlocks(md, { url });
  if (url === "/ru/") continue; // homepage is a designed page, not content-rendered
  pages.push({ lang: "ru", url, file: rel, meta, blocks, todos });
}

/* EN */
const enDir = join(CONTENT, "en");
for (const file of collect(enDir, "en")) {
  const md = readFileSync(file, "utf8");
  const rel = file.slice(enDir.length + 1);
  if (rel === "README.md") continue;
  const head = md.split("\n").slice(0, 3).join("\n");
  const url = urlOf(head, file);
  if (!url) { warnings.push(`no URL: en/${rel}`); continue; }
  if (url === "/media/") continue;
  const meta = enMetaMap[rel] || {};
  const { blocks, todos } = parseBlocks(md, { url });
  if (url === "/") continue; // homepage is a designed page, not content-rendered
  pages.push({ lang: "en", url, file: `en/${rel}`, meta, blocks, todos });
}

/* merge consecutive faq blocks (questions interrupted by blanks) */
for (const p of pages) {
  const merged = [];
  for (const b of p.blocks) {
    const last = merged[merged.length - 1];
    if (b.type === "faq" && last && last.type === "faq") last.items.push(...b.items);
    else merged.push(b);
  }
  p.blocks = merged;
}

/* pairs + hierarchy */
const urls = new Set(pages.map((p) => p.url));
const parents = {};
for (const p of pages) {
  const segs = p.url.split("/").filter(Boolean);
  let parent = null;
  for (let k = segs.length - 1; k >= 1; k--) {
    const cand = "/" + segs.slice(0, k).join("/") + "/";
    if (urls.has(cand)) { parent = cand; break; }
  }
  parents[p.url] = parent;
}
for (const p of pages) {
  p.pair = pairs[p.url] || null;
  p.parent = parents[p.url];
  p.children = pages.filter((q) => parents[q.url] === p.url).map((q) => q.url);
  p.siblings = p.parent ? pages.filter((q) => parents[q.url] === p.parent && q.url !== p.url).map((q) => q.url) : [];
}

/* extract h1/lead: first h1 block and following p */
for (const p of pages) {
  const h1 = p.blocks.findIndex((b) => b.type === "h1");
  p.h1 = h1 >= 0 ? p.blocks[h1].text : (p.meta?.h1 || p.stubTitle || "");
  const leadIdx = h1 >= 0 ? p.blocks.findIndex((b, i) => i > h1 && b.type === "p") : -1;
  p.lead = leadIdx >= 0 ? p.blocks[leadIdx].html.replace(/<[^>]+>/g, "") : "";
  p.hasFaq = p.blocks.some((b) => b.type === "faq" && b.items.length >= 2);
  p.faqItems = p.blocks.flatMap((b) => (b.type === "faq" ? b.items : []));
  p.title = p.meta?.title || p.h1;
  p.description = p.meta?.description || p.lead.slice(0, 170);
  // drop h1+lead from body blocks? keep h1 out — PageBand renders it; keep lead paragraph out too (PageBand lead)
  if (h1 >= 0) p.blocks.splice(h1, 1);
  if (leadIdx >= 0) { const idx = p.blocks.findIndex((b) => b.html && p.lead && b.html.replace(/<[^>]+>/g, "") === p.lead); if (idx >= 0) p.blocks.splice(idx, 1); }
}

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "pages.json"), JSON.stringify({ pages }, null, 1));
console.log(`pages: ${pages.length} (ru ${pages.filter((p) => p.lang === "ru").length}, en ${pages.filter((p) => p.lang === "en").length})`);
console.log(`with faq: ${pages.filter((p) => p.hasFaq).length}, paired: ${pages.filter((p) => p.pair).length}`);
if (warnings.length) console.log("WARNINGS:\n" + warnings.join("\n"));
const todoCount = pages.reduce((n, p) => n + p.todos.length, 0);
console.log(`todo comments: ${todoCount}`);
