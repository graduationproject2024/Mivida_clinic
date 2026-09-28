'use client';

import Link from 'next/link';
import { Facebook, Instagram, MapPin, Phone, Clock, Mail, ChevronRight, Linkedin } from 'lucide-react';
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
      <div className="container-custom pt-16 pb-28 md:py-16 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <Link href={`/${locale}`} className="inline-flex items-center gap-3" aria-label={locale === 'ar' ? 'عيادة Mivida - الرئيسية' : 'Mivida Clinic - Home'}>
              <Logo className="h-11 w-11" />
              <span className="text-2xl font-bold text-white">Mivida Clinic</span>
            </Link>
            <p className="text-white/70 text-base leading-relaxed max-w-xs">
              {locale === 'ar' 
                ? 'رعاية متخصصة في الجلدية والتجميل والليزر في طنطا. نقدم أحدث العلاجات بأعلى معايير الجودة والسلامة.'
                : 'Specialized dermatology, aesthetics and laser care in Tanta. Offering the latest treatments with highest quality and safety standards.'
              }
            </p>
            <div className="flex items-center gap-6 pt-4">
              <a
                href={clinic.social.facebookClinic}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                aria-label="Clinic Facebook"
              >
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Mivida Clinic</span>
              </a>
              <a
                href={clinic.social.facebookDoctor}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                aria-label="Doctor Facebook"
              >
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Dr. Norhan</span>
              </a>
              <a
                href={clinic.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={clinic.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.22-1.15 4.39-2.92 5.75-1.78 1.36-4.14 1.88-6.31 1.38-2.4-.55-4.43-2.33-5.33-4.59-.9-2.27-.67-4.95.6-6.99 1.25-2.02 3.51-3.32 5.86-3.48v4.06c-1.33.09-2.61.85-3.35 1.95-.73 1.11-.84 2.58-.29 3.79.55 1.2 1.79 2.05 3.12 2.19 1.35.15 2.76-.36 3.61-1.39.86-1.04 1.2-2.46 1.18-3.81V.02h-.03z" /></svg>
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
                    className="text-white/70 hover:text-white transition-colors text-sm"
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
                <Link href={`/${locale}/about`} className="text-white/70 hover:text-white transition-colors text-sm">
                  {locale === 'ar' ? 'عن الدكتورة' : 'About Doctor'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/before-after`} className="text-white/70 hover:text-white transition-colors text-sm">
                  {locale === 'ar' ? 'قبل وبعد' : 'Before & After'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/appointment`} className="text-white/70 hover:text-white transition-colors text-sm">
                  {locale === 'ar' ? 'احجز موعدك' : 'Book Appointment'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-white/70 hover:text-white transition-colors text-sm">
                  {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="space-y-4" aria-labelledby="footer-contact">
            <h2 id="footer-contact" className="font-semibold text-white">
              {locale === 'ar' ? 'معلومات التواصل' : 'Contact Info'}
            </h2>
            <address className="space-y-3 not-italic text-white/70 text-sm leading-relaxed">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-gold" aria-hidden="true" />
                <div>
                  <p className="font-medium text-white">{locale === 'ar' ? 'العنوان' : 'Address'}</p>
                  <p>{locale === 'ar' ? clinic.location.address.ar : clinic.location.address.en}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-gold" aria-hidden="true" />
                <a href={`tel:${clinic.phone}`} className="hover:text-white transition-colors" dir="ltr">
                  {clinic.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 flex-shrink-0 text-gold" aria-hidden="true" />
                <div>
                  <p className="font-medium text-white">{locale === 'ar' ? 'ساعات العمل' : 'Working Hours'}</p>
                  <p className="text-white/60">
                    {getHoursSummary()}
                  </p>
                </div>
              </div>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Mivida Clinic. {locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <span className="text-white/60 text-sm text-center">
            {locale === 'ar' ? 'Mivida Clinic · طنطا' : 'Mivida Clinic · Tanta'}
          </span>
        </div>
        
        {/* Developer Marketing Section */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 text-center md:text-start">
          <div className="text-white/50 text-xs sm:text-sm max-w-lg">
            {locale === 'ar' 
              ? 'تم تصميم وبرمجة هذا الموقع بواسطة مهندس أحمد أسامه.'
              : 'Designed & Developed by Eng. Ahmed Osama.'}
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/201155538056"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-green-500 transition-colors"
              aria-label="WhatsApp"
              title={locale === 'ar' ? 'تواصل معي عبر واتساب' : 'Contact me on WhatsApp'}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/ahmed.osama.480181"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-[#1877F2] transition-colors"
              aria-label="Facebook"
              title={locale === 'ar' ? 'تواصل معي عبر فيسبوك' : 'Contact me on Facebook'}
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/ahmed-osama-380889139"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-[#0A66C2] transition-colors"
              aria-label="LinkedIn"
              title={locale === 'ar' ? 'حسابي على لينكد إن' : 'My LinkedIn Profile'}
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
