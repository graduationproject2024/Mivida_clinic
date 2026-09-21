# QA Report — Mivida Clinic Website

**Date:** 20 Sep 2026
**Project:** `mivida-clinic-website` — bilingual (AR/EN) Next.js 14 clinic website
**Result: ALL GREEN**

| Gate | Command | Result |
|------|---------|--------|
| Type check | `npm run type-check` (`tsc --noEmit`) | Pass (exit 0) |
| Lint | `npm run lint` (`next lint`) | No ESLint warnings or errors |
| Unit tests | `npm run test` (Vitest) | 27 / 27 passed |
| E2E matrix | `npx playwright test` | 384 / 384 passed (3.9m) |
| Accessibility | `npx playwright test --config playwright.a11y.config.ts` | 23 / 23 passed |

## E2E Matrix (384 tests)

Ran against the production build over 6 Playwright projects:

- **chromium**, **firefox**, **webkit** (desktop)
- **Mobile Chrome**, **Mobile Safari**, **Tablet** (emulated viewports)

Coverage:
- Homepage (hero, services, doctor, navigation, language switcher) in AR + EN, incl. root-path re-switching
- Services overview + all 8 service detail pages (Filler, Botox, Plasma, Skin & Hair, Laser, Glow Injection, Mesotherapy, Stem Cells) in AR + EN, each checked for required sections (breadcrumb, H1, description, benefits, what-to-expect, FAQ, CTA)
- Appointment flow (load, validation errors, disabled-until-valid, day/time slot coupling, working-days-only, WhatsApp navigation) in AR + EN
- Contact (info display, phone/WhatsApp/map/social links), language switching incl. detail-page preservation
- Responsive behavior (mobile / tablet / desktop viewports within each project snapshot)

## Accessibility Suite (23 tests)

Two groups in `src/tests/accessibility`:

1. **Automated page scans** — axe-core (WCAG A/AA, best practices) on all 14 routes (7 AR + 7 EN) with defects counted.
2. **Manual-equivalent behavior tests** — keyboard-only traversal of interactive elements, mobile hamburger + labeled ARIA nav (`فتح القائمة`), modal focus on open, Escape-to-close, ArrowLeft/ArrowRight focus movement in the Before/After slider, and `prefers-reduced-motion` rendering.

Result: **23 / 23 passed. Zero axe violations across all 14 pages.**

## Accessibility Defect History → Fix Summary

Initial axe execution flagged **17 failing nodes**; every defect was triaged, root-caused, fixed in source, and the suite re-run until clean. Categories fixed:

| Rule | Root cause | Fix |
|------|-----------|-----|
| `color-contrast` | Brand `.overline` gold at 2.23:1 on white / 2.02:1 on cream | Darkened in `globals.css` via `color-mix` (gold + 45% foreground) → ~4.96:1 |
| `color-contrast` | Muted text at `text-text/50`–`text-text/60` on light backgrounds (breadcrumbs, captions, notes, `مغلق` chip) | Raised to `text-text/75` (or `!text-text/75` where cascade shadowed it) |
| `color-contrast` | CTA headings/paragraphs rendered `--foreground` despite `text-white` | **CSS-cascade bug:** unlayered merged rule `.heading-lg,.heading-xl{color:...}` in the compiled stylesheet beat layered Tailwind utilities regardless of class order → deterministic `!text-white` / `!text-white/90` overrides |
| `landmark-unique` | Before/After sliders exposed duplicate `role="region"` + labels | Removed the redundant regions from slider divs |
| `legal expected landmark (dlitem)` / `aria-required-parent` | `role="list"` on the FAQ `<dl>` overrode native `<dl>` semantics, orphaning `<dt>/<dd>` | Removed `role="list"` and the wrapper `div[role="listitem"]` |
| `aria-required-parent` | `article role="listitem"` not inside a list (About approach + philosophy, 4+4 across AR/EN) | Removed the listitem roles (native `article`s) |
| `aria-allowed-role` | Social `<a role="listitem">` with no list parent (Contact AR/EN) | Real `<ul>`/`<li>` markup + `list-none` |
| `heading-order` | `h3` before `h2` (ServiceCard, Footer columns) | Retitled to `h2` |
| `link-in-text-block` | Breadcrumb links blended with surrounding `text-text/60` | Bumped breadcrumb text to `text-text/75` |

### Interactive accessibility (verified by behavior tests)

- Modal/slider dialogs: focus moved to dialog on open, `tabIndex={-1}` + focus for keyboard reach, `aria-modal="true"`/`role="dialog"`, document-level Escape handler, arrow-key focus on prev/next controls.
- Keyboard-only tab visit of every interactive element on home/appointment/contact passes in order.
- Mobile menu: labeled hamburger toggle `فتح القائمة` with `aria-expanded`; desktop nav labeled `Main navigation`, mobile labeled `Mobile navigation`.
- Focus-visible indicators present; `prefers-reduced-motion: reduce` honored in CSS (tests assert no forced motion).

## Commands to Reproduce

```bash
npm run build            # production build
npm run start            # serve on :3000 (or let Playwright webServer manage it)
npm run type-check
npm run lint
npm run test             # 27 unit
npx playwright test      # 384 e2e
npx playwright test --config playwright.a11y.config.ts   # 23 a11y
```

Raw run logs captured in `e2e-run.txt` and `a11y-run.txt` at the repo root.