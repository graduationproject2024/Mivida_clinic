# MIVIDA CLINIC — GATE #3 DISCOVERY

## 1. Actual Architecture
- **Framework**: Next.js 14 App Router (React 18).
- **Internationalization**: `next-intl` (v3.23.5) configured via `src/middleware.ts` intercepting `/` and appending `/(ar|en)/:path*`.
- **Styling**: Tailwind CSS with custom theme tokens.
- **Components**: `src/components/` split into `layout`, `sections`, `services`, `appointment`, and `ui` (no third-party UI libraries like Shadcn; fully custom components).

## 2. Actual Configuration
- `next.config.mjs`: Integrates `createNextIntlPlugin`. Optimized `images.remotePatterns` for googleusercontent domains. `optimizePackageImports` for `lucide-react`.
- `package.json`: Contains devDependencies for Playwright, Vitest, Axe-core, and standard linting tools.
- `tailwind.config.ts`: Extended with theme tokens specifically avoiding generic styles. 

## 3. Actual Routes
- `/[locale]/` -> Homepage
- `/[locale]/about` -> About Page
- `/[locale]/services` -> Services Archive
- `/[locale]/services/[service]` -> Individual Service Details (e.g. `filler`, `botox`)
- `/[locale]/before-after` -> Gallery
- `/[locale]/contact` -> Contact Page
- `/[locale]/appointment` -> Appointment Request Page

## 4. Actual Metadata & SEO Implementation
- **Robots/Sitemap**: `src/app/robots.ts` and `src/app/sitemap.ts` are active and well-formed.
- **Global Metadata**: Defined in `src/app/layout.tsx`.
- **Dynamic SEO**: Implemented via `src/lib/seo.ts` using `generateSEO`. It dynamically generates Title, Description, Open Graph attributes, Twitter cards, and structured JSON-LD (MedicalClinic, MedicalTherapy, BreadcrumbList).
- **Canonical & Hreflang**: Canonical links and `alternates.languages` are auto-generated per route accurately for both English and Arabic.

## 5. Actual Test Infrastructure
- **E2E**: Playwright configuration testing across `chromium`, `firefox`, `webkit`, and mobile viewports (`Mobile Chrome`, `Mobile Safari`, `Tablet`). Total matrix runs 384 tests covering all localized pages and user flows.
- **Accessibility**: Specific Playwright a11y suite (`playwright.a11y.config.ts`) analyzing pages against `axe-core`. Runs 23 strict a11y tests.
- **Unit**: Vitest suite set up in `src/tests/unit/`.

## 6. Known Limitations Identified
- Next.js root layout (`src/app/layout.tsx`) initially had hardcoded `<html lang="ar" dir="rtl">` which caused SEO parsing mismatches on English routes despite client-side rectification.
- SEO configuration lacked the fallback `x-default` alternate attribute for optimal multi-region hreflang compliance.
