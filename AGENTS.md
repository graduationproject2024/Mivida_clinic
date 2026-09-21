# AGENTS.md

Next.js 14 (App Router, TypeScript strict) bilingual AR/EN site for **Mivida Clinic** — a dermatology & aesthetics clinic in Tanta. State: **all checks green (384/384 e2e, unit, lint, type-check, build)**. Next.js 14 App Router + i18n `next-intl`? No — this uses **next-intl v3 with a manual `locale` prop** (see i18n below).

## Commands (from repo root)

```
npm run dev            # dev server, http://localhost:3000
npm run build          # production build
npm run start          # serve the production build (after build)
npm run lint           # ESLint
npm run type-check     # tsc --noEmit
npm test               # vitest unit tests (src/tests/unit)
npm run test:e2e       # Playwright full matrix (see "E2E below")
npm run test:accessibility  # separate Playwright a11y config (see below)
```

Correct check order: `lint` → `type-check` → `test` (unit) → `build` → `test:e2e`.

## i18n (this is the non-obvious part — read first)

- **Single source of truth for copy:** `src/messages/en.json` and `src/messages/ar.json`. No per-file dictionaries.
- **No `next-intl` runtime provider plumbing for messages plumbing** — components receive a plain `locale: 'ar' | 'en'` prop (shared via `useState` at the page/root? No — each component takes `locale` prop and calls a tiny `t = (key) => locale === 'ar' ? tAr : tEn` helper. **The `t` helper signature: `t(key)` returns the key's value for the active locale. Arabic keys are suffixed `Ar`** (e.g. `mapLink`/`mapLinkAr`).
- **Every string needs BOTH an `en` and an `Ar` key.** If a component references a key that doesn't exist in both message files, next-intl templates (`{t('...')}`) render the raw key / throw — and some e2e tests assert exact rendered text. **When adding any UI string, always edit BOTH `en.json` AND `ar.json` together** or tests will fail.
- **Locale-specific `Intl` formatting MUST force Latin digits for Arabic:** use `'ar-EG-u-nu-latn'` (or `'ar-EG-u-nu-latn'`/`ar-MA`) as the `Intl.DateTimeFormat`/`NumberFormat` locale string, NOT plain `'ar-EG'`. Plain `'ar-EG'` renders Arabic-Indic digits (١٢٣) which **fail the e2e tests that assert Latin digit text** (e.g. appointment time slots `1:00 م`, `السبت (1:00 م - 8:00 م)`). See `src/lib/time.ts` `formatTime` — copy its pattern (`ar-EG-u-nu-latn`) for any new Arabic time/number formatting. This exact bug already bit once (appointment.spec.ts:51) — do not regress it.
- **RTL:** `dir={locale === 'ar' ? 'rtl' : 'ltr'}` is applied on the `<html>`/root in `src/app/layout.tsx`. Arabic is RTL. When creating new layouts/themes check both LTR (en) and RTL (ar) rendering — e2e runs both.

## Colors / design tokens

Defined as **Tailwind theme tokens** in `tailwind.config.ts` (NOT CSS variables):

- `primary` `#5A0B1A` (burgundy) — headers, buttons, active states, headings accents
- `primary-dark` `#3D0712`, `primary-light` `#7A1026`
- `gold` `#C7A45B` (accent, used sparingly)
- `cream` `#F8F3EA` + `cream-dark` (alternate section backgrounds — warm off-white, NOT gray)
- `text` `#222222` + `text-muted` `#6B6B6B`; `border` `#E8E1D8`
- Type scale uses Tailwind `fontSize` tokens (`display-*`, `heading-*`, `body`, `caption`, `overline`).
- **Guideline (from the UI/UX audit):** 60% white/cream, 30% burgundy, 10% gold. One burgundy icon color for all icons in a section (no pink/gold/orange mix). Do NOT introduce ad-hoc hex colors in components — use theme tokens.

## E2E testing (Playwright) — the two real gotchas

Playwright config: `playwright.config.ts` (specs, `testDir: src/tests/e2e`).

- **`webServer` runs `npm run build && npm run start` with `reuseExistingServer: !CI`.** If a dev/prod server is ALREADY running on port 3000 it will be **reused**, so a mid-change run can test a stale build. **If a broad run shows a surprising wall of failures (e.g. 102), a stale server is being reused — stop the server on port 3000 first, then rerun.** (This produced a long false-failure session here.)
- **The full matrix is expensive (~6 viewport projects × ~medium specs).** Prefer running ONE spec file at a time: `npx playwright test src/tests/e2e/appointment.spec.ts`. Running multiple spec files in one invocation across 6 projects takes many minutes and is more likely to hit timeout/stale-server flakes.
- **Contact page strict-mode constraint (regression-guard):** the e2e `contact.spec.ts` asserts `a[href*="share.google"]` resolves to **exactly one anchor** (strict mode). The contact page must render the Google Maps link exactly ONCE. The mini "Find us" card CTA is an **in-page scroll anchor** (`href="#clinic-map"` using `mapJumpLabel`/`mapJumpLabelAr`), and only the map-section CTA (at the bottom, `id="clinic-map"`) links out (`googleMapsUrl`). **Never add a second share-URL anchor** (e.g. a second button pointing at `googleMapsUrl` on the contact page) or contact.spec:33 will fail strict mode. Home page `LocationSection` is a separate page and is fine.

Accessibility tests: separate config `playwright.a11y.config.ts` + `src/tests/accessibility`. Run with `npm run test:accessibility`. It's a lighter matrix (chromium only) than `test:e2e`.

## Structure

- `src/app/` — routes/pages (each page receives `locale` via `/[locale]/...` route params)
- `src/components/` — shared UI; `sections/` = page sections (Hero, Services, WhyMivida, BeforeAfter, ContactContent, LocationSection, etc.)
- `src/content/clinic.ts` — clinic data (address.ar/en, phone, whatsapp numbers, `googleMapsUrl`, `workingHours` days, socials). This drives most sections.
- `src/lib/` — helpers: `time.ts` (`formatTime`/`formatRange` — see i18n note), `whatsapp.ts` (`getWhatsAppUrl`), `utils.ts` (`cn`)
- `src/messages/{en,ar}.json` — all copy (both languages, key + `Ar` suffix)
- `src/tests/` — `unit/` (vitest), `e2e/` (Playwright), `accessibility/` (Playwright a11y)

## Other

- `next-intl` v3 — messages are static JSON, loaded per-language; keep `key : keyAr` pairing consistent.
- Clinc opening hours: Sat/Sun/Wed (working days). Appointment features derive selectable days from `clinic.workingHours`.
- Use `cn()` (`clsx`-like) for conditionals. Keep components typed (`'ar' | 'en'` for locale).
