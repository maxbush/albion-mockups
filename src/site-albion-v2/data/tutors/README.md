# Tutor profiles: how the groundwork works

Nothing from this folder is published until a tutor file exists and `consent` is `true`.
With no files the site is unchanged: no cards, no profile pages, no empty blocks.

## Adding a tutor

1. Put the photo in `public/images/tutors/<slug>.jpg` (or `.webp`, `.png`). See "Photos" below.
2. Create `data/tutors/<slug>.json` (copy `_template.json`; files starting with `_` are ignored).
3. Run `npm run check:tutors`. It lists every problem. `npm run build` runs it automatically.

Or fill the client spreadsheet (`wave1-v2/tutors_template.csv` in the texts repo) and run
`npm run import:tutors -- path/to/filled.csv`, then add the photos.

## Fields

| Field | Required | Notes |
|---|---|---|
| `slug` | yes | latin letters, digits, hyphens. Must not equal an existing page under `/tutors/` or `/ru/repetitory/` (`gcse`, `a-level`, `ib`...). The same slug is used in both languages. |
| `publish` | yes | `false` hides the tutor without deleting the file |
| `consent` | yes | must be `true`: the tutor agreed to publish name, photo and bio. Otherwise the tutor is skipped and a warning is printed |
| `name`, `title` | yes | `{ "en": "...", "ru": "..." }`. `title` is one line under the name, for example "Maths tutor, MA Cantab" |
| `subjects` | yes | keys from `taxonomy.json` |
| `levels` | yes | keys from `taxonomy.json` |
| `bio` | yes | 30 to 150 words per language, facts only: what the tutor teaches and how. No superlatives, no guarantees, no invented results |
| `education` | no | one line per language |
| `examBoards` | no | for example `["AQA", "Edexcel", "OCR"]` |
| `experienceYears` | no | integer; shown only if given and confirmed |
| `languages` | no | two-letter codes, for example `["en", "ru"]` |
| `formats` | no | `online`, `in-person` |
| `photo` | no | `{ "src": "/images/tutors/<slug>.jpg", "focus": "50% 20%", "alt": {...} }`. Without a photo the card shows initials |
| `sort` | no | smaller numbers first |

New subjects or levels: add a key to `taxonomy.json` with both labels.

## Photos

Tutors send their own photos, so the code does not assume they match.

* Every photo sits in a fixed 4:5 frame and is cropped with `object-fit: cover`.
* `photo.focus` moves the crop (`"50% 20%"` keeps the upper part, where faces usually are). Check each photo once.
* Without a photo the card shows initials on a dark tile, so a half-filled showcase still looks deliberate.
* `PHOTO_TREATMENT` in `src/lib/tutors.ts` can apply one soft tone to every photo (`"soft"`), which hides differences in lighting and colour. It is off by default; the choice belongs to design.
* Brief for tutors: portrait or half-length, face in the upper two thirds, at least 800 x 1000 px, any plain background, no group shots, no heavy filters.

## Test data

`data/tutors/_fixture/` holds invented tutors with synthetic photos of different shapes. They are used only when
`TUTORS_FIXTURE=1 npm run build` (local preview). A normal build removes the generated test images, so none of this reaches the published site.
