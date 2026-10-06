# ALBION Consult — homepage

An authored editorial experience for an Oxford education consultancy.
Next.js App Router + React. No UI kits, no animation libraries — all motion is
hand-written (rAF + lerp smoothing, IntersectionObserver gating, sticky
positioning, CSS transforms).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## The system in one paragraph

One visual metaphor carries the whole page: **the user enters Oxford and
gradually enters a world of educational possibilities.** The hero is a
cinematic dolly-in through three watercolour depth layers of a single
composition (foliage → trees & walls → quadrangle), driven by scroll inside a
235svh track with a sticky 100svh viewport. The middle of the page is the
educational route told as five stacked editorial dossiers (physical paper
objects, slight rotations, overlap on scroll). Then a quiet screen
(INDEPENDENT → DIRECT → PERSONAL → CONFIDENTIAL), a second spatial moment
(Oxford shrinks to a point while rings of reach open: UK → Europe → USA → the
world), an interactive portrait composition for people, an honest proof
ledger, an editorial journal, and a calm consultation close.

## Palette (experimental, client not final)

| token       | value     | use                          |
| ----------- | --------- | ---------------------------- |
| `--pine`    | `#004B49` | primary deep green           |
| `--pine-deep` | `#033734` | night ground, world/consult |
| `--paper`   | `#F3EFE4` | page ground                  |
| `--paper-2` | `#FAF7EE` | dossiers, plates, mats       |
| `--parchment` | `#DDD9CD` | secondary ground             |
| `--sage`    | `#D2D7BE` | accents on dark              |
| `--stone`   | `#9E989A` | captions, meta               |
| `--sand` / `--ochre` | `#C9B691` / `#96784A` | sandstone, annotations |

All colours live as CSS custom properties in `app/globals.css` — a palette
correction is a one-place edit.

## Type

- Display: **Cormorant Garamond 300** (latin + cyrillic), very large, tight.
- Interface/body: **Inter Tight** (latin + cyrillic), small, letterspaced caps
  for eyebrows/meta.
- Contrast rule: large serif vs small precise sans. Nothing in between.

## Motion inventory (all custom)

- `lib/motion.ts` — `useScrollScene` (rAF loop that only runs while the
  section intersects the viewport, lerp-smoothed progress), `useInViewFlag`
  (pauses CSS atmosphere off-screen), `useReducedMotion`.
- Hero: dolly-in (layer scales 1.04→1.52 / 1.16→2.5 / 1.3→3.4), mist fade,
  foliage pass-by, light drift, dust motes.
- Route: stacked dossiers — each sheet pins, the next rises over it; covered
  sheets scale down and dim via a `--cover` custom property.
- Difference: word cross-fade on scroll segments.
- World: zoom-out to a point, ring diagram, palette inversion parchment→pine.
- People: depth/focus interaction (hover / focus / tap).
- Everything else: quiet editorial, hover shifts only.

## Honesty rules honoured

- The only published figure is **20+ years combined experience**.
- Team names/roles/bios, testimonials, outcomes, media: **TBC** placeholders.
- No invented school names, logos, acceptance rates or statistics.
- Contact e-mail `consult@albionconsult.co.uk` is a **placeholder** to replace
  with the real channel.

## Accessibility & performance

- Semantic landmarks, single h1, ordered headings, real buttons/links,
  visible `:focus-visible`, `aria-hidden` on all atmosphere.
- `prefers-reduced-motion`: hero becomes one static composed scene, the
  Difference screen becomes a static list, world becomes the finished ring
  diagram; all CSS animation stops.
- 320px and up, no horizontal overflow (verified).
- Images: next/image, WebP, responsive `sizes`, hero `priority`; watercolour
  layers pre-processed (paper keyed to alpha) in `scripts/process_images.py`.
- rAF loops gated by IntersectionObserver; CSS motes/light paused off-screen.

## Placeholders to resolve next

1. Painted portraits 02–04 (currently painterly silhouette studies).
2. Real contact channels, phone, address.
3. Journal articles, events, resources, pricing — pages are designed
   "in preparation" shells via `app/[...slug]/page.tsx`.

## QA

`scripts/shots.mjs` (playwright-core, headless shell) captures the whole
scroll narrative at 1440×900 plus mobile 375 and an overflow check at 320 into
`qa/`.
