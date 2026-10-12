# site-09-b — ALBION homepage mockup, variant B (blue-b)

Next.js 16 App Router + TypeScript + Tailwind 4. Live at https://maxbush.github.io/albion-mockups/blue-b/ru/ (and /en/).

## Run

```bash
npm install
npm run dev        # dev at http://localhost:3000 — basePath is disabled in dev,
                   # so /images/... and internal links work at root
npm run lint
npm run typecheck
```

## Build / deploy

`npm run build` produces a static export in `out/` — works as-is, no extra steps.
Production `basePath` is `/albion-mockups/blue-b` (gh-pages subpath), set only outside dev.

Deployment to gh-pages copies `out/` into the `blue-b/` dir of the albion-mockups
deploy repo and runs a path-prefixer over the HTML (`/images/...` → `/albion-mockups/blue-b/images/...`).

## Structure

- `src/app/[lang]/page.tsx` — homepage per language; dictionaries in `src/dictionaries/` (ru.ts, en.ts).
- `src/components/hero/` — hero; `src/components/home/` — all sections.
- `src/server-api/` — future form backend (enquiries POST → Postgres/drizzle). NOT part of
  the static export: it lives outside `app/` so `next build` succeeds. Wire it back under
  `app/api/` only when deploying to a Node server, not for static hosting.
- `public/images/` — generated watercolor art.

## Gotchas

- Occasional flaky Google Fonts fetch during build — just retry.
- `useScrollScene` (src/lib/motion.ts) drives the pinned scroll scenes; it degrades to a
  static frame on touch devices and under prefers-reduced-motion.
