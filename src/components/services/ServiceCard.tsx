'use client';

import Link from 'next/link';
import { ChevronRight, Sparkles, Sparkle, Droplets, HeartPulse, Zap, Star, Droplet, CircleDot } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  service: {
    id: string;
    name: { ar: string; en: string };
    shortDescription: { ar: string; en: string };
    icon: string;
  };
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

export function ServiceCard({ service, locale }: ServiceCardProps) {
  const Icon = serviceIcons[service.id as keyof typeof serviceIcons] || Sparkles;
  const tc = useTranslations('common');
  const isRtl = locale === 'ar';
  
  return (
    <article className="card-hover group overflow-hidden">
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
        
        <div className="p-6 flex flex-col">
          <h2 className="heading-sm text-text mb-2">
            {locale === 'ar' ? service.name.ar : service.name.en}
          </h2>
          <p className="body-sm text-text/70 flex-1 mb-4">
            {locale === 'ar' ? service.shortDescription.ar : service.shortDescription.en}
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-200">
            {locale === 'ar' ? tc('learnMoreAr') : tc('learnMore')}
            <ChevronRight className={cn('w-4 h-4 flex-shrink-0', isRtl && '-rotate-180')} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}