import { ArrowRight, MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { ButtonLink } from '@/components/ui/Button';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { clinic } from '@/content/clinic';

interface HeroProps {
  locale: 'ar' | 'en';
}

export function Hero({ locale }: HeroProps) {
  const t = useTranslations('hero');
  const isRtl = locale === 'ar';
  
  return (
    <section
      className="relative min-h-[85vh] flex items-center pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden bg-neutral-warm"
      aria-labelledby="hero-heading"
    >
      {/* Subtle structural background elements for editorial feel */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-cream hidden lg:block" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-center bg-cover opacity-[0.03]" aria-hidden="true" />
      
      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Typography Column (7 columns) */}
          <div className="lg:col-span-7 flex flex-col items-start text-start">
            <h1
              id="hero-heading"
              className="text-display sm:text-display max-w-2xl text-balance font-bold text-primary-deep tracking-tight mb-6 animate-slide-up"
            >
              {t('headline')}
            </h1>
            
            <p className="text-body-lg text-text/80 max-w-lg mb-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
              {t('subtext')}
            </p>
            
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <ButtonLink
                href={`/${locale}/appointment`}
                variant="primary"
                size="lg"
                withArrow
                locale={locale}
                rtl={isRtl}
                className="w-full sm:w-auto"
              >
                {t('primaryCta')}
              </ButtonLink>
              <a
                href={getWhatsAppUrl(
                  clinic.whatsappNumbers[0],
                  locale === 'ar' ? 'مرحباً عيادة Mivida، أرغب في الاستفسار.' : 'Hello Mivida Clinic, I would like to inquire.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 btn-secondary"
              >
                {t('secondaryCta')}
              </a>
            </div>
          </div>
          
          {/* Right structural balance column (5 columns) */}
          <div className="lg:col-span-5 relative hidden md:block">
            <div className={cn(
              "absolute top-1/2 -translate-y-1/2 w-full max-w-sm mx-auto",
              isRtl ? "left-0" : "right-0"
            )}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-border animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="w-12 h-1 bg-gold mb-6 rounded-full" aria-hidden="true" />
                <h2 className="text-h4 font-bold text-primary-deep mb-3">
                  {locale === 'ar' ? 'رعاية فائقة الجودة' : 'Premium Care'}
                </h2>
                <p className="text-body text-text/70 mb-6">
                  {locale === 'ar' 
                    ? 'نحن نلتزم بتقديم أحدث تقنيات الجلدية والتجميل تحت إشراف طبي متخصص لضمان أفضل النتائج.'
                    : 'We are committed to providing the latest dermatology and aesthetics technologies under expert medical supervision.'}
                </p>
                <div className="flex flex-col gap-3 text-sm font-medium text-text/80">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{locale === 'ar' ? 'إشراف طبي متخصص' : 'Specialist Medical Supervision'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{locale === 'ar' ? 'أحدث التقنيات' : 'Latest Technologies'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{locale === 'ar' ? 'نتائج موثقة' : 'Documented Results'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
