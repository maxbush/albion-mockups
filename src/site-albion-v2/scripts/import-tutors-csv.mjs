// Turns the client's filled spreadsheet into data/tutors/<slug>.json files.
// Usage: node scripts/import-tutors-csv.mjs path/to/filled.csv
// Columns: see tutors_template.csv in the texts repo (wave1-v2/tutors_template.csv). Rows whose slug starts with "#" are skipped.
// Photos are not imported: put each file in public/images/tutors/ and name it in the photo_file column.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA = path.join(ROOT, "data", "tutors");
const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/import-tutors-csv.mjs path/to/filled.csv");
  process.exit(1);
}

// Small RFC 4180 parser (quoted fields, doubled quotes, newlines inside quotes).
function parseCsv(text) {
  const rows = [];
  let row = [], cur = "", q = false;
  const s = text.replace(/^\uFEFF/, "");
  // Excel in a Russian locale saves with ";", other tools with ",": decide from the header line.
  const first = s.split(/\r?\n/)[0] ?? "";
  const delim = (first.match(/;/g) ?? []).length > (first.match(/,/g) ?? []).length ? ";" : ",";
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q) {
      if (c === '"' && s[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') q = false;
      else cur += c;
    } else if (c === '"') q = true;
    else if (c === delim) { row.push(cur); cur = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && s[i + 1] === "\n") i++;
      row.push(cur); cur = "";
      if (row.some((x) => x.trim())) rows.push(row);
      row = [];
    } else cur += c;
  }
  if (cur || row.length) { row.push(cur); if (row.some((x) => x.trim())) rows.push(row); }
  return rows;
}

const rows = parseCsv(fs.readFileSync(file, "utf8"));
const head = rows.shift().map((h) => h.trim());
const list = (v) => (v ?? "").split("|").map((x) => x.trim()).filter(Boolean);
const yes = (v) => /^(yes|y|да|true|1)$/i.test((v ?? "").trim());
let n = 0;

for (const r of rows) {
  const o = Object.fromEntries(head.map((h, i) => [h, (r[i] ?? "").trim()]));
  if (!o.slug || o.slug.startsWith("#")) continue;
  const tutor = {
    slug: o.slug,
    publish: true,
    consent: yes(o.consent_publish),
    name: { en: o.name_en, ru: o.name_ru },
    title: { en: o.title_en, ru: o.title_ru },
    subjects: list(o.subjects),
    levels: list(o.levels),
    education: o.education_en || o.education_ru ? { en: o.education_en, ru: o.education_ru } : undefined,
    examBoards: list(o.exam_boards),
    experienceYears: o.experience_years ? Number(o.experience_years) : null,
    languages: list(o.languages),
    formats: list(o.formats),
    bio: { en: o.bio_en, ru: o.bio_ru },
    photo: o.photo_file ? { src: `/images/tutors/${o.photo_file}`, focus: o.photo_focus || "50% 25%", alt: null } : undefined,
    sort: o.sort ? Number(o.sort) : 100,
  };
  fs.writeFileSync(path.join(DATA, `${o.slug}.json`), JSON.stringify(tutor, null, 2) + "\n");
  n++;
}
console.log(`written ${n} tutor file(s) to data/tutors. Next: npm run check:tutors`);
