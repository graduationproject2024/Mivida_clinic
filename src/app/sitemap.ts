import { MetadataRoute } from 'next';
import { services } from '../content/services';
import { getSiteUrl } from '@/lib/seo';

const locales = ['ar', 'en'] as const;

const staticRoutes = [
  '',
  '/services',
  '/about',
  '/before-after',
  '/appointment',
  '/contact',
];

const serviceRoutes = services.map(s => `/services/${s.id}`);

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const urls: MetadataRoute.Sitemap = [];
  
  for (const locale of locales) {
    for (const route of staticRoutes) {
      urls.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            ar: `${baseUrl}/ar${route}`,
            en: `${baseUrl}/en${route}`,
            'x-default': `${baseUrl}/ar${route}`,
          },
        },
      });
    }
    
    for (const route of serviceRoutes) {
      urls.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            ar: `${baseUrl}/ar${route}`,
            en: `${baseUrl}/en${route}`,
            'x-default': `${baseUrl}/ar${route}`,
          },
        },
      });
    }
  }
  
  return urls;
}