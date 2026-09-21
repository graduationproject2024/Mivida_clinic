# Mivida Clinic Website

Production-ready bilingual (Arabic/English) website for Mivida Clinic - a dermatology and aesthetics clinic in Tanta, Egypt.

## Features

- **Bilingual Support**: Arabic (RTL) and English (LTR) with proper locale routing
- **Responsive Design**: Mobile-first approach with breakpoints at 360px, 375px, 390px, 414px, 768px, 1024px, 1280px, 1440px, 1920px
- **Accessibility**: WCAG 2.2 AA compliant with keyboard navigation, screen reader support, and reduced motion
- **SEO Optimized**: Meta tags, Open Graph, Twitter cards, sitemap.xml, robots.txt, structured data (JSON-LD)
- **Performance**: Next.js 14 App Router, Server Components, optimized images, font optimization
- **Appointment Booking**: WhatsApp-based appointment request flow (not a fake booking system)
- **Before/After Gallery**: Accessible modal with keyboard navigation
- **Modern Stack**: TypeScript, Tailwind CSS, next-intl, React Hook Form, Zod

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Testing**: Vitest (unit), Playwright (E2E), axe-core (accessibility)
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── (pages)/
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── services/             # Services pages
│   │   │   ├── about/                # About doctor
│   │   │   ├── before-after/         # Before/After gallery
│   │   │   ├── appointment/          # Appointment booking
│   │   │   ├── contact/              # Contact page
│   │   │   └── 404/                  # Not found page
│   │   └── layout.tsx                # Locale layout
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Root redirect
│   ├── sitemap.ts                    # Sitemap generation
│   └── robots.ts                     # Robots.txt generation
├── components/
│   ├── layout/                       # Header, Footer, MobileActionBar
│   ├── navigation/                   # Navigation components
│   ├── sections/                     # Page sections (Hero, Services, etc.)
│   ├── services/                     # Service cards and detail content
│   ├── appointment/                  # Appointment form
│   ├── before-after/                 # Before/After gallery
│   └── ui/                           # Reusable UI components (Button, Input, etc.)
├── content/
│   ├── clinic.ts                     # Clinic info (address, phone, hours, social)
│   ├── services.ts                   # Services data
│   └── doctor.ts                     # Doctor info
├── lib/
│   ├── whatsapp.ts                   # WhatsApp URL generation
│   ├── validation.ts                 # Form validation & business logic
│   ├── seo.ts                        # SEO metadata generation
│   ├── utils.ts                      # Utility functions
│   └── i18n.ts                       # Locale configuration
├── messages/
│   ├── ar.json                       # Arabic translations
│   └── en.json                       # English translations
├── styles/
│   └── globals.css                   # Global styles & Tailwind imports
└── tests/
    ├── unit/                         # Unit tests
    ├── e2e/                          # Playwright E2E tests
    └── accessibility/                # Accessibility tests
```

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm 9.0.0 or later

### Installation

```bash
# Clone the repository
cd mivida-clinic-website

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - you'll be redirected to `/ar` (Arabic).

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
npm run test         # Run unit tests
npm run test:watch   # Run unit tests in watch mode
npm run test:e2e     # Run Playwright E2E tests
npm run test:e2e:ui  # Run Playwright with UI
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## Key Features Implementation

### Internationalization
- Arabic is the default locale (`/ar/...`)
- English available at `/en/...`
- Full RTL/LTR support with logical CSS properties
- All UI text externalized in `src/messages/`

### Appointment Flow
1. User fills form (name, phone, service, preferred day/time, notes)
2. Form validates (Egyptian phone format, working days only)
3. Generates WhatsApp message with appointment details
4. User selects WhatsApp number (two clinic numbers available)
5. Opens WhatsApp with pre-filled message
6. Shows confirmation screen with copy message option
7. **Never claims appointment is confirmed** - clearly states it's a request

### SEO Features
- Dynamic metadata per page and locale
- Open Graph and Twitter cards
- JSON-LD structured data (MedicalClinic, MedicalTherapy, BreadcrumbList)
- Sitemap.xml with hreflang alternates
- Robots.txt
- Canonical URLs

### Accessibility
- Semantic HTML5
- Proper heading hierarchy (h1-h6)
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Reduced motion support
- Color contrast compliance
- Screen reader compatible

### Performance
- Server Components by default
- Client Components only when needed
- Optimized images with next/image
- Font optimization with next/font
- Minimal client-side JavaScript
- Code splitting

## Content Management

All clinic content is centralized in `src/content/`:
- `clinic.ts` - Address, phone, WhatsApp numbers, social links, working hours
- `services.ts` - All 8 services with descriptions
- `doctor.ts` - Doctor name, title, bio, approach

To update content, modify these files - no component changes needed.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables from `.env.example`
4. Deploy

### Manual Build

```bash
npm run build
npm run start
```

## Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Accessibility Tests
```bash
npm run test:e2e -- --project=chromium src/tests/accessibility
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 15+)
- Chrome for Android (latest)

## License

Private - Mivida Clinic proprietary code.

## Contact

For technical questions, contact the development team.
For clinic inquiries, use the contact information on the website.