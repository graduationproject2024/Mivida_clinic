'use client';

import Image from 'next/image';
import { ChevronRight, Award, HeartPulse, Shield, Sparkles, Stethoscope, UserCheck, MapPin, ArrowRight } from 'lucide-react';
import { clinic, doctor } from '@/content';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface AboutContentProps {
  locale: 'ar' | 'en';
}

const approachItems = [
  { icon: Stethoscope, title: { ar: 'التشخيص الدقيق', en: 'Accurate Diagnosis' }, desc: { ar: 'تقييم شامل باستخدام أحدث تقنيات الفحص', en: 'Comprehensive assessment using latest examination technologies' } },
  { icon: UserCheck, title: { ar: 'خطة علاج شخصية', en: 'Personalized Treatment Plan' }, desc: { ar: 'بروتوكول مصمم خصيصاً لاحتياجاتك', en: 'Protocol designed specifically for your needs' } },
  { icon: Sparkles, title: { ar: 'تنفيذ بمعايير عالية', en: 'High-Standard Execution' }, desc: { ar: 'بأحدث الأجهزة والتقنيات العالمية', en: 'With latest international devices and techniques' } },
  { icon: Shield, title: { ar: 'متابعة مستمرة', en: 'Continuous Follow-up' }, desc: { ar: 'دعم ما بعد العلاج لضمان أفضل النتائج', en: 'Post-treatment support for optimal results' } },
];

const philosophyIcons = [HeartPulse, Sparkles, Shield, Award];

export function AboutContent({ locale }: AboutContentProps) {
  const t = useTranslations('doctor');
  const whyT = useTranslations('whyMivida');
  const whyItems = useTranslations('whyMivida.items');
  const common = useTranslations('common');
  const isRtl = locale === 'ar';
  
  const getText = (obj: { ar: string; en: string }) => locale === 'ar' ? obj.ar : obj.en;
  
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
                {t('subtitle')}
              </span>
            </div>
            <h1 className="text-display sm:text-display max-w-2xl text-balance font-bold text-primary-deep mb-6">
              {t('title')}
            </h1>
          </div>
        </div>
      </header>
      
      {/* Doctor Profile - Editorial 2-column */}
      <section className="section bg-white" aria-labelledby="doctor-profile">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Portrait */}
            <div className="lg:col-span-5 relative">
              <div className={cn(
                "absolute -inset-6 bg-cream rounded-3xl hidden md:block",
                isRtl ? "-right-12 left-6" : "-left-12 right-6"
              )} aria-hidden="true" />
              
              <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden bg-text/5 shadow-sm">
                <Image
                  src={doctor.secondaryPhotoUrl!}
                  alt={getText(doctor.name)}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="absolute bottom-4 -end-4 sm:bottom-6 sm:-end-6 rounded-2xl bg-primary text-white px-5 py-3 shadow-xl flex items-center gap-2">
                <Shield className="w-5 h-5 text-gold flex-shrink-0" aria-hidden="true" />
                <p className="text-sm font-semibold">
                  {locale === 'ar' ? 'معايير عالية للجودة والسلامة' : 'High quality & safety standards'}
                </p>
              </div>
            </div>
            
            {/* Doctor Info - Editorial text */}
            <div className="lg:col-start-7 lg:col-span-6 relative z-10 flex flex-col items-start text-start py-8 lg:py-0">
              <h2 id="doctor-profile" className="text-h2 font-bold text-primary-deep mb-2">
                {getText(doctor.name)}
              </h2>
              <p className="text-lg font-medium text-primary mb-8">
                {getText(doctor.title)}
              </p>
              
              <div className="space-y-6 text-body-lg text-text/80 mb-10">
                <p className="leading-relaxed">
                  {getText(doctor.bio)}
                </p>
                
                <div className="pt-6 border-t border-border">
                  <h3 className="text-h4 font-bold text-primary-deep mb-3">
                    {locale === 'ar' ? 'فلسفة العلاج' : 'Treatment Philosophy'}
                  </h3>
                  <p className="leading-relaxed">
                    {getText(doctor.approach)}
                  </p>
                </div>
              </div>
              
              {/* Info cards - editorial style */}
              <div className="grid gap-4 sm:grid-cols-2 w-full" role="list" aria-label={locale === 'ar' ? 'معلومات الدكتورة' : 'Doctor information'}>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-cream/50 border border-border" role="listitem">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Stethoscope className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-caption text-text-muted">
                      {locale === 'ar' ? 'التخصص' : 'Specialty'}
                    </p>
                    <p className="font-medium text-text">
                      {getText(doctor.title)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-cream/50 border border-border" role="listitem">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-caption text-text-muted">
                      {locale === 'ar' ? 'الموقع' : 'Location'}
                    </p>
                    <p className="font-medium text-text">
                      Mivida Clinic, Tanta
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Treatment Approach - matching homepage WhyMivida editorial layout */}
      <section className="section bg-cream" aria-labelledby="treatment-approach">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <div className="mb-6 flex items-center gap-4">
                <div className="w-12 h-px bg-gold" aria-hidden="true" />
                <span className="text-overline text-primary font-medium tracking-widest uppercase">
                  {locale === 'ar' ? 'الرعاية المتكاملة' : 'Integrated Care'}
                </span>
              </div>
              <h2 id="treatment-approach" className="text-h2 font-bold text-primary-deep mb-6">
                {locale === 'ar' ? 'منهجية العلاج' : 'Treatment Approach'}
              </h2>
              <p className="text-body-lg text-text/70 max-w-md">
                {locale === 'ar' 
                  ? 'نتبع نهجاً متكاملاً يضمن أفضل النتائج لكل مريض'
                  : 'We follow an integrated approach ensuring the best results for every patient'}
              </p>
            </div>
            
            <div className="lg:col-start-7 lg:col-span-6 flex flex-col gap-8 lg:gap-12">
              {approachItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex gap-4 sm:gap-6 group">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm border border-border">
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-h4 font-bold text-primary-deep mb-3 group-hover:text-primary transition-colors">
                        {getText(item.title)}
                      </h3>
                      <p className="text-body text-text/70 leading-relaxed">
                        {getText(item.desc)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Mivida - matching homepage grid */}
      <section className="section bg-white" aria-labelledby="clinic-philosophy">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
            <div className="mb-6 flex items-center justify-center gap-4">
              <div className="w-8 h-px bg-gold" aria-hidden="true" />
              <span className="text-overline text-primary font-medium tracking-widest uppercase">
                {locale === 'ar' ? 'تجربة ميفيدا' : 'The Mivida Experience'}
              </span>
              <div className="w-8 h-px bg-gold" aria-hidden="true" />
            </div>
            <h2 id="clinic-philosophy" className="text-h2 font-bold text-primary-deep">
              {whyT('title')}
            </h2>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => {
              const Icon = philosophyIcons[index];
              return (
                <article key={index} className="group p-6 text-center rounded-2xl bg-cream/50 border border-border hover:border-primary/20 hover:shadow-sm transition-all">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 mx-auto group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-h4 font-bold text-text mb-2 group-hover:text-primary transition-colors">
                    {whyItems(`${index}.title`)}
                  </h3>
                  <p className="text-caption text-text/70">
                    {whyItems(`${index}.description`)}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="section bg-primary" aria-labelledby="about-cta">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 id="about-cta" className="text-h2 font-bold text-white mb-4">
              {locale === 'ar' ? 'احجز استشارتك الآن' : 'Book Your Consultation Now'}
            </h2>
            <p className="text-body-lg text-white/90 mb-8">
              {locale === 'ar'
                ? 'ابدأ رحلتك نحو بشرة صحية وجميلة مع رعاية طبية متخصصة'
                : 'Start your journey to healthy, beautiful skin with specialized medical care'}
            </p>
            <a
              href={`/${locale}/appointment`}
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary active:scale-[0.98]"
            >
              {common('bookAppointment')}
              <ChevronRight className={cn('w-5 h-5', isRtl && '-rotate-180')} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
