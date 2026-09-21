'use client';

import { MapPin, Clock, Phone } from 'lucide-react';
import Link from 'next/link';
import { clinic } from '../../content/clinic';
import { formatRange } from '@/lib/time';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

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
            <header className="mb-8">
              <span className="overline">{t('address')}</span>
              <h2 id="location-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-3 mb-4">
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
                  <a href={`tel:${clinic.phone}`} className="body text-primary hover:text-primary-dark transition-colors">
                    {clinic.phone}
                  </a>
                </div>
              </div>
              
              <a
                href={clinic.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <MapPin className="w-5 h-5" aria-hidden="true" />
                {t('mapLink')}
              </a>
            </address>
            
            <ul className="flex list-none flex-wrap gap-4" aria-label={locale === 'ar' ? 'وسائل التواصل' : 'Social media'}>
              <li>
                <a
                  href={clinic.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-white text-text/60 hover:text-primary hover:border-primary transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </li>
              <li>
                <a
                  href={clinic.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-white text-text/60 hover:text-primary hover:border-primary transition-colors"
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
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-white text-text/60 hover:text-primary hover:border-primary transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.545,2.448c0.219,0,0.438,0,0.657,0.001c2.574,0.007,4.652,2.104,4.658,4.677v4.294v4.669c0,2.574-2.101,4.671-4.677,4.678c-2.551,0.003-4.622-2.082-4.65-4.651v-4.721v-4.222C7.897,4.56,10,2.452,12.545,2.448 M18.857,10.952c-0.148,1.596-0.93,3.117-2.179,4.229c1.149-0.073,2.236-0.448,3.161-1.087c-0.966-0.982-1.635-2.252-2.026-3.678C19.314,10.115,19.106,10.522,18.857,10.952z M15.257,16.638c1.228,0.359,2.152,1.153,2.42,2.143c-1.732,0.432-3.479,0.497-4.85,0.038c0.286-0.612,0.593-1.251,0.778-1.906C13.612,16.53,14.408,16.417,15.257,16.638z M5.935,6.849c0.886,0,1.765-0.246,2.552-0.693C9.042,5.701,8.526,4.841,7.631,4.289C6.621,3.674,5.422,3.417,4.207,3.56c1.069,1.148,1.728,2.535,1.728,4.012C5.944,7.601,5.941,7.228,5.935,6.849z"/></svg>
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
                      'w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium',
                      day.isClosed
                        ? 'bg-text/10 text-text/75'
                        : 'bg-primary/10 text-primary'
                    )}>
                      {getDayName(day).slice(0, 3)}
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