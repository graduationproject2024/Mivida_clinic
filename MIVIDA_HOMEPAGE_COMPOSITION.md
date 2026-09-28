# MIVIDA HOMEPAGE COMPOSITION STRATEGY — FINAL REFINEMENT

## 1. HERO COMPOSITION: EDITORIAL ASYMMETRY
- **Alignment Grid**: A 12-column underlying structure. Left text block spans 7 columns, right image spans 5 columns.
- **Desktop (1440px / 1280px)**: 
  - *Height*: Target 85vh (min 600px, max 800px). 
  - *Image Behavior*: The image bleeds off the right edge of the standard container, offsetting vertically by -24px to break the box. Aspect ratio is portrait (approx 3:4).
  - *Text Width*: H1 `max-w-2xl`, Supporting text `max-w-lg`.
  - *Whitespace*: Deliberate spacing below the header before the H1. Tight, grouped spacing between H1, paragraph, and CTA.
- **Tablet (1024px / 768px)**: 
  - *Height*: Auto-fit content, target ~60vh. 
  - *Layout*: Switch to a 50/50 split or stacked layout. Text padding adjusts to `px-8`.
- **Mobile (390px / 360px)**: 
  - *Layout*: Image sits top (cropped 4:3 or 16:9), text directly beneath it. No horizontal bleed.
  - *Spacing*: Dense layout. Padding `px-4`. H1 and CTA tightly grouped.

## 2. HERO CONTENT RULE
- We will strictly use the existing `clinic.ts` and `messages/*.json` content.
- We will NOT invent medical claims, guarantees, or testimonials. The hero will state the clinic's actual proposition clearly.

## 3. DOCTOR SECTION (Human Editorial)
- **Image**: `public/images/doctors/doctor-1.jpg`.
- **Ratio/Crop**: Portrait (4:5 or 3:4). Focus on the face/shoulders.
- **Desktop**: Image left (4 columns), Text right (6 columns), offset by 2 empty columns for breathing room.
- **Typography**: Name in H2 (`heading-md`), Bio in standard `body-lg`.
- **Mobile Order**: Portrait Image -> Name -> Credentials -> Bio -> CTA.

## 4. SERVICES CONTENT-TO-LAYOUT MAPPING
Based on `src/content/services.ts`, there are 8 services.
| Existing Service | Homepage Role | Display Priority | Mobile Treatment |
| --- | --- | --- | --- |
| Laser | Featured | High | Visible, image-led |
| Filler | Featured | High | Visible, image-led |
| Botox | Supporting | Medium | Compact List |
| Plasma | Supporting | Medium | Compact List |
| Skin & Hair | Supporting | Medium | Compact List |
| Glow Injection | Supporting | Low | Hidden (View All) |
| Mesotherapy | Supporting | Low | Hidden (View All) |
| Stem Cells | Supporting | Low | Hidden (View All) |

- **Layout**: 2 Featured Services alongside a compact list of the next 3. A "View All Services" button routes to the rest. This completely eliminates the 4x2 generic grid and excessive mobile scrolling.

## 5. SERVICES MOBILE SCROLL BUDGET
- **Target**: Maximum 1.5 mobile viewports.
- The 2 featured services stack cleanly. The 3 supporting services render as a tight, border-separated list.

## 6. WHY MIVIDA (THE DISTINCTIVE EXPERIENCE)
- **Reframed Purpose**: "What makes the Mivida experience distinctive?"
- **Content**: Using existing documented differentiators (e.g., specific technologies or care standards). No invented claims (e.g., "Best in Tanta").
- **Composition**: An image-integrated narrative (text overlapping a subdued background image, or an asymmetric split) rather than 4 repetitive cards.

## 7. BEFORE / AFTER (DOCUMENTATION)
- **Reframed Purpose**: "Examples of documented treatment results."
- **Content**: Real assets (`case-1.jpg` to `case-5.jpg`). No invented treatment labels.
- **Composition**: Clean masonry or elegant slider. Neutral captions. Consistent framing (aspect ratio 1:1 or 4:3 enforced).

## 8. IMAGE-TO-CONTENT MAPPING
| Image | Section | Role | Aspect Ratio | Focal Point |
| --- | --- | --- | --- | --- |
| `doctor-1.jpg` (or `doctor-2.jpg`) | Trust/Doctor | Establish human connection | 3:4 | Face/Shoulders |
| `case-1.jpg` to `case-5.jpg` | Gallery | Documented results | 1:1 (Enforced) | Center / Area of treatment |
| *Fallback Brand Pattern* | Hero / Context | Ambient trust | Variable | Neutral |
*(Note: As noted in previous audits, real clinic environment photos are missing, so we will rely heavily on the doctor portraits and typography for the Hero, or use a soft brand pattern background).*

## 9. MOBILE SCROLL BUDGET (ENTIRE HOMEPAGE)
| Section | Target Mobile Height | Reason |
| --- | ---: | --- |
| Header | Compact | Utility navigation |
| Hero | ~1 viewport | Immediate positioning + CTA |
| Trust/Doctor | ~0.8 viewport | Human connection (portrait + bio) |
| Services | ~1.5 viewports | Discovery (2 featured + compact list) |
| Why Mivida | ~1 viewport | Differentiation narrative |
| Gallery | ~1 viewport | Visual slider/masonry |
| Contact | ~0.8 viewport | Utility & Footer |

## 10. CTA HIERARCHY
- **Primary**: `Book Appointment` (Burgundy) -> Used in Hero.
- **Secondary**: `View All Services` (Outline/Tonal) -> Used in Services.
- **Utility**: `WhatsApp / Call` (Ghost/Green) -> Used in Contact/Footer.

## 11. MOBILE ACTION BAR
- Will use a layout-aware solution: `padding-bottom: calc(4rem + env(safe-area-inset-bottom))` applied to the main wrapper/footer, ensuring the fixed action bar never obscures the footer links.

## 12. TYPOGRAPHY VALIDATION
- **Arabic (Alexandria)**: Validated to ensure no negative letter spacing. Base sizes adjust slightly upwards if optical weight feels lighter than English.
- **English (Manrope)**: Validated for readability and max line length (45-75 chars).

## 13. COLOR APPLICATION
- **Dominant**: Warm White (`#FCFAF7`) and Cream (`#F8F3EA`).
- **Strategic**: Burgundy (`#5A0B1A`).
- **Restrained**: Gold (`#C7A45B`). No gradients or large gold blocks.

## 14. ANTI-AI VISUAL CHECK
- No 4x2 grids (Services fixed).
- No 4-icon horizontal rows (Why Mivida fixed).
- No giant centered text blocks (Hero fixed to asymmetric).
- No generic `--- TEXT ---` badges.
- No heavy floating card shadows (Shadows deprecated in globals.css).

## 15. FINAL CONTENT-TO-COMPOSITION TABLE
| Section | Actual Content Used | Visual Composition | Primary Action | Desktop | Mobile |
| --- | --- | --- | --- | --- | --- |
| Header | Existing | Lightweight | Book | Sticky/Compact | Compact |
| Hero | Existing | Editorial asymmetry | Book | 60/40 Split | Image top, Text tight |
| Doctor | `doctor-1.jpg` + Bio | Portrait editorial | None | 40/60 Split | Portrait top |
| Services | 2 Featured, 3 List | Featured + compact list | View All | 40/60 Split | Compact list |
| Why Mivida | Existing points | Narrative integrated | None | Text + Ambient | Stacked |
| Gallery | Cases 1-5 | Comparison slider | View Gallery | Full width slider | Mobile slider |
| Contact | Map + Info | Utility split | WhatsApp | 50/50 Split | Action-dense |
| Footer | Existing | Compact hierarchy | Utility | Multi-column | Stacked (Safe Area) |
