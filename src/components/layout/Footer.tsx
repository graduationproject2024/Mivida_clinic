'use client';

import Link from 'next/link';
import { Facebook, Instagram, MapPin, Phone, Clock, Mail, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { clinic, services as clinicServices } from '../../content';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/brand/Logo';
import { formatRange } from '@/lib/time';

interface FooterProps {
  locale: 'ar' | 'en';
  messages: Record<string, unknown>;
}

const services = [
  { href: '/services/filler', key: 'filler' },
  { href: '/services/botox', key: 'botox' },
  { href: '/services/plasma', key: 'plasma' },
  { href: '/services/skin-hair', key: 'skin-hair' },
  { href: '/services/laser', key: 'laser' },
  { href: '/services/glow-injection', key: 'glow-injection' },
  { href: '/services/mesotherapy', key: 'mesotherapy' },
  { href: '/services/stem-cells', key: 'stem-cells' },
];

export function Footer({ locale, messages }: FooterProps) {
  const t = useTranslations('footer');

  const openHours = clinic.workingHours.filter(d => !d.isClosed);

  const getHoursSummary = () => {
    const parts = openHours.map(d => {
      const name = locale === 'ar' ? d.ar : d.day;
      return `${name}: ${formatRange(d.open, d.close, locale)}`;
    });
    return parts.join(' | ');
  };
  
  const getServiceName = (key: string) => {
    const service = clinicServices.find(s => s.id === key);
    if (!service) return key;
    return locale === 'ar' ? service.name.ar : service.name.en;
  };
  
  return (
    <footer className="bg-text text-white" role="contentinfo">
      <div className="container-custom py-16 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <Link href={`/${locale}`} className="inline-flex items-center gap-3" aria-label={locale === 'ar' ? 'عيادة Mivida - الرئيسية' : 'Mivida Clinic - Home'}>
              <Logo className="h-11 w-11" />
              <span className="text-2xl font-bold text-white">Mivida Clinic</span>
            </Link>
            <p className="text-text/70 text-base leading-relaxed max-w-xs">
              {locale === 'ar' 
                ? 'رعاية متخصصة في الجلدية والتجميل والليزر في طنطا. نقدم أحدث العلاجات بأعلى معايير الجودة والسلامة.'
                : 'Specialized dermatology, aesthetics and laser care in Tanta. Offering the latest treatments with highest quality and safety standards.'
              }
            </p>
            <div className="flex items-center gap-6 pt-4">
              <a
                href={clinic.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text/60 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={clinic.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text/60 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={clinic.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text/60 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.545,2.448c0.219,0,0.438,0,0.657,0.001c2.574,0.007,4.652,2.104,4.658,4.677v4.294v4.669c0,2.574-2.101,4.671-4.677,4.678c-2.551,0.003-4.622-2.082-4.65-4.651v-4.721v-4.222C7.897,4.56,10,2.452,12.545,2.448 M18.857,10.952c-0.148,1.596-0.93,3.117-2.179,4.229c1.149-0.073,2.236-0.448,3.161-1.087c-0.966-0.982-1.635-2.252-2.026-3.678C19.314,10.115,19.106,10.522,18.857,10.952z M15.257,16.638c1.228,0.359,2.152,1.153,2.42,2.143c-1.732,0.432-3.479,0.497-4.85,0.038c0.286-0.612,0.593-1.251,0.778-1.906C13.612,16.53,14.408,16.417,15.257,16.638z M5.935,6.849c0.886,0,1.765-0.246,2.552-0.693C9.042,5.701,8.526,4.841,7.631,4.289C6.621,3.674,5.422,3.417,4.207,3.56c1.069,1.148,1.728,2.535,1.728,4.012C5.944,7.601,5.941,7.228,5.935,6.849z"/></svg>
              </a>
            </div>
          </div>
          
          <nav className="space-y-4" aria-labelledby="footer-services">
            <h2 id="footer-services" className="font-semibold text-white">
              {locale === 'ar' ? 'الخدمات' : 'Services'}
            </h2>
            <ul className="space-y-2" role="list">
              {services.slice(0, 4).map((service) => (
                <li key={service.key}>
                  <Link
                    href={`/${locale}${service.href}`}
                    className="text-text/70 hover:text-white transition-colors text-sm"
                  >
                    {locale === 'ar' ? getServiceName(service.key) : getServiceName(service.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <nav className="space-y-4" aria-labelledby="footer-links">
            <h2 id="footer-links" className="font-semibold text-white">
              {locale === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h2>
            <ul className="space-y-2" role="list">
              <li>
                <Link href={`/${locale}/about`} className="text-text/70 hover:text-white transition-colors text-sm">
                  {locale === 'ar' ? 'عن الدكتورة' : 'About Doctor'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/before-after`} className="text-text/70 hover:text-white transition-colors text-sm">
                  {locale === 'ar' ? 'قبل وبعد' : 'Before & After'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/appointment`} className="text-text/70 hover:text-white transition-colors text-sm">
                  {locale === 'ar' ? 'احجز موعدك' : 'Book Appointment'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-text/70 hover:text-white transition-colors text-sm">
                  {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="space-y-4" aria-labelledby="footer-contact">
            <h2 id="footer-contact" className="font-semibold text-white">
              {locale === 'ar' ? 'معلومات التواصل' : 'Contact Info'}
            </h2>
            <address className="space-y-3 not-italic text-text/70 text-sm leading-relaxed">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-gold" aria-hidden="true" />
                <div>
                  <p className="font-medium text-white">{locale === 'ar' ? 'العنوان' : 'Address'}</p>
                  <p>{locale === 'ar' ? clinic.location.address.ar : clinic.location.address.en}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-gold" aria-hidden="true" />
                <a href={`tel:${clinic.phone}`} className="hover:text-white transition-colors">
                  {clinic.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 flex-shrink-0 text-gold" aria-hidden="true" />
                <div>
                  <p className="font-medium text-white">{locale === 'ar' ? 'ساعات العمل' : 'Working Hours'}</p>
                  <p className="text-text/60">
                    {getHoursSummary()}
                  </p>
                </div>
              </div>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text/60 text-sm">
            © {new Date().getFullYear()} Mivida Clinic. {locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <span className="text-text/60 text-sm text-center">
            {locale === 'ar' ? 'Mivida Clinic · طنطا' : 'Mivida Clinic · Tanta'}
          </span>
        </div>
      </div>
    </footer>
  );
}