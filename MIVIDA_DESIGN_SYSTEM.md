# MIVIDA DESIGN SYSTEM

## 1. Color Tokens & Usage Hierarchy
```js
colors: {
  primary: {
    DEFAULT: '#5A0B1A',
    deep: '#3B0711',
    soft: '#F1E4E7',
  },
  gold: {
    DEFAULT: '#C7A45B',
    soft: '#F2EBDD',
  },
  cream: {
    DEFAULT: '#F8F3EA',
  },
  neutral: {
    white: '#FFFFFF',
    warm: '#FCFAF7',
  },
  text: {
    DEFAULT: '#241C1D',
    muted: '#756B6D',
  },
  border: {
    DEFAULT: '#E6DEDA',
  }
}
```
**Usage Hierarchy:**
- **Warm Neutrals & White**: Dominant. Used for 80% of backgrounds and negative space.
- **Burgundy (Primary)**: Strategic. Used for CTAs, major headings, and focal UI elements.
- **Gold**: Restrained Accent. Never used for large backgrounds or body text. Used for subtle borders, active states, or delicate emphasis.

## 2. Typography Scale & Refinement
Fonts remain **Alexandria (Arabic)** and **Manrope (English)**.
*Crucial Rule*: Do NOT assume Arabic and English need identical visual sizing. Arabic often requires slightly larger base sizes or adjusted line heights to match the optical volume of English. Test visually. Do not use negative letter-spacing on Arabic text.
```js
fontSize: {
  'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }], // 56px
  'h1': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],      // 40px
  'h2': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],       // 32px
  'h3': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],      // 24px
  'h4': ['1.25rem', { lineHeight: '1.4' }],                               // 20px
  'body-lg': ['1.125rem', { lineHeight: '1.6' }],                         // 18px
  'body': ['1rem', { lineHeight: '1.6' }],                                // 16px
  'caption': ['0.875rem', { lineHeight: '1.5' }],                         // 14px
}
```

## 3. Spacing & Containers
- **Spacing Scale**: Base Tailwind scale mapped to intentional usage (e.g., `4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 120`). Remove generic `py-20`/`py-24` from all `.section` classes and apply padding contextually.
- **Container**: Max width `1280px`. Padding: `16px` mobile, `32px` tablet, `48px-64px` desktop.

## 4. UI Elements
### Buttons
- **Primary**: Background `primary`, Text `white`. Hover: `primary-deep`.
- **Secondary**: Outline with `border-primary` or tonal with `primary-soft` background.
- **Ghost**: Transparent background, text `primary`. Hover: `primary-soft`.
- **Radius**: `8px` (`rounded-lg`) or `12px` (`rounded-xl`). No pills (`rounded-full`) except for specific floating action buttons.
- **Height**: Standardized padding (`py-3 px-6`).

### Cards & Borders
- **Shadows**: Deprecate `.card-hover` heavy shadow. Use subtle `shadow-sm` or just a `border` (`#E6DEDA`) with a tonal background.
- **Radius**: Structural elements use `12px` (`rounded-xl`) or `24px` (`rounded-2xl` or `3xl` for large image features).
- **Images**: Consistent aspect ratios (e.g., `aspect-square`, `aspect-[4/3]`, `aspect-[3/4]`) enforced via Tailwind classes.

## 5. Mobile Action Bar & Layout Logic
- **Collision Prevention**: The Mobile Action Bar must NOT overlap footer content. This is solved via layout-aware logic, not arbitrary padding.
- **Implementation**: The main `layout.tsx` or `Footer.tsx` must calculate or account for the exact height of the Action Bar (e.g., `calc(100vh - action-bar-height)` or strict padding-bottom `pb-[calc(4rem+env(safe-area-inset-bottom))]`).
- Ensure footer links remain clickable and readable.

## 6. Component Pattern Matrix

| Component | Allowed Variants | Prohibited | Radius | Spacing |
| :--- | :--- | :--- | :--- | :--- |
| **Buttons** | Primary, Secondary, Ghost | Pill shapes (unless FAB), random colors | 8px or 12px | `px-6 py-3` |
| **Cards** | Subtle border + Tonal bg, Image + Text | Heavy floating drop shadows | 12px | `p-6` or `p-8` |
| **Section Headings** | Left-aligned editorial, Centered (rare) | Giant centered text with no max-width | N/A | `mb-8` or `mb-12` |
| **Images** | 4:3, 3:4, 16:9, 1:1 strict crops | Unconstrained raw sizes, heavy borders | 0px, 12px, 24px | N/A |
| **CTA Blocks** | Integrated into content flow | Full-width massive standalone blocks | N/A | `mt-8` |
| **Form Fields** | Standard input, subtle border | Heavy shadows, pill inputs | 8px | `px-4 py-3` |

## 7. Animation
- Duration classes: `duration-200`, `duration-300`.
- Easing: `ease-out`.
- Effects: `fade-in`, `slide-up` (limit distance to 10-20px). No complex stagger choreographies on scroll.
