'use client';

import { MapPin, Phone, MessageSquare, Clock, ChevronRight, Facebook, Instagram } from 'lucide-react';
import { clinic } from '../../content/clinic';
import { formatRange } from '@/lib/time';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { normalizeEgyptianWhatsAppNumber, getWhatsAppUrl } from '@/lib/whatsapp';

interface ContactContentProps {
  locale: 'ar' | 'en';
}

export function ContactContent({ locale }: ContactContentProps) {
  const t = useTranslations('contact');
  const isRtl = locale === 'ar';
  
  const whatsappNumbers = clinic.whatsappNumbers.map(num => ({
    normalized: normalizeEgyptianWhatsAppNumber(num),
    display: num.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3'),
  }));
  
  const handleWhatsApp = (number: string) => {
    const message = locale === 'ar'
      ? 'مرحباً عيادة Mivida، أرغب في الاستفسار عن خدماتكم.'
      : 'Hello Mivida Clinic, I would like to inquire about your services.';
    const url = getWhatsAppUrl(number, message);
    window.open(url, '_blank');
  };
  
  const formatHours = (day: typeof clinic.workingHours[0]) => {
    if (day.isClosed) return locale === 'ar' ? 'مغلق' : 'Closed';
    return formatRange(day.open, day.close, locale);
  };
  
  const getDayName = (day: typeof clinic.workingHours[0]) => {
    return locale === 'ar' ? day.ar : day.day;
  };
  
  return (
    <article className="min-h-screen">
      <nav className="container-custom py-4" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-text/75" role="list">
          <li>
            <a href={`/${locale}`} className="hover:text-primary transition-colors">
              {locale === 'ar' ? 'الرئيسية' : 'Home'}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <ChevronRight className={cn('w-4 h-4', isRtl && '-rotate-180')} aria-hidden="true" />
            <span aria-current="page">{t('title')}</span>
          </li>
        </ol>
      </nav>
      
      <section className="section bg-white" aria-labelledby="contact-heading">
        <div className="container-custom">
          <header className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
            <h1 id="contact-heading" className="heading-md md:heading-lg mb-4 font-bold tracking-tight">
              {t('title')}
            </h1>
            <p className="body-lg text-text/70">
              {t('subtitle')}
            </p>
          </header>
          
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <a
                  href={`tel:${clinic.phone}`}
                  className="card p-6 flex items-center gap-4 hover:shadow-lg transition-shadow group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 group-hover:scale-105 transition-transform">
                    <Phone className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="caption !text-text/75">{t('phone')}</p>
                    <p className="font-semibold text-text">{clinic.phone}</p>
                  </div>
                </a>
                
                <button
                  type="button"
                  onClick={() => handleWhatsApp(whatsappNumbers[0].normalized)}
                  className="card p-6 flex items-center gap-4 hover:shadow-lg transition-shadow group cursor-pointer"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="caption !text-text/75">{t('whatsapp')}</p>
                    <p className="font-semibold text-text">{whatsappNumbers[0].display}</p>
                  </div>
                </button>
              </div>
              
              <div className="card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    <MapPin className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="caption !text-text/75 mb-1">{t('address')}</p>
                    <address className="not-italic body text-text/80">
                      {locale === 'ar' ? clinic.location.address.ar : clinic.location.address.en}
                    </address>
                  </div>
                </div>
                <a
                  href="#clinic-map"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 w-full sm:w-auto"
                >
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                  {t('mapJumpLabel')}
                </a>
              </div>
            </div>
            
            <div className="bg-cream rounded-2xl p-6 lg:p-8">
              <h2 className="heading-sm text-text mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
                {t('workingHours')}
              </h2>
              
              <div className="space-y-3 mb-6" role="list" aria-label={t('workingHours')}>
                {clinic.workingHours.map((day) => (
                  <div
                    key={day.day}
                    className={cn(
                      'flex items-center justify-between p-4 rounded-lg',
                      day.isClosed ? 'bg-text/5' : 'bg-white'
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
              
              <div className="pt-6 border-t border-border">
                <h3 className="font-medium text-text mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" aria-hidden="true" />
                  {t('followUs')}
                </h3>
                <ul className="flex list-none gap-4" aria-label={t('followUs')}>
                  <li>
                    <a
                      href={clinic.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-white text-text/60 hover:text-primary hover:border-primary transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" aria-hidden="true" />
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
                      <Instagram className="w-5 h-5" aria-hidden="true" />
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
            </div>
          </div>
        </div>
      </section>
      
      <section id="clinic-map" className="section bg-white" aria-labelledby="map-heading">
        <div className="container-custom">
          <h2 id="map-heading" className="sr-only">
            {locale === 'ar' ? 'موقع العيادة على الخريطة' : 'Clinic Location on Map'}
          </h2>
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center">
            <div className="text-center px-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white mb-5">
                <MapPin className="w-8 h-8" aria-hidden="true" />
              </div>
              <p className="heading-sm text-text mb-3">
                {locale === 'ar' ? 'تجدنا في قلب طنطا' : 'Find us in the heart of Tanta'}
              </p>
              <address className="not-italic body text-text/70 max-w-md mx-auto mb-6">
                {locale === 'ar' ? clinic.location.address.ar : clinic.location.address.en}
              </address>
              <a
                href={clinic.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <MapPin className="w-5 h-5" aria-hidden="true" />
                {t('mapLink')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}