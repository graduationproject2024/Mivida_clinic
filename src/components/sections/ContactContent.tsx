'use client';

import { MapPin, Phone, MessageSquare, Clock, ChevronRight, Facebook, Instagram, Calendar, ArrowRight } from 'lucide-react';
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
      {/* Hero - editorial style matching homepage */}
      <header className="relative bg-neutral-warm pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-center bg-cover opacity-[0.03]" aria-hidden="true" />
        <div className="absolute top-0 end-0 w-1/3 h-full bg-cream hidden lg:block" aria-hidden="true" />
        
        <div className="container-custom relative z-10">
          <nav className="mb-10" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-text/60" role="list">
              <li>
                <a href={`/${locale}`} className="hover:text-primary transition-colors">
                  {locale === 'ar' ? 'الرئيسية' : 'Home'}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className={cn('w-4 h-4', isRtl && '-rotate-180')} aria-hidden="true" />
                <span className="text-primary font-medium" aria-current="page">{t('title')}</span>
              </li>
            </ol>
          </nav>
          
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-4">
              <div className="w-12 h-px bg-gold" aria-hidden="true" />
              <span className="text-overline text-primary font-medium tracking-widest uppercase">
                {locale === 'ar' ? 'نحن هنا لمساعدتك' : "We're Here to Help"}
              </span>
            </div>
            <h1 id="contact-heading" className="text-display sm:text-display max-w-2xl text-balance font-bold text-primary-deep mb-6">
              {t('title')}
            </h1>
            <p className="text-body-lg text-text/80 max-w-lg">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </header>
      
      {/* Contact Info - 2-column editorial layout */}
      <section className="section bg-white" aria-labelledby="contact-heading">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* Left: Contact cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Phone */}
              <a
                href={`tel:+2${clinic.phone}`}
                className="group flex items-center gap-4 p-6 rounded-2xl bg-cream/50 border border-border hover:border-primary/20 hover:shadow-sm transition-all"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Phone className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-caption text-text-muted">{t('phone')}</p>
                  <p className="text-h4 font-bold text-text" dir="ltr">{clinic.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}</p>
                </div>
              </a>
              
              {/* WhatsApp */}
              <a
                href={getWhatsAppUrl(
                  whatsappNumbers[0].normalized,
                  locale === 'ar'
                    ? 'مرحباً عيادة Mivida، أرغب في الاستفسار عن خدماتكم.'
                    : 'Hello Mivida Clinic, I would like to inquire about your services.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-6 rounded-2xl bg-cream/50 border border-border hover:border-primary/20 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-600 text-white group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-caption text-text-muted">{t('whatsapp')}</p>
                  <p className="text-h4 font-bold text-text" dir="ltr">{whatsappNumbers[0].display}</p>
                </div>
              </a>
              
              {/* Address */}
              <div className="p-6 rounded-2xl bg-cream/50 border border-border">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    <MapPin className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-caption text-text-muted mb-1">{t('address')}</p>
                    <address className="not-italic text-body text-text/80 leading-relaxed">
                      {locale === 'ar' ? clinic.location.address.ar : clinic.location.address.en}
                    </address>
                  </div>
                </div>
                <a
                  href="#clinic-map"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-deep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 w-full sm:w-auto justify-center sm:justify-start active:scale-[0.98]"
                >
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                  {t('mapJumpLabel')}
                </a>
              </div>
              
              {/* Social */}
              <div className="pt-6 border-t border-border">
                <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" aria-hidden="true" />
                  {t('followUs')}
                </h3>
                <ul className="flex list-none gap-3" aria-label={t('followUs')}>
                  <li>
                    <a
                      href={clinic.social.facebookClinic}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-white text-text-muted hover:text-primary hover:border-primary/20 hover:shadow-sm transition-all group relative"
                      aria-label="Clinic Facebook"
                      title="Mivida Clinic Facebook"
                    >
                      <Facebook className="w-5 h-5" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={clinic.social.facebookDoctor}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-white text-text-muted hover:text-primary hover:border-primary/20 hover:shadow-sm transition-all group relative"
                      aria-label="Doctor Facebook"
                      title="Dr. Norhan Yousry Facebook"
                    >
                      <Facebook className="w-5 h-5" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={clinic.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-white text-text-muted hover:text-primary hover:border-primary/20 hover:shadow-sm transition-all"
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
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-white text-text-muted hover:text-primary hover:border-primary/20 hover:shadow-sm transition-all"
                      aria-label="TikTok"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.22-1.15 4.39-2.92 5.75-1.78 1.36-4.14 1.88-6.31 1.38-2.4-.55-4.43-2.33-5.33-4.59-.9-2.27-.67-4.95.6-6.99 1.25-2.02 3.51-3.32 5.86-3.48v4.06c-1.33.09-2.61.85-3.35 1.95-.73 1.11-.84 2.58-.29 3.79.55 1.2 1.79 2.05 3.12 2.19 1.35.15 2.76-.36 3.61-1.39.86-1.04 1.2-2.46 1.18-3.81V.02h-.03z" /></svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right: Working Hours */}
            <div className="lg:col-start-7 lg:col-span-6">
              <div className="bg-cream rounded-2xl p-6 lg:p-8 border border-border">
                <div className="mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h2 className="text-h3 font-bold text-primary-deep">
                    {t('workingHours')}
                  </h2>
                </div>
                
                <div className="space-y-3 mb-6" role="list" aria-label={t('workingHours')}>
                  {clinic.workingHours.map((day) => (
                    <div
                      key={day.day}
                      className={cn(
                        'flex items-center justify-between p-4 rounded-xl transition-colors',
                        day.isClosed ? 'bg-text/5' : 'bg-white border border-border hover:border-primary/20'
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
                        'font-semibold',
                        day.isClosed ? 'text-text/50' : 'text-primary'
                      )}>
                        {formatHours(day)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section id="clinic-map" className="section bg-cream" aria-labelledby="map-heading">
        <div className="container-custom">
          <div className="text-center mb-10">
            <div className="mb-6 flex items-center justify-center gap-4">
              <div className="w-8 h-px bg-gold" aria-hidden="true" />
              <span className="text-overline text-primary font-medium tracking-widest uppercase">
                {locale === 'ar' ? 'موقعنا' : 'Our Location'}
              </span>
              <div className="w-8 h-px bg-gold" aria-hidden="true" />
            </div>
            <h2 id="map-heading" className="text-h2 font-bold text-primary-deep">
              {locale === 'ar' ? 'موقع العيادة على الخريطة' : 'Clinic Location on Map'}
            </h2>
          </div>
          
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-border shadow-sm">
            <iframe
              title={locale === 'ar' ? 'خريطة موقع عيادة ميفيدا' : 'Mivida Clinic Location Map'}
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13735.617462319293!2d31.0004!3d30.7865!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7c9e0d1d2b8b9%3A0x6d8b9d3b6f00713!2z2LnZitin2K_YqSBNaXZpZGE!5e0!3m2!1sar!2seg!4v1700000000000!5m2!1sar!2seg"
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', inset: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-black/10"></div>
          </div>
          
          <div className="mt-8 text-center">
            <a
              href={clinic.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-white font-semibold hover:bg-primary-deep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <MapPin className="w-5 h-5" aria-hidden="true" />
              {t('mapLink')}
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
