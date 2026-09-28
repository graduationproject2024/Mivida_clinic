'use client';

import { MapPin, Clock, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';
import { clinic } from '../../content/clinic';
import { formatRange } from '@/lib/time';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { ButtonLink } from '@/components/ui/Button';

interface LocationSectionProps {
  locale: 'ar' | 'en';
}

export function LocationSection({ locale }: LocationSectionProps) {
  const t = useTranslations('contact');

  const formatHours = (day: typeof clinic.workingHours[0]) => {
    if (day.isClosed) return locale === 'ar' ? 'مغلق' : 'Closed';
    return formatRange(day.open, day.close, locale);
  };
  
  const getDayName = (day: typeof clinic.workingHours[0]) => {
    return locale === 'ar' ? day.ar : day.day;
  };
  
  return (
    <section className="section bg-cream" aria-labelledby="location-heading">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <header className="mb-8 lg:mb-12">
              <span className="text-overline text-primary font-medium tracking-widest uppercase mb-2 block">{t('address')}</span>
              <h2 id="location-heading" className="text-h2 font-bold text-primary-deep tracking-tight">
                {locale === 'ar' ? 'موقع العيادة' : 'Clinic Location'}
              </h2>
            </header>
            
            <address className="space-y-6 not-italic mb-10">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white flex-shrink-0">
                  <MapPin className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="heading-sm text-text mb-1">
                    {locale === 'ar' ? 'العنوان' : 'Address'}
                  </h3>
                  <p className="body text-text/80">
                    {locale === 'ar' ? clinic.location.address.ar : clinic.location.address.en}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white flex-shrink-0">
                  <Phone className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="heading-sm text-text mb-1">
                    {t('phone')}
                  </h3>
                  <a href={`tel:+2${clinic.phone}`} className="body text-primary hover:text-primary-dark transition-colors" dir="ltr">
                    {clinic.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}
                  </a>
                </div>
              </div>
              
              <div className="pt-4">
                <ButtonLink
                  href={clinic.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="md"
                >
                  <MapPin className="w-4 h-4 mr-2" aria-hidden="true" />
                  {t('mapLink')}
                </ButtonLink>
              </div>
            </address>
            
            <ul className="flex list-none flex-wrap gap-4" aria-label={locale === 'ar' ? 'وسائل التواصل' : 'Social media'}>
              <li>
                <a
                  href={clinic.social.facebookClinic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-white text-text-muted hover:text-primary hover:border-primary transition-colors"
                  aria-label="Clinic Facebook"
                  title="Mivida Clinic Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </li>
              <li>
                <a
                  href={clinic.social.facebookDoctor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-white text-text-muted hover:text-primary hover:border-primary transition-colors"
                  aria-label="Doctor Facebook"
                  title="Dr. Norhan Yousry Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </li>
              <li>
                <a
                  href={clinic.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-white text-text-muted hover:text-primary hover:border-primary transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </li>
              <li>
                <a
                  href={clinic.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-white text-text-muted hover:text-primary hover:border-primary transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.22-1.15 4.39-2.92 5.75-1.78 1.36-4.14 1.88-6.31 1.38-2.4-.55-4.43-2.33-5.33-4.59-.9-2.27-.67-4.95.6-6.99 1.25-2.02 3.51-3.32 5.86-3.48v4.06c-1.33.09-2.61.85-3.35 1.95-.73 1.11-.84 2.58-.29 3.79.55 1.2 1.79 2.05 3.12 2.19 1.35.15 2.76-.36 3.61-1.39.86-1.04 1.2-2.46 1.18-3.81V.02h-.03z" /></svg>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl border border-border p-6 lg:p-8">
            <h3 className="heading-sm text-text mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
              {t('workingHours')}
            </h3>
            
            <div className="space-y-4" role="list" aria-label={t('workingHours')}>
              {clinic.workingHours.map((day) => (
                <div
                  key={day.day}
                  className={cn(
                    'flex items-center justify-between p-4 rounded-lg',
                    day.isClosed ? 'bg-text/5' : 'bg-primary/5'
                  )}
                  role="listitem"
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      'w-8 h-8 flex items-center justify-center rounded-lg',
                      day.isClosed
                        ? 'bg-text/10 text-text/75'
                        : 'bg-primary/10 text-primary'
                    )}>
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className="font-medium text-text">
                      {getDayName(day)}
                    </span>
                  </div>
                  <span className={cn(
                    'font-medium',
                    day.isClosed ? 'text-text/75' : 'text-primary'
                  )}>
                    {formatHours(day)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <p className="body-sm text-text/75 text-center">
                {locale === 'ar'
                  ? 'العطلات الرسمية قد تختلف. يرجى التأكيد عبر الهاتف أو واتساب.'
                  : 'Public holidays may vary. Please confirm via phone or WhatsApp.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
