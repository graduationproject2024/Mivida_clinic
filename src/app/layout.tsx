import type { Metadata, Viewport } from 'next';
import { Manrope, Alexandria } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../styles/globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const alexandria = Alexandria({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-alexandria',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8F3EA' },
    { media: '(prefers-color-scheme: dark)', color: '#5A0B1A' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://mivida-clinic.com'),
  title: {
    default: 'Mivida Clinic | Dermatology & Aesthetics in Tanta',
    template: '%s | Mivida Clinic',
  },
  description: 'Professional dermatology and aesthetic treatments at Mivida Clinic, Tanta. Filler, Botox, Laser, PRP, and more.',
  keywords: [
    'dermatology',
    'aesthetics',
    'clinic',
    'Tanta',
    'filler',
    'botox',
    'laser',
    'PRP',
    'skin care',
    'hair treatment',
  ],
  authors: [{ name: 'Mivida Clinic' }],
  creator: 'Mivida Clinic',
  publisher: 'Mivida Clinic',
  formatDetection: {
    telephone: true,
    address: true,
  },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    siteName: 'Mivida Clinic',
    title: 'Mivida Clinic | Dermatology & Aesthetics in Tanta',
    description: 'Professional dermatology and aesthetic treatments at Mivida Clinic, Tanta.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mivida Clinic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mivida Clinic | Dermatology & Aesthetics in Tanta',
    description: 'Professional dermatology and aesthetic treatments at Mivida Clinic, Tanta.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let locale = 'en';
  try {
    locale = await getLocale();
  } catch (error) {
    // Fallback if accessed outside of localized route wrapper
  }
  
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`${manrope.variable} ${alexandria.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://share.google" />
      </head>
      <body className="min-h-screen bg-white text-text antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
