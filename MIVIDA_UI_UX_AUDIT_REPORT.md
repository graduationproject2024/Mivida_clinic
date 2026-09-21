# MIVIDA UI/UX AUDIT REPORT — INITIAL FINDINGS

**Date:** 20 Sep 2026
**Scope:** Full production audit of the already-implemented Mivida Clinic bilingual (AR/EN) website (Next.js 14 App Router, next-intl, Tailwind).
**Method:** static inspection, full-file subagent audit against Web Interface Guidelines + master prompt rules, runtime browser probe against a local prod server, asset metadata extraction.

> **Model limitation (documented, not hidden):** this review environment cannot render images. Visual states (logo legibility, photo quality, slider alignment) were evaluated **objectively** (dimensions, aspect ratio, contrast math, DOM/geometry probes) and must get a final human visual pass. Screenshots captured and checked for geometry, not pixel aesthetics.

---

## 1. INITIAL PROBLEMS REGISTER

Severity: **P0** = blocking · **P1** = critical · **P2** = important · **P3** = minor

| # | Sev | Route/Component | Problem | Root cause | Fix | Verification |
|---|-----|-----------------|---------|-----------|-----|--------------|
| 1 | **P1** | All (App global) | Real clinic assets NOT integrated. `doctor.hasPhoto=false`; header/footer use text wordmark only; before/after uses `mockCases` with **invented treatment labels + result claims** in data & alt text | Logo, doctor photos, patient-case folder never wired into the site | Copy 5 real patient images → honest "قبل/بعد" gallery; wire 2 doctor photos; wire logo into header/footer; derive favicon/OG | Metadata + route audit |
| 2 | **P1** | Footer | `/privacy` and `/terms` links → **404** (routes don't exist) | Links added without pages | Create real bilingual Privacy & Terms pages (or remove links) | Fetch probe → 200 |
| 3 | **P1** | Contact / Location | Google Maps iframe **frame-blocked** (`X-Frame-Options: sameorigin`) — map area broken | `share.google` URL redirects to google.com which can't be framed | Replace embed with styled "Open in Google Maps" card + direction link | Probe/index |
| 4 | **P1** | All pages | `public/og-image.jpg` (447 B), `icon-192.png` (282 B), `icon-512.png` (283 B), `favicon.ico` (277 B) are **corrupt/empty**; `favicon-16x16.png` + `apple-touch-icon.png` referenced but **missing** | Placeholder files checked in | Generate real brand icons from logo; generate 1200×630 OG card; fix icon refs | HTTP 200 + readable image |
| 5 | **P1** | Fonts | English font is **Inter**, not Manrope — `Inter` is loaded in `src/app/layout.tsx` and assigned to `--font-manrope`; `globals.css` also `@import`s the Google fonts CSS (double download, Alexandria loaded twice) | Wrong font wired to variable | Load `Manrope` via next/font; remove css `@import`; keep Alexandria | Font computed check |
| 6 | **P1** | Service pages | Unverified medical claims/guarantees: durations ("6-18 months", "3-4 sessions"), "Instant results", "no allergy or rejection risk", "suitable for all skin types" etc. (ServiceDetailContent) | Content invented at build time | Soften to measured, non-guaranteeing copy; remove absolute claims | Content audit |
| 7 | **P1** | Before & After | `mockCases` alt labels claim outcomes ("cheek volume restoration", "Filler treatment results"...) and AR UI shows untranslated category chips (Filler/Botox/…) | Placeholder data w/ invented results | Neutral labels; remove chips; honest gallery + lightbox on real 5-case images | Audit |
| 8 | **P1** | Before & After page meta | Meta description "View real results from Mivida Clinic treatments" → overclaim | Copy | Reword to gallery description | Audit |
| 9 | **P2** | DoctorSection | Invented stat "10+ سنوات خبرة / 10+ Years Experience" + **"photo coming soon"** placeholder; `-right-6/-right-10` physical offset (RTL bug) | Unverified content + no photo integration | Real photo; drop unverifiable stat; logical-end offset | Audit |
| 10 | **P2** | Hero | Scroll indicator uses `ChevronRight` (sideways glyph) | Wrong Lucide glyph | Use `ChevronDown` | Audit |
| 11 | **P2** | Appointment | Time slots render raw 24h "13:00" for both locales; day labels hardcode م/ص & AM/PM duplicating `clinic.ts` (drift risk); `text-left` on confirm block (RTL bug); service/day/time/notes lack `autocomplete` | No Intl usage | Intl.DateTimeFormat day+time formatting; `text-start`; add autocomplete | Audit |
| 12 | **P2** | MobileActionBar | `text-left` (RTL bug); non-standard `listbox>list>li>button[role=option]` nesting; no Escape-to-close on sheet | Copy/paste from select pattern | `text-start`; simpler button group; Escape handler | Audit |
| 13 | **P2** | Before/After widgets | Gallery prev/next icon buttons lack `focus-visible` (modal ones have it); "slider" is a static 50/50 split, no draggable handle; tablist dots lack arrow-key nav | Incomplete implementation | Consistent focus styles; real keyboard support; align with new gallery | Audit |
| 14 | **P2** | Copy hygiene | "Loading..." / "Sending..." ASCII dots (ar+en messages, L16/L23); "Crow's feet" straight apostrophe; hardcoded "احجز موعدك"/"Book Appointment" + "اعرف المزيد" instead of `common.*` keys in ServiceDetailContent/ServiceCard | Copy not centralized | Curly quotes/ellipsis; reuse message keys | Audit |
| 15 | **P3** | RTL physical props | `text-left` ×2, stat-badge `-right-*` ×2 | Hardcoded sides | Logical `text-start`/`inset-inline-end` | Audit |
| 16 | **P3** | Hero | `heading-xl sm:heading-lg` — heading dips to smaller variant at small breakpoints (sm overrides xl) | Class stacking | Consistent responsive heading stack | Audit |
| 17 | **P3** | WhyMividaSection / LocationSection | Unused imports (`ChevronRight`, `Truck`, `MessageSquare`, `Clock`…); `closedDays` dead var | Leftovers | Remove unused | lint |
| 18 | **P3** | WhatsApp lib | `formatEgyptianWhatsAppNumber` exported but unused (dead code) | Legacy | Remove or use | lint |
| 19 | **P3** | Global CSS | No `-webkit-tap-highlight-color`, no `touch-action: manipulation` on `.btn`, no `overscroll-behavior: contain` on menu/modal sheets; `text-transform: uppercase` on `.overline` renders Arabic oddly | Guideline gaps | Add base rules; make overline case-handling locale-safe | Audit |
| 20 | **P3** | i18n meta | Root layout hardcodes `lang="ar" dir="rtl"`; fixed by client effect post-hydration (EN pages show wrong lang/dir if JS fails) | Router constraint | Acceptable w/ DocumentAttributes; log as known limitation | Probe |
| 21 | **P3** | Typography | Doctor name uses `heading-sm` (card) vs `heading-md` (about) — inconsistent hierarchy | Multi-file hand CSS | Align scale | Audit |

---

## 2. BASELINE (recorded before changes)

- Framework: Next 14.2.15 (App Router, TS strict), React 18.3, Tailwind 3.4, next-intl 3.23, RHF+zod, lucide-react, Playwright + axe.
- Routes: home, about, appointment, before-after, contact, services, services/[service], 404 — per locale; locales `ar` (default) / `en`.
- i18n: next-intl with `src/messages/{ar,en}.json`; dir/lang applied by a client component (see #20).
- Styling: token system matches the master palette (Primary #5A0B1A, Gold #C7A45B, Cream #F8F3EA) in `tailwind.config.ts` + `globals.css` HSL vars.
- Fonts: Alexandria (Arabic) correct; English assigned **Inter** via `--font-manrope` (#5).
- **Existing test/baseline state (green):** `tsc --noEmit` pass, `next lint` clean, Vitest 27/27, Playwright e2e **384/384**, axe suite **23/23**. Build passes.
- Runtime probe caveat: the process running on :3000 served stale `.next` hashes (all static assets returned 400 in the probe) — the production server must be restarted from a fresh build. Under that stale server: `/ar/privacy` + `/en/terms` genuinely return 404; EN pages reported `lang=ar dir=rtl` only because JS/hydration failed to load in the probe.

## 3. ASSET METADATA

- **Logo** `…n (1).jpg`: 1369×1149 px (≈1.19:1), 72.9 KB, JPEG (background unknown — human visual check required).
- **Doctor photo A** `387220750…jpg`: 939×960 px (0.98:1), 59.3 KB. **Doctor photo B** `553540081…jpg`: 720×736 px (0.98:1), 43.1 KB. Both near-square.
- **Patient cases** (`PATIANTCE/`): 5 square photos, 2048×2048 ×3 + 1440×1440 ×2. Filenames are Facebook post IDs — **no explicit before/after pairing**. Per master prompt §11, pairing is NOT established → present as a gallery, never invented splits or treatment labels.
- Existing `public/images/before-after/*` (6×800×600 pairs) are **not** the supplied patient assets → replaced.
- Patient-privacy: filenames are public FB post IDs; images will be displayed with neutral captions only (no names/handles). Final visual privacy check by a human is required.

## 4. AVAILABLE SKILLS USED

Web-design-guidelines (guideline fetch + format), subagent file audit, runtime Playwright probe, asset metadata extraction. **Not used:** image/visual skills (model cannot see images — honest limitation recorded). Screenshot **geometry** checks planned for the final pass.

## 5. PLAN (priority order)

FIX A asset integration · FIX B fonts/icons · FIX C dead links + map · FIX D before/after honesty · FIX E copy/claims hygiene · FIX F RTL/icon/physical props · FIX G Intl time + a11y CSS · tests updated · full validation → MIVIDA_FINAL_QA_REPORT.md