# ALBION — Oxford Education Consultancy

Bilingual (EN / RU) marketing site for an Oxford education consultancy.
Next.js 15 (App Router) + React 19, no UI kits, no animation libraries.

## The one idea

**The Threshold.** The visitor enters British education through an Oxford arch
(hero: the near arch grows and dissolves, the distant quad slowly approaches),
then travels a single drawn line — five sticky stacking stages, one marquee of
destinations, one index, five reasons, one door at the end. The structure itself
says: *education is a connected multi-year trajectory, not a set of one-off
applications.* The arch shape recurs as the only motif (brand mark, journey
thumbnails, principle echo).

## Stack

- Next.js 15 App Router, React 19, TypeScript (strict)
- Styling: `app/globals.css` (tokens + base) + CSS Modules per component
- Fonts: `next/font/google` — Cormorant Garamond 300/400 (display) + Inter Tight
  400/500/600 (text), subsets `latin` + `cyrillic`
- Motion: native CSS + `requestAnimationFrame` only. No GSAP / Framer / Lenis
- Images: local files + `next/image` (AVIF/WebP negotiated automatically),
  `priority` on the hero quad, `fetchPriority="high"` on the hero arch

## Structure

```
albion/
├── middleware.ts              # `/` → /en|/ru by Accept-Language
├── dictionaries/
│   ├── en.ts                  # EN copy (master type: `Dictionary`)
│   └── ru.ts                  # RU copy, typed against EN (no missing keys)
├── lib/i18n.ts                # locales, isLocale(), getDictionary()
├── app/
│   ├── globals.css            # tokens, base, .reveal, focus, reduced-motion
│   ├── layout.tsx             # root: <html>, fonts, viewport
│   ├── page.tsx               # `/` fallback redirect
│   ├── not-found.tsx          # language-neutral 404 (two doors home)
│   └── [lang]/
│       ├── layout.tsx         # validates locale, per-lang metadata, chrome
│       └── page.tsx           # home: section composition + JSON-LD
├── components/
│   ├── Header.tsx             # fixed chrome, rAF scroll state, mobile panel
│   ├── LanguageSwitcher.tsx   # /en ↔ /ru, aria-current on active
│   ├── HtmlLang.tsx           # applies route locale to <html lang>
│   ├── MagneticButton.tsx     # magnetic hover wrapper (transform-only)
│   ├── Button.module.css      # primary / ghost / dark, all states
│   ├── Reveal.tsx             # IntersectionObserver one-shot appearance
│   ├── HeroEntrance.tsx       # scroll-driven two-layer entrance (rAF + lerp)
│   ├── Journey.tsx            # 5 stages, CSS-only sticky stacking cards
│   ├── Principle.tsx          # editorial statement + arch echo
│   ├── SchoolsMarquee.tsx     # scroll-velocity marquee (rAF, decaying impulse)
│   ├── IndexDirections.tsx    # vellum index of 7 directions (light section)
│   ├── Advantages.tsx         # 5 advantages, sticky heading + ledger rows
│   ├── FinalCTA.tsx           # consultation section layout
│   ├── ConsultationForm.tsx   # demo form (idle → sending → done)
│   └── Footer.tsx             # colophon footer (no 4-column grid)
└── public/images/             # watercolour illustrations (see below)
```

Home order: hero entrance → route (5 stacking stages) → principle →
destinations marquee → index (vellum) → 5 advantages → final CTA → footer.

## Motion inventory (all transform + opacity only)

| Piece | Technique |
|---|---|
| Hero dolly-in | one rAF loop: foliage surround sweeps past, quad pushes in, sun-glow + near mist parallax, arrival line; CSS mist/motes/birds frozen off-screen via IO |
| Journey | pure CSS `position: sticky` overlap, no JS |
| Marquee | base drift + scroll impulse with exponential decay, one rAF loop |
| Reveals | `IntersectionObserver`, one shot, staggered via `--reveal-delay` |
| Magnetic buttons | pointer drift ≤10px, fine pointers only |
| Header backdrop | `::before` opacity fade, rAF-throttled scroll listener |

Everything is inert under `prefers-reduced-motion: reduce` (CSS + JS guards);
content renders fully visible. No `width/height/top/margin` animation anywhere.
`overflow-x: clip` on `html`/`body`; 320px checked (stacked hero, full-width CTA).

## Facts & red lines (compliance)

- The **only** claimed figure on the site is **20+ years** of combined team
  experience (hero proof strip, footer). No admission rates, no family counts,
  no testimonials, no school crests.
- **No invented school names.** The marquee lists generic destination
  *categories* (prep / boarding / sixth-form …). The published placement list
  is a visible placeholder: “to be confirmed” / «уточняется».
- The consultation form is a **demonstration**: it simulates a round-trip and
  says plainly that the receiving address is to be confirmed.
- Footer legal line is a visible placeholder (“Privacy & terms — TBC”).
- No language mixing: each route renders one language; exam names
  (GCSE / A-level / IB) stay in Latin on both, per standard Russian usage.

## Images

Four muted watercolours in `public/images/` (sandstone / brass / blue-grey):
`hero-court.jpg`, `hero-arch.jpg`, `library.jpg`, `cherwell.jpg`. Generated with
“loose wet-on-wet washes, soft bleeding edges, atmospheric haze, muted” prompts.
Served through `next/image` (WebP/AVIF). The quad file is reused for the vellum
wash (no extra download) and for stage 5 in a different crop.

## Run

```bash
cd albion
npm install
npm run dev      # http://localhost:3000 → redirects to /en or /ru
npm run build    # production build (also the compliance check)
npm start        # serve the production build
```

First Load JS target ≈ 110 kB — verify in the `npm run build` output
(“First Load JS shared by all”). Client JS is limited to: Header, HeroEntrance,
SchoolsMarquee, Reveal, MagneticButton, ConsultationForm, HtmlLang.

## TODO (недоделанное)

1. **Form endpoint** — connect `ConsultationForm` to a real receiver
   (API route / CRM); add server-side validation, rate limiting, success email.
2. **Contact details** — real email/phone/office lines for the CTA + footer.
3. **Placement list** — client-approved school names to replace the TBC
   placeholder (names only with the “shortlist agreed per family” note).
4. **Legal copy** — privacy notice & terms; cookie banner only if analytics lands.
5. **Domain wiring** — `metadataBase`, OG image (1200×630 watercolour + wordmark),
   `sitemap.ts`, `robots.ts` (`app/icon.svg` arch favicon is in place).
6. **Stage 5 artwork** — a fifth unique watercolour (currently a re-crop of the quad).
7. **Content review** — native EN proofread + RU proofread; ASA/CAP check on final copy.
8. **QA pass** — 320/375/414/768 devices, keyboard-only run, screen-reader run
   (NVDA/VoiceOver), Lighthouse on prod build.
