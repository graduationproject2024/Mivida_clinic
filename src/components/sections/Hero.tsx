import Image from 'next/image';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { clinic, services } from '../../content';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface HeroProps {
  locale: 'ar' | 'en';
}

export function Hero({ locale }: HeroProps) {
  const t = useTranslations('hero');
  const isRtl = locale === 'ar';
  
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-cream/50 via-white to-white" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-center bg-cover opacity-5" aria-hidden="true" />
      
      <div className="container-custom relative z-10 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-border backdrop-blur-sm mb-6 animate-fade-in">
            <span className="overline">{locale === 'ar' ? 'عيادة متخصصة في الجلدية والتجميل' : 'Specialized Dermatology & Aesthetics Clinic'}</span>
          </div>
          
          <h1
            id="hero-heading"
            className="display-sm md:display-md lg:display-lg xl:display-xl text-balance mb-6 animate-slide-up"
          >
            {t('headline')}
          </h1>
          
          <p className="body-lg sm:body text-text/70 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
            {t('subtext')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Link
              href={`/${locale}/appointment`}
              className="btn-primary btn-lg w-full sm:w-auto"
            >
              {t('primaryCta')}
              <ArrowRight className={cn('w-4 h-4 flex-shrink-0', isRtl && '-rotate-180')} aria-hidden="true" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="btn-secondary btn-lg w-full sm:w-auto"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              {t('secondaryCta')}
            </Link>
          </div>
          
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-text/60 animate-fade-in" style={{ animationDelay: '300ms' }} role="list" aria-label={locale === 'ar' ? 'ميزات العيادة' : 'Clinic features'}>
            <div className="flex items-center gap-2" role="listitem">
              <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
              <span>{locale === 'ar' ? 'إشراف طبي متخصص' : 'Specialist Medical Supervision'}</span>
            </div>
            <div className="flex items-center gap-2" role="listitem">
              <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
              <span>{locale === 'ar' ? 'أحدث التقنيات' : 'Latest Technologies'}</span>
            </div>
            <div className="flex items-center gap-2" role="listitem">
              <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
              <span>{locale === 'ar' ? 'رعاية شخصية' : 'Personalized Care'}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <ChevronDown className="w-6 h-6 text-text/30" />
      </div>
    </section>
  );
}

function MessageSquare({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}