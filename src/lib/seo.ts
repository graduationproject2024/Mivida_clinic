import { Metadata } from 'next';
import { clinic, services } from '@/content';
import { getTranslations } from 'next-intl/server';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  locale?: 'ar' | 'en';
  type?: 'website' | 'article';
  images?: string[];
  noIndex?: boolean;
}

export async function generateSEO({
  title,
  description,
  path = '',
  locale = 'ar',
  type = 'website',
  images = [],
  noIndex = false,
}: SEOProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo' });
  const baseUrl = 'https://mivida-clinic.com';
  const fullPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = `${baseUrl}/${locale}${fullPath}`;
  
  const defaultTitle = locale === 'ar' 
    ? 'عيادة Mivida | جلدية وتجميل في طنطا'
    : 'Mivida Clinic | Dermatology & Aesthetics in Tanta';
  
  const defaultDescription = locale === 'ar'
    ? 'علاجات جلدية وتجميلية احترافية في عيادة Mivida، طنطا. فيلر، بوتوكس، ليزر، بلازما، والمزيد.'
    : 'Professional dermatology and aesthetic treatments at Mivida Clinic, Tanta. Filler, Botox, Laser, PRP, and more.';
  
  const pageTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const pageDescription = description || defaultDescription;
  
  const ogImages = images.length > 0 
    ? images.map(img => ({ url: img.startsWith('http') ? img : `${baseUrl}${img}` }))
    : [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630, alt: defaultTitle }];
  
  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ar: `${baseUrl}/ar${fullPath}`,
        en: `${baseUrl}/en${fullPath}`,
      },
    },
    openGraph: {
      type,
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      url: canonicalUrl,
      siteName: 'Mivida Clinic',
      title: pageTitle,
      description: pageDescription,
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: ogImages.map(img => img.url),
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'geo.region': 'EG',
      'geo.placename': 'Tanta',
      'geo.position': '30.7865;31.0004',
    },
  };
}

export function generateServiceSchema(serviceId: string, locale: 'ar' | 'en') {
  const service = services.find(s => s.id === serviceId);
  if (!service) return null;
  
  const name = locale === 'ar' ? service.name.ar : service.name.en;
  const description = locale === 'ar' ? service.description.ar : service.description.en;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name,
    description,
    provider: {
      '@type': 'MedicalClinic',
      name: locale === 'ar' ? clinic.name.ar : clinic.name.en,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Tanta',
        addressCountry: 'EG',
        streetAddress: locale === 'ar' ? clinic.location.address.ar : clinic.location.address.en,
      },
      telephone: clinic.phone,
      url: 'https://mivida-clinic.com',
    },
  };
}

export function generateClinicSchema(locale: 'ar' | 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: locale === 'ar' ? clinic.name.ar : clinic.name.en,
    description: locale === 'ar' 
      ? 'عيادة متخصصة في الجلدية والتجميل والليزر في طنطا'
      : 'Specialized dermatology, aesthetics and laser clinic in Tanta',
    url: 'https://mivida-clinic.com',
    telephone: clinic.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: locale === 'ar' ? clinic.location.address.ar : clinic.location.address.en,
      addressLocality: 'Tanta',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '30.7865',
      longitude: '31.0004',
    },
    openingHoursSpecification: clinic.workingHours
      .filter((h) => !h.isClosed)
      .map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.day,
        opens: h.open,
        closes: h.close,
      })),
    sameAs: [
      clinic.social.facebook,
      clinic.social.instagram,
      clinic.social.tiktok,
    ],
    medicalSpecialty: 'Dermatology',
    availableService: services.map((s) => ({
      '@type': 'MedicalTherapy',
      name: locale === 'ar' ? s.name.ar : s.name.en,
    })),
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}