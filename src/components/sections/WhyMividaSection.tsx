import { Award, Sparkles, Shield, HeartPulse } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface WhyMividaSectionProps {
  locale: 'ar' | 'en';
}

const icons = [Award, Sparkles, HeartPulse, Shield];

export function WhyMividaSection({ locale }: WhyMividaSectionProps) {
  const t = useTranslations('whyMivida');
  const items = useTranslations('whyMivida.items');
  const isRtl = locale === 'ar';
  
  return (
    <section className="section bg-white" aria-labelledby="why-mivida-heading">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Narrative (5 columns) */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="mb-6 flex items-center gap-4">
              <div className="w-12 h-px bg-gold" aria-hidden="true" />
              <span className="text-overline text-primary font-medium tracking-widest uppercase">
                {locale === 'ar' ? 'تجربة ميفيدا' : 'The Mivida Experience'}
              </span>
            </div>
            
            <h2 id="why-mivida-heading" className="text-h2 font-bold text-primary-deep tracking-tight mb-6">
              {t('title')}
            </h2>
            
            <p className="text-body-lg text-text/70 mb-8 max-w-md">
              {locale === 'ar' 
                ? 'نقدم رعاية استثنائية تجمع بين الخبرة الطبية العميقة والتكنولوجيا المتقدمة في بيئة مريحة.'
                : 'We provide exceptional care that combines deep medical expertise with advanced technology in a comfortable environment.'}
            </p>
            
            <div className="hidden lg:block w-full aspect-[4/3] rounded-2xl bg-cream border border-border mt-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-center bg-cover opacity-[0.03]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent" />
            </div>
          </div>
          
          {/* Right Column: Refined Vertical List (6 columns, offset 1) */}
          <div className="lg:col-start-7 lg:col-span-6 flex flex-col gap-8 lg:gap-12">
            {Array.from({ length: 4 }, (_, index) => {
              const Icon = icons[index];
              return (
                <article
                  key={index}
                  className="flex gap-6 group"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-neutral-warm text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-h4 font-bold text-primary-deep mb-3 group-hover:text-primary transition-colors">
                      {items(`${index}.title`)}
                    </h3>
                    <p className="text-body text-text/70 leading-relaxed">
                      {items(`${index}.description`)}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
}
