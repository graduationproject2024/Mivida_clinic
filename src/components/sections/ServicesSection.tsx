'use client';

import Link from 'next/link';
import { ChevronRight, Sparkles, Sparkle, Droplets, HeartPulse, Zap, Star, Droplet, CircleDot } from 'lucide-react';
import { services } from '../../content/services';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface ServicesSectionProps {
  locale: 'ar' | 'en';
}

const serviceIcons = {
  filler: Sparkles,
  botox: Sparkle,
  plasma: Droplets,
  'skin-hair': HeartPulse,
  laser: Zap,
  'glow-injection': Star,
  mesotherapy: Droplet,
  'stem-cells': CircleDot,
};

export function ServicesSection({ locale }: ServicesSectionProps) {
  const t = useTranslations('services');
  const tc = useTranslations('common');
  const isRtl = locale === 'ar';
  
  return (
    <section className="section bg-white" aria-labelledby="services-heading">
      <div className="container-custom">
        <header className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="overline">{t('subtitle')}</span>
          <h2 id="services-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-3 mb-4">
            {t('title')}
          </h2>
        </header>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = serviceIcons[service.id as keyof typeof serviceIcons] || Sparkles;
            return (
              <article
                key={service.id}
                className="card-hover group overflow-hidden"
              >
                <Link
                  href={`/${locale}/services/${service.id}`}
                  className="block h-full"
                  aria-label={`${locale === 'ar' ? 'اعرف المزيد عن' : 'Learn more about'} ${locale === 'ar' ? service.name.ar : service.name.en}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <Icon className="w-16 h-16 text-primary/60 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                  </div>
                  
                  <div className="p-6 flex flex-col h-[calc(100%-200px)]">
                    <h3 className="heading-sm text-text mb-2">
                      {locale === 'ar' ? service.name.ar : service.name.en}
                    </h3>
                    <p className="body-sm text-text/70 flex-1 mb-4">
                      {locale === 'ar' ? service.shortDescription.ar : service.shortDescription.en}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-200">
                      {tc('learnMore')}
                      <ChevronRight className={cn('w-4 h-4 flex-shrink-0', isRtl && '-rotate-180')} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
        
        <div className="text-center mt-10">
          <Link
            href={`/${locale}/services`}
            className="btn-outline"
          >
            {t('viewAll')}
            <ChevronRight className={cn('w-4 h-4', isRtl && '-rotate-180')} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}