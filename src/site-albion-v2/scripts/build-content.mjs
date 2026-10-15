#!/usr/bin/env node
// Build-time content pipeline for ALBION site v2.
// content/{ru,en}/**/index.md  (wave1-v2 format: frontmatter, # H1, ## blocks, FAQ, <!-- QA -->)  ->  src/generated/pages.json
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = join(ROOT, "content");
const OUT = join(ROOT, "src", "generated");
const warnings = [];

/* Pages that belong to the old IA and are not part of this site (their stories live on topical pages). */
const EXCLUDE = new Set(["/ru/kejsy/", "/cases/", "/ru/gidy/", "/guides/", "/ru/media/", "/media/", "/ru/", "/"]);
/* Links that may point to routes rendered outside the markdown pipeline. */
const STATIC_OK = new Set(["/ru/", "/", "/ru/anketa/", "/apply/", "/ru/konsultatsiya/", "/consultation/"]);
/* Links to excluded pages are redirected to their replacements. */
const LINK_REMAP = {
  "/ru/kejsy/": "/ru/o-kompanii/rezultaty/",
  "/cases/": "/about/results/",
  "/ru/gidy/": "/ru/resursy/",
  "/guides/": "/resources/",
  "/ru/media/": "/ru/kontakty/",
  "/media/": "/contact/",
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function inline(s) {
  let out = esc(s);
  out = out.replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, (m, t, u) => `<a class="link-hair" href="${LINK_REMAP[u] ?? u}">${t}</a>`);
  out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a class="link-hair" href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(?<![\w*])\*([^*\n]+)\*(?![\w*])/g, "<em>$1</em>");
  return out;
}

function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const fm = {};
  if (!m) return { fm, body: text };
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { fm, body: text.slice(m[0].length) };
}

const isFaqHeading = (t) => /^(Вопросы и ответы|Questions and answers)\s*$/i.test(t.trim());

function parseBlocks(md) {
  const lines = md.replace(/<!--[\s\S]*?-->/g, "").split(/\r?\n/);
  const blocks = [];
  let i = 0;
  let inFaq = false;
  let faq = null;
  const flushFaq = () => {
    if (faq && faq.items.length) blocks.push(faq);
    faq = null;
  };
  const isStruct = (l) =>
    /^#{1,4}\s/.test(l) || l.startsWith("|") || l.startsWith(">") || /^[-*]\s+/.test(l) || /^\d+[.)]\s+/.test(l) || /^---\s*$/.test(l);
  const isCtaLine = (l) => /^\[[^\]]+\]\(\/[^)\s]*\)\s*$/.test(l);

  while (i < lines.length) {
    const t = lines[i].trim();
    if (!t) { i++; continue; }

    const h = t.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      const lvl = h[1].length;
      const text = h[2].trim();
      if (lvl === 2) {
        flushFaq();
        inFaq = isFaqHeading(text);
        if (inFaq) blocks.push({ type: "hr" }); // FAQ gets its own panel
        blocks.push({ type: "h2", text: inline(text) });
        if (inFaq) faq = { type: "faq", items: [] };
        i++; continue;
      }
      if (lvl === 3 && inFaq && faq) {
        const q = text;
        i++;
        const ans = [];
        while (i < lines.length && !/^#{1,3}\s/.test(lines[i].trim())) {
          const l = lines[i].trim();
          if (l && !/^---\s*$/.test(l)) {
            // answer lines: paragraphs; list items become paragraphs too
            const para = [l.replace(/^[-*]\s+/, "")];
            i++;
            while (i < lines.length && lines[i].trim() && !/^#{1,3}\s/.test(lines[i].trim()) && !/^[-*]\s+/.test(lines[i].trim())) { para.push(lines[i].trim()); i++; }
            ans.push(inline(para.join(" ")));
            continue;
          }
          i++;
        }
        faq.items.push({ q: inline(q), a: ans });
        continue;
      }
      blocks.push({ type: lvl === 1 ? "h1" : lvl === 3 ? "h3" : "h3", text: inline(text) });
      i++; continue;
    }

    if (/^---\s*$/.test(t)) { i++; continue; }

    if (t.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const r = lines[i].trim();
        if (!/^\|[\s:|-]+\|$/.test(r)) rows.push(r.replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim()));
        i++;
      }
      if (rows.length) blocks.push({ type: "table", header: rows[0].map(inline), rows: rows.slice(1).map((r) => r.map(inline)) });
      continue;
    }

    if (t.startsWith(">")) {
      const q = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) { q.push(lines[i].trim().replace(/^>\s?/, "")); i++; }
      blocks.push({ type: "quote", html: inline(q.join(" ")) });
      continue;
    }

    if (/^[-*]\s+/.test(t) || /^\d+[.)]\s+/.test(t)) {
      const ordered = /^\d/.test(t);
      const items = [];
      while (i < lines.length && /^([-*]|\d+[.)])\s+/.test(lines[i].trim())) {
        let it = lines[i].trim().replace(/^([-*]|\d+[.)])\s+/, "");
        i++;
        // continuation lines indented under the item
        while (i < lines.length && lines[i].trim() && /^\s{2,}\S/.test(lines[i]) && !/^\s*([-*]|\d+[.)])\s+/.test(lines[i])) { it += " " + lines[i].trim(); i++; }
        items.push(inline(it));
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }

    if (isCtaLine(t)) {
      const m = t.match(/^\[([^\]]+)\]\((\/[^)\s]*)\)\s*$/);
      blocks.push({ type: "cta", label: esc(m[1]), href: LINK_REMAP[m[2]] ?? m[2] });
      i++; continue;
    }

    const parts = [];
    while (i < lines.length) {
      const l = lines[i].trim();
      if (!l || isStruct(l) || isCtaLine(l)) break;
      parts.push(l); i++;
    }
    if (parts.length) blocks.push({ type: "p", html: inline(parts.join(" ")) });
    else i++;
  }
  flushFaq();
  return blocks;
}

function collect(dir) {
  const files = [];
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.isDirectory()) walk(join(d, e.name));
      else if (e.name === "index.md") files.push(join(d, e.name));
    }
  };
  if (existsSync(dir)) walk(dir);
  return files;
}

const norm = (u) => (u === "/" ? "/" : u.replace(/\/$/, "") + "/");
const pages = [];
for (const lang of ["ru", "en"]) {
  const dir = join(CONTENT, lang);
  for (const file of collect(dir)) {
    const raw = readFileSync(file, "utf8");
    const { fm, body } = frontmatter(raw);
    const url = fm.url ? norm(fm.url) : null;
    if (!url) { warnings.push(`no url: ${file}`); continue; }
    if (EXCLUDE.has(url)) continue;
    const blocks = parseBlocks(body);
    pages.push({
      lang, url, file: file.slice(CONTENT.length + 1).replace(/\\/g, "/"),
      pair: fm.url_pair ? norm(fm.url_pair) : null,
      title: fm.title || "", description: fm.description || "", pageType: fm.page_type || "",
      blocks, todos: [],
    });
  }
}

/* hierarchy by URL prefix */
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
  p.parent = parents[p.url];
  p.children = pages.filter((q) => parents[q.url] === p.url).map((q) => q.url);
  p.siblings = p.parent ? pages.filter((q) => parents[q.url] === p.parent && q.url !== p.url).map((q) => q.url) : [];
  if (p.pair && !urls.has(p.pair)) { warnings.push(`pair missing: ${p.url} -> ${p.pair}`); p.pair = null; }
}

/* h1 / lead / faq */
for (const p of pages) {
  const h1i = p.blocks.findIndex((b) => b.type === "h1");
  p.h1 = h1i >= 0 ? p.blocks[h1i].text : p.title;
  const leadi = p.blocks.findIndex((b, i) => i > h1i && b.type === "p");
  p.lead = leadi >= 0 ? p.blocks[leadi].html.replace(/<[^>]+>/g, "") : "";
  p.faqItems = p.blocks.flatMap((b) => (b.type === "faq" ? b.items : []));
  p.hasFaq = p.faqItems.length >= 2;
  if (leadi >= 0) p.blocks.splice(leadi, 1);
  if (h1i >= 0) p.blocks.splice(h1i, 1);
  p.stub = false;
  delete p.pageType;
}

/* internal link validation */
const known = new Set([...urls, ...STATIC_OK]);
for (const p of pages) {
  const re = /href="(\/[^"#]*)"/g;
  const hay = JSON.stringify(p.blocks);
  let m;
  const seen = new Set();
  while ((m = re.exec(hay.replace(/\\"/g, '"')))) {
    const u = norm(m[1].split("?")[0]);
    if (!known.has(u) && !seen.has(u)) { seen.add(u); warnings.push(`broken link on ${p.url}: ${u}`); }
  }
}

pages.sort((a, b) => a.url.localeCompare(b.url));
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "pages.json"), JSON.stringify({ pages }, null, 0));
console.log(`content: ${pages.length} pages (${pages.filter((p) => p.lang === "ru").length} ru, ${pages.filter((p) => p.lang === "en").length} en)`);
if (warnings.length) console.log("warnings:\n  " + warnings.join("\n  "));
