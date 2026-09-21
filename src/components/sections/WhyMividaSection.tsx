'use client';

import { Award, Sparkles, Shield, HeartPulse } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface WhyMividaSectionProps {
  locale: 'ar' | 'en';
}

export function WhyMividaSection({ locale }: WhyMividaSectionProps) {
  const t = useTranslations('whyMivida');
  const items = useTranslations('whyMivida.items');
  const isRtl = locale === 'ar';
  
  return (
    <section className="section bg-white" aria-labelledby="why-mivida-heading">
      <div className="container-custom">
        <header className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="overline">{locale === 'ar' ? 'ما يميزنا' : 'What Sets Us Apart'}</span>
          <h2 id="why-mivida-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-3">
            {t('title')}
          </h2>
        </header>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <article
              key={index}
              className="card p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 mx-auto">
                {[
                  <Award className="w-7 h-7" key="0" />,
                  <Sparkles className="w-7 h-7" key="1" />,
                  <HeartPulse className="w-7 h-7" key="2" />,
                  <Shield className="w-7 h-7" key="3" />,
                ][index]}
              </div>
              <h3 className="heading-sm text-text mb-2">
                {items(`${index}.title`)}
              </h3>
              <p className="body-sm text-text/70">
                {items(`${index}.description`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}