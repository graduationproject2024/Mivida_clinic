'use client';

import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface AppointmentCTAProps {
  locale: 'ar' | 'en';
}

export function AppointmentCTA({ locale }: AppointmentCTAProps) {
  const t = useTranslations('appointment');
  const tc = useTranslations('common');
  const isRtl = locale === 'ar';
  
  return (
    <section className="section bg-primary" aria-labelledby="appointment-cta-heading">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 id="appointment-cta-heading" className="heading-md md:heading-lg !text-white mb-4 font-bold tracking-tight">
            {t('title')}
          </h2>
          <p className="body-lg !text-white/90 mb-8">
            {t('subtitle')}
          </p>
          <Link
            href={`/${locale}/appointment`}
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            {locale === 'ar' ? tc('bookAppointmentAr') : tc('bookAppointment')}
            <ArrowRight className={cn('w-5 h-5', isRtl && '-rotate-180')} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
