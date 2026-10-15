// Validates data/tutors/*.json and writes src/generated/tutors.json.
// Zero tutor files is a valid state: the site then shows no tutor cards and no profile pages.
// Usage: node scripts/build-tutors.mjs [--check]     (TUTORS_FIXTURE=1 adds invented test tutors for local preview)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA = path.join(ROOT, "data", "tutors");
const PUB = path.join(ROOT, "public");
const PHOTO_DIR = path.join(PUB, "images", "tutors");
const OUT = path.join(ROOT, "src", "generated", "tutors.json");
const FIXTURE = process.env.TUTORS_FIXTURE === "1";
// Preview only: real photos supplied by the client for layout review, with no invented attributes (data/tutors/_client).
const PREVIEW = process.env.TUTORS_PREVIEW === "1";

const taxonomy = JSON.parse(fs.readFileSync(path.join(DATA, "taxonomy.json"), "utf8"));
const errors = [];
const warnings = [];
const err = (slug, m) => errors.push(`${slug}: ${m}`);
const warn = (slug, m) => warnings.push(`${slug}: ${m}`);

// URL segments already taken by content pages under the tutors section.
function reservedSlugs() {
  const f = path.join(ROOT, "src", "generated", "pages.json");
  const set = new Set();
  if (!fs.existsSync(f)) return set;
  const pages = JSON.parse(fs.readFileSync(f, "utf8")).pages ?? [];
  for (const p of pages) {
    const m = p.url.match(/^\/(?:ru\/repetitory|tutors)\/([^/]+)\//);
    if (m) set.add(m[1]);
  }
  return set;
}

// Test images are never kept in the published folder: remove them unless a fixture build is requested.
fs.mkdirSync(PHOTO_DIR, { recursive: true });
for (const f of fs.readdirSync(PHOTO_DIR)) if (f.startsWith("_fixture-")) fs.rmSync(path.join(PHOTO_DIR, f));

function svgPhoto({ w, h, hue }) {
  const cx = w / 2, headR = Math.min(w, h) * 0.13, headY = h * 0.38;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue},28%,78%)"/><stop offset="1" stop-color="hsl(${(hue + 40) % 360},24%,52%)"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="url(#g)"/>
<circle cx="${cx}" cy="${headY}" r="${headR}" fill="hsl(${hue},18%,34%)"/>
<path d="M ${cx - headR * 2.6} ${h} Q ${cx} ${headY + headR * 1.4} ${cx + headR * 2.6} ${h} Z" fill="hsl(${hue},18%,34%)"/>
</svg>`;
}

const files = fs.readdirSync(DATA).filter((f) => f.endsWith(".json") && !f.startsWith("_") && f !== "taxonomy.json").map((f) => path.join(DATA, f));
if (FIXTURE) {
  const fx = path.join(DATA, "_fixture");
  if (fs.existsSync(fx)) for (const f of fs.readdirSync(fx).filter((x) => x.endsWith(".json"))) files.push(path.join(fx, f));
}
if (PREVIEW) {
  const cl = path.join(DATA, "_client");
  if (fs.existsSync(cl)) for (const f of fs.readdirSync(cl).filter((x) => x.endsWith(".json"))) files.push(path.join(cl, f));
}

const reserved = reservedSlugs();
const seen = new Set();
const tutors = [];
const skipped = [];
const BANNED = /guarantee|гарантир|certified|сертифицир|бесплатн|\bbest\b|лучш(ий|ая|ие) (тьютор|репетитор|преподаватель)|top tutor|топов/i;
const PLACEHOLDER = /TODO|TBC|lorem|XXX|\{[^}]{1,40}\}/i;
const wordCount = (s) => (s.match(/[\p{L}\p{N}'’-]+/gu) ?? []).length;

for (const file of files) {
  const rel = path.relative(DATA, file).replace(/\\/g, "/");
  let t;
  try {
    t = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    err(rel, `invalid JSON (${e.message})`);
    continue;
  }
  const id = t.slug || rel;
  const fixture = rel.startsWith("_fixture/");
  const preview = t._preview === true; // client photos shown for layout review: no subjects, levels or biography to validate
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(t.slug ?? "")) { err(id, "slug must be latin lowercase letters, digits and hyphens"); continue; }
  if (path.basename(file, ".json") !== t.slug && !fixture) err(id, `file name must be ${t.slug}.json`);
  if (seen.has(t.slug)) { err(id, "duplicate slug"); continue; }
  seen.add(t.slug);
  if (reserved.has(t.slug)) err(id, "slug collides with an existing page under /tutors/ or /ru/repetitory/");
  if (typeof t.publish !== "boolean") err(id, "publish must be true or false");
  if (t.publish !== true) { skipped.push(`${id}: publish is false`); continue; }
  if (t.consent !== true) { skipped.push(`${id}: no consent, skipped`); continue; }

  for (const f of ["name", "title", "bio"]) for (const l of ["en", "ru"]) if (!t[f]?.[l]?.trim()) err(id, `${f}.${l} is required`);
  if (t.education) for (const l of ["en", "ru"]) if (!t.education[l]?.trim()) err(id, `education.${l} is missing (give both languages or none)`);
  for (const l of ["en", "ru"]) {
    const n = wordCount(t.bio?.[l] ?? "");
    if (!preview && (n < 30 || n > 150)) err(id, `bio.${l} has ${n} words (30 to 150)`);
  }
  if (!preview && (!Array.isArray(t.subjects) || !t.subjects.length)) err(id, "subjects: at least one");
  for (const s of t.subjects ?? []) if (!taxonomy.subjects[s]) err(id, `unknown subject "${s}" (add it to taxonomy.json)`);
  if (!preview && (!Array.isArray(t.levels) || !t.levels.length)) err(id, "levels: at least one");
  for (const s of t.levels ?? []) if (!taxonomy.levels[s]) err(id, `unknown level "${s}" (add it to taxonomy.json)`);
  for (const s of t.formats ?? []) if (!taxonomy.formats[s]) err(id, `unknown format "${s}"`);
  for (const s of t.languages ?? []) if (!/^[a-z]{2}$/.test(s)) err(id, `language "${s}" must be a two-letter code`);
  if (t.experienceYears != null && !(Number.isInteger(t.experienceYears) && t.experienceYears >= 1 && t.experienceYears <= 60)) err(id, "experienceYears must be an integer from 1 to 60 or null");

  // Check every text value on its own (a combined JSON string would make short names look like placeholders).
  const strings = [t.name, t.title, t.education, t.bio].flatMap((o) => (o ? [o.en, o.ru] : [])).concat(t.examBoards ?? []).filter((s) => typeof s === "string");
  const text = strings.join("\n");
  if (BANNED.test(text)) err(id, `contains a banned claim (${text.match(BANNED)[0]})`);
  if (!fixture && !preview && PLACEHOLDER.test(text)) err(id, "contains placeholder text");

  let photo = null;
  if (t.photo?.src) {
    const src = String(t.photo.src);
    if (fixture && src.startsWith("/images/tutors/_fixture-")) {
      const spec = t._svg ?? { w: 1000, h: 1000, hue: 210 };
      fs.writeFileSync(path.join(PUB, src), svgPhoto(spec));
    }
    if (!src.startsWith("/images/tutors/")) err(id, 'photo.src must start with "/images/tutors/"');
    else if (!fs.existsSync(path.join(PUB, src))) err(id, `photo file not found: public${src}`);
    else if (fs.statSync(path.join(PUB, src)).size > 700 * 1024) warn(id, "photo is larger than 700 KB, compress it");
    const focus = t.photo.focus ?? "50% 25%";
    if (!/^\d{1,3}% \d{1,3}%$/.test(focus)) err(id, 'photo.focus must look like "50% 20%"');
    photo = { src, focus, alt: t.photo.alt ?? null };
  } else {
    warn(id, "no photo: the card will show initials");
  }

  tutors.push({
    slug: t.slug,
    sort: Number.isFinite(t.sort) ? t.sort : 100,
    name: t.name,
    title: t.title,
    education: t.education ?? { en: "", ru: "" },
    bio: t.bio,
    subjects: t.subjects ?? [],
    levels: t.levels ?? [],
    examBoards: t.examBoards ?? [],
    experienceYears: t.experienceYears ?? null,
    languages: t.languages ?? [],
    formats: t.formats ?? [],
    photo,
  });
}

tutors.sort((a, b) => a.sort - b.sort || a.name.en.localeCompare(b.name.en));

console.log(`tutors: ${tutors.length} published${FIXTURE ? " (fixture mode)" : ""}`);
for (const s of skipped) console.log("  skipped  " + s);
for (const w of warnings) console.log("  warning  " + w);
if (errors.length) {
  console.error("TUTOR DATA ERRORS:");
  for (const e of errors) console.error("  " + e);
  process.exit(1);
}
if (!process.argv.includes("--check")) {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ taxonomy, tutors }, null, 1) + "\n");
}
