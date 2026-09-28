# PHASE 0 — REPOSITORY DISCOVERY

## 1. Project Architecture & Setup
- **Framework**: Next.js 14.2.15 (App Router, strict TypeScript)
- **Styling**: Tailwind CSS (v3.4), PostCSS, global CSS with CSS variables
- **i18n**: next-intl for English (`en`) and Arabic (`ar`) locales
- **Testing**: Playwright for E2E and Accessibility, Vitest for unit tests
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: lucide-react

## 2. Directory Structure
```
src/
├── app/               # Next.js App Router pages and layouts
│   ├── [locale]/      # Localized routes (about, appointment, contact, etc.)
│   ├── layout.tsx     # Root layout (handles dir="ltr/rtl")
│   └── page.tsx       # Root redirect to default locale
├── components/        # UI and Feature components
│   ├── appointment/   # Appointment forms and CTA
│   ├── before-after/  # Gallery components
│   ├── layout/        # Header, Footer, Mobile Navigation
│   ├── sections/      # Page sections (Hero, About, Services, etc.)
│   └── ui/            # Reusable UI elements (Button, Input, Cards)
├── content/           # Static content (clinic data, doctor info, services)
├── lib/               # Utility functions (i18n, seo, time, utils, validation)
├── messages/          # next-intl translation files (ar.json, en.json)
└── styles/            # globals.css
```

## 3. Existing Design System (Current State)
### Colors
- **Primary**: `#5A0B1A` (Burgundy)
- **Gold**: `#C7A45B`
- **Cream**: `#F8F3EA`
- **Text**: `#222222` (Muted: `#6B6B6B`)
- **Border**: `#E8E1D8`
*(Observation: While brand colors exist, their application across components might be generic or overly heavy based on standard AI-generation patterns).*

### Typography
- **Arabic**: Alexandria (loaded via next/font)
- **English**: Manrope (loaded via next/font)
- Scale ranges from `display-xl` (4.5rem) to `overline` (0.75rem).
*(Observation: The scale is very large (display-xl at 4.5rem) which may cause responsive issues or look excessively "SaaS-like" rather than premium medical).*

### Components & Spacing
- Spacing uses a custom scale (`space-1` to `space-24`).
- Border radius relies heavily on `rounded-xl` for cards, which can contribute to the "AI-generated" look.
- Shadows are defined but might be overused on cards (`shadow`, `shadow-md`, `card-hover`).
- Buttons have standard states (`btn-primary`, `btn-secondary`, `btn-outline`).

## 4. Keep, Modify, Remove, Do Not Touch

### KEEP
- The Next.js App Router structure and dynamic `[locale]` routing.
- The `next-intl` configuration and translation keys (single source of truth).
- `clinic.ts` and other content structures (the data itself).
- SEO implementation, metadata generation, and document attributes.
- E2E and Unit testing infrastructure.
- React Hook Form and Zod validation logic.

### MODIFY
- **`tailwind.config.ts`**: Refine the color palette to introduce semantic nuances (Deep Primary, Soft Gold, Warm White) and adjust the spacing/typography scale to be more editorial and premium.
- **Global CSS (`globals.css`)**: Overhaul utility classes like `.card`, `.btn`, and animations. Reduce heavy shadows and excessive border radii.
- **Section Components (`src/components/sections/*`)**: Redesign layouts to break away from the "heading + 3 identical cards" pattern. Introduce asymmetrical, image-led, and editorial compositions.
- **Hero Section**: Recompose for a premium feel (strong typography, balanced whitespace, clear but elegant CTA).
- **Service Cards & UI Elements**: Shift from generic rounded cards to sophisticated layouts with subtle borders or tonal backgrounds.

### REMOVE
- Generic, unmotivated animations (e.g., everything sliding up on scroll).
- Identical card grids repeated across multiple sections.
- Overuse of heavy drop shadows and pill shapes.
- Any leftover generic stock-like imagery placeholders if present.

### DO NOT TOUCH
- The `t` helper implementation and i18n logic.
- Playwright configurations (`playwright.config.ts`, `playwright.a11y.config.ts`).
- Routing structure and middleware logic.
- Contact form submission logic.

## 5. PHASE 1 & 2 — BROWSER VISUAL AUDIT & AI-LOOK DETECTION (COMPLETED)
Based on a real browser visual audit at Desktop (1440x900) and Mobile (390x844), the following specific "AI-generated" patterns and UX issues were identified:

### Desktop (1440x900)
- **Hero Section**: Massive empty whitespace surrounds the text. The main title feels undersized and lacks visual impact. The `--- TEXT ---` overline badge feels highly generic and AI-generated. The watermark circles are sparse and disconnected.
- **Services Grid**: A repetitive 4x2 card grid. The cards have a top 50% beige block that feels overly large and generic.
- **Why Choose Mivida**: Another generic 4-card horizontal grid with basic icons.
- **Footer**: Noticeable empty vertical space in the lower half.

### Mobile (390x844)
- **Services Section**: The cards stack in a single column, but the top beige icon block is ~200px tall. This results in users scrolling through 8 full screens just to pass the services section.
- **Footer Navigation Collision**: The sticky bottom action bar overlaps and obscures the footer text/links due to insufficient bottom padding (`pb-24`) on the footer container.

### The "Anti-AI" Correction Mandate
We must eliminate the repetitive 3-4 card grids, flatten the heavy shadows, remove the `--- TEXT ---` badge decorations, fix the mobile service card heights, and recompose the Hero section for a premium, intentional editorial look.

## 6. Next Steps
Move to **PHASE 3 & 4 (ART DIRECTION & DESIGN SYSTEM)** to formalize specific layout changes, then **PHASE 5 (HOMEPAGE PROTOTYPE)**.
