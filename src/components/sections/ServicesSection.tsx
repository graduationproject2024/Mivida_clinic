import Link from 'next/link';
import { ArrowRight, ChevronRight, Sparkles, Sparkle, Droplets, HeartPulse, Zap, Star, Droplet, CircleDot } from 'lucide-react';
import { services } from '../../content/services';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { ButtonLink } from '@/components/ui/Button';

interface ServicesSectionProps {
  locale: 'ar' | 'en';
}

const serviceIcons: Record<string, React.ElementType> = {
  filler: Sparkles,
  botox: Sparkle,
  plasma: Droplets,
  'skin-hair': HeartPulse,
  laser: Zap,
  'glow-injection': Star,
  mesotherapy: Droplet,
  'stem-cells': CircleDot,
};

export function ServicesSection({ locale }: ServicesSectionProps) {
  const t = useTranslations('services');
  const tc = useTranslations('common');
  const isRtl = locale === 'ar';
  
  const featuredIds = ['laser', 'filler'];
  const featuredServices = services.filter(s => featuredIds.includes(s.id));
  const remainingServices = services.filter(s => !featuredIds.includes(s.id));
  
  return (
    <section className="section bg-white" aria-labelledby="services-heading">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Featured Services (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="mb-4 lg:hidden">
              <h2 id="services-heading-mobile" className="text-h2 font-bold text-primary-deep mb-3">
                {t('title')}
              </h2>
              <p className="text-body text-text/70">
                {t('subtitle')}
              </p>
            </div>

            {featuredServices.map((service) => {
              const Icon = serviceIcons[service.id] || Sparkles;
              return (
                <Link
                  key={service.id}
                  href={`/${locale}/services/${service.id}`}
                  aria-label={locale === 'ar' ? `اعرف المزيد عن ${service.name.ar}` : `Learn more about ${service.name.en}`}
                  className="group relative flex flex-col bg-cream rounded-2xl p-8 overflow-hidden border border-border transition-colors hover:border-primary/20"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-bl-full opacity-50 transition-transform group-hover:scale-110" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white text-primary mb-6 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-h3 font-bold text-primary-deep mb-3">
                      {locale === 'ar' ? service.name.ar : service.name.en}
                    </h3>
                    <p className="text-body text-text/80 mb-6">
                      {locale === 'ar' ? service.description.ar : service.description.en}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-primary-deep transition-colors">
                      {tc('learnMore')}
                      <ArrowRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-1", isRtl && "rotate-180 group-hover:-translate-x-1")} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          
          {/* Right Column: Header & Compact List (7 columns) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="hidden lg:block mb-10">
              <h2 id="services-heading" className="text-display sm:text-h1 font-bold text-primary-deep tracking-tight mb-4">
                {t('title')}
              </h2>
              <p className="text-body-lg text-text/70 max-w-lg">
                {t('subtitle')}
              </p>
            </div>
            
            <div className="flex flex-col gap-2 mb-10">
              {remainingServices.map((service) => {
                const Icon = serviceIcons[service.id] || Sparkles;
                return (
                  <Link
                    key={service.id}
                    href={`/${locale}/services/${service.id}`}
                    aria-label={locale === 'ar' ? `اعرف المزيد عن ${service.name.ar}` : `Learn more about ${service.name.en}`}
                    className="group flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-border hover:bg-neutral-warm transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-cream text-primary/70 group-hover:bg-white group-hover:text-primary group-hover:shadow-sm transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-text group-hover:text-primary-deep transition-colors">
                          {locale === 'ar' ? service.name.ar : service.name.en}
                        </h3>
                        <p className="text-sm text-text-muted hidden sm:block">
                          {locale === 'ar' ? service.shortDescription.ar : service.shortDescription.en}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={cn("w-5 h-5 text-text/30 group-hover:text-primary transition-colors", isRtl && "rotate-180")} />
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-auto border-t border-border pt-8 flex items-center">
              <ButtonLink
                href={`/${locale}/services`}
                variant="secondary"
                size="md"
                withArrow
                locale={locale}
                rtl={isRtl}
              >
                {t('viewAll')}
              </ButtonLink>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
