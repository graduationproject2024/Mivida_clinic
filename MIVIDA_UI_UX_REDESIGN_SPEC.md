# MIVIDA UI/UX REDESIGN SPECIFICATION & ART DIRECTION

## 1. Brand Personality & Art Direction
Mivida Clinic must feel like a premium, warm, and sophisticated healthcare brand. The visual language should prioritize:
- **Editorial Compositions**: Intentional asymmetry, image-led storytelling, and clear text/image relationships.
- **Warm Elegance**: A dominance of warm whites (`FCFAF7`) and creams (`F8F3EA`), anchored strategically by deep Burgundy (`#5A0B1A`).
- **Restrained Gold**: Gold (`#C7A45B`) must be used strictly as an accent (e.g., small details, active states, delicate borders), not as a secondary primary color.
- **Sophisticated Typography**: The scale must feel deliberate. Headings should be readable, well-measured (max-width), and not oversized.

## 2. Information Hierarchy & Page Structure (Homepage)
The homepage establishes the visual DNA for the entire site. The target flow is:
1. **Premium Navigation**: Lightweight, scannable header.
2. **Recomposed Hero**: Eliminate the excessive whitespace and generic `--- BADGE ---`. Strong, balanced typography with a clear primary CTA.
3. **Trust & Doctor Section**: Asymmetric editorial layout focusing on human connection, avoiding standard corporate cards.
4. **Services Presentation**: Break the 4x2 identical card grid. Move towards a featured service + supporting services list, or an editorial asymmetric grid.
5. **Why Mivida**: Shift from a standard 4-card horizontal feature row to a more narrative, image-integrated approach.
6. **Gallery (Before/After)**: Clean, subtle framing without uneven margins.
7. **Contact & Footer**: Fix mobile overlap. Provide clear hierarchy for location and hours.

## 3. Anti-AI Rules
- **No repetitive card grids**: If a section can be an editorial list or a split composition instead of a 3-card layout, use it.
- **No excessive border-radius**: Default to medium (`12px`) or small (`8px`) for structural elements.
- **No generic badges**: Remove `--- TEXT ---` style decorators.
- **Purposeful spacing**: Whitespace must group related items (Gestalt proximity), not just fill the screen.
- **Shadows**: Avoid heavy floating drop-shadows. Rely on 1px borders (`#E6DEDA`) and tonal background contrast.

## 4. Responsive & Mobile-First Principles
- **Mobile Density**: Fix the excessive height of mobile service cards. Content must be dense enough to be scannable without endless scrolling.
- **Safe Areas**: Ensure the sticky mobile action bar does not obscure footer content (requires `pb-24` / `pb-28` on the main layout or footer).
- **Text Wrapping**: Ensure headings do not awkwardly orphan words on 390px screens.

## 5. Animation Rules
- **Timing**: Micro (150-200ms), Standard (250-300ms).
- **Types**: Subtle fades, small translates (e.g., `translate-y-2` fading to `0`), button background transitions.
- **Prohibitions**: No bouncing, spinning, or large scroll-jacking choreography.

## 6. MIVIDA IMAGE LANGUAGE
- **Style & Lighting**: Natural, sophisticated, avoiding harsh clinical flashes or overly retouched "glamour" filters. Soft, diffuse lighting preferred.
- **Composition & Crop**: Intentional focal points. Faces (doctors/patients) should have breathing room.
- **Aspect Ratios**: Enforce strict aspect ratios (e.g., 4:3, 3:4, 1:1, 16:9) using CSS. Do not use unconstrained raw image sizes in grids.
- **Image Treatment**: No heavy borders. Subtle radii (12px or 24px). 
- **Prohibited Imagery**: Generic medical stock (e.g., blue stethoscopes), overly retouched beauty models, decorative images with no semantic meaning.
- **Image Roles**:
  - *Hero*: Establish premium feel and human connection.
  - *Trust (Doctor)*: Direct eye contact, professional yet warm.
  - *Context (Clinic)*: Show the environment to build familiarity.
  - *Detail (Services)*: Specific, relevant textural or treatment imagery.

## 7. CTA HIERARCHY
- **Primary CTA**: `Book Appointment` (Burgundy background, high contrast). Used in Hero, final conversion sections, and sticky mobile bars.
- **Secondary CTA**: `Contact` or `View All Services` (Outline or Soft Tonal background). Used as alternative paths when the user isn't ready to book.
- **Utility CTA**: `Call`, `WhatsApp`, `Location` (Ghost or specific brand color like WhatsApp Green, minimal footprint). Used in Footer, Contact section, and utility headers.
- **Rule**: Do not create a new CTA style per section. Use the established hierarchy. Do not repeat the same CTA blocks unnecessarily if the user just saw one.
