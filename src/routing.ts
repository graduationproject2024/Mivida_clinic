import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  defaultLocale: 'ar',
  locales: ['ar', 'en'],
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/services': '/services',
    '/services/filler': '/services/filler',
    '/services/botox': '/services/botox',
    '/services/plasma': '/services/plasma',
    '/services/skin-hair': '/services/skin-hair',
    '/services/laser': '/services/laser',
    '/services/glow-injection': '/services/glow-injection',
    '/services/mesotherapy': '/services/mesotherapy',
    '/services/stem-cells': '/services/stem-cells',
    '/about': '/about',
    '/before-after': '/before-after',
    '/appointment': '/appointment',
    '/contact': '/contact',
    '/404': '/404',
  },
});

export type Locale = (typeof routing.locales)[number];
export const defaultLocale = routing.defaultLocale;
export const locales = routing.locales;
export const localePrefix = routing.localePrefix;