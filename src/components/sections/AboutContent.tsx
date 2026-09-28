'use client';

import Image from 'next/image';
import { ChevronRight, Award, HeartPulse, Shield, Sparkles, Stethoscope, UserCheck, MapPin } from 'lucide-react';
import { clinic, doctor } from '@/content';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface AboutContentProps {
  locale: 'ar' | 'en';
}

const philosophyItems = [
  { icon: HeartPulse, titleKey: 'medicalExpertise', descKey: 'medicalExpertiseDesc' },
  { icon: Sparkles, titleKey: 'modernTech', descKey: 'modernTechDesc' },
  { icon: Shield, titleKey: 'personalizedCare', descKey: 'personalizedCareDesc' },
  { icon: Award, titleKey: 'safetyFirst', descKey: 'safetyFirstDesc' },
];

const approachItems = [
  { icon: Stethoscope, title: { ar: 'التشخيص الدقيق', en: 'Accurate Diagnosis' }, desc: { ar: 'تقييم شامل باستخدام أحدث تقنيات الفحص', en: 'Comprehensive assessment using latest examination technologies' } },
  { icon: UserCheck, title: { ar: 'خطة علاج شخصية', en: 'Personalized Treatment Plan' }, desc: { ar: 'بروتوكول مصمم خصيصاً لاحتياجاتك', en: 'Protocol designed specifically for your needs' } },
  { icon: Sparkles, title: { ar: 'تنفيذ بمعايير عالية', en: 'High-Standard Execution' }, desc: { ar: 'بأحدث الأجهزة والتقنيات العالمية', en: 'With latest international devices and techniques' } },
  { icon: Shield, title: { ar: 'متابعة مستمرة', en: 'Continuous Follow-up' }, desc: { ar: 'دعم ما بعد العلاج لضمان أفضل النتائج', en: 'Post-treatment support for optimal results' } },
];

export function AboutContent({ locale }: AboutContentProps) {
  const t = useTranslations('doctor');
  const whyT = useTranslations('whyMivida');
  const whyItems = useTranslations('whyMivida.items');
  const common = useTranslations('common');
  const contactT = useTranslations('contact');
  const isRtl = locale === 'ar';
  
  const getText = (obj: { ar: string; en: string }) => locale === 'ar' ? obj.ar : obj.en;
  
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
      
      <header className="section bg-gradient-to-b from-cream/50 to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="overline">{t('subtitle')}</span>
            <h1 className="heading-md md:heading-lg mt-3 mb-6 font-bold tracking-tight">
              {t('title')}
            </h1>
          </div>
        </div>
      </header>
      
      <section className="section bg-white" aria-labelledby="doctor-profile">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="relative">
              <div className="absolute -inset-3 sm:-inset-4 rounded-3xl border-2 border-gold/40" aria-hidden="true" />
              <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden bg-text/5">
                <Image
                  src={doctor.secondaryPhotoUrl!}
                  alt={getText(doctor.name)}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute bottom-4 -end-4 sm:bottom-6 sm:-end-6 rounded-2xl bg-primary text-white px-5 py-3 shadow-xl flex items-center gap-2">
                <Shield className="w-5 h-5 text-gold flex-shrink-0" aria-hidden="true" />
                <p className="text-sm font-semibold">
                  {locale === 'ar' ? 'معايير عالية للجودة والسلامة' : 'High quality & safety standards'}
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h2 className="heading-md text-text mb-4">
                  {getText(doctor.name)}
                </h2>
                <p className="text-primary font-medium mb-6">
                  {getText(doctor.title)}
                </p>
                
                <div className="prose max-w-none text-text/80 space-y-4">
                  <p className="body leading-relaxed">
                    {getText(doctor.bio)}
                  </p>
                  <p className="body leading-relaxed">
                    {getText(doctor.approach)}
                  </p>
                </div>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2" role="list" aria-label={locale === 'ar' ? 'معلومات الدكتورة' : 'Doctor information'}>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-cream/50 border border-border" role="listitem">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Stethoscope className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="caption !text-text/75">
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
                    <p className="caption !text-text/75">
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
      
      <section className="section bg-cream" aria-labelledby="treatment-approach">
        <div className="container-custom">
          <header className="text-center max-w-2xl mx-auto mb-12">
            <h2 id="treatment-approach" className="heading-md">
              {locale === 'ar' ? 'منهجية العلاج' : 'Treatment Approach'}
            </h2>
            <p className="body text-text/70 mt-2">
              {locale === 'ar' 
                ? 'نتبع نهجاً متكاملاً يضمن أفضل النتائج لكل مريض'
                : 'We follow an integrated approach ensuring the best results for every patient'
              }
            </p>
          </header>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {approachItems.map((item, index) => (
              <article key={index} className="card p-6 text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 mx-auto">
                  <item.icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="heading-sm text-text mb-2">
                  {getText(item.title)}
                </h3>
                <p className="body-sm text-text/70">
                  {getText(item.desc)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      
      <section className="section bg-white" aria-labelledby="clinic-philosophy">
        <div className="container-custom">
          <header className="text-center max-w-2xl mx-auto mb-12">
            <h2 id="clinic-philosophy" className="heading-md">
              {whyT('title')}
            </h2>
          </header>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => {
              const Icon = philosophyItems[index].icon;
              return (
                <article key={index} className="card p-6 text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 mx-auto">
                    <Icon />
                  </div>
                  <h3 className="heading-sm text-text mb-2">
                    {whyItems(`${index}.title`)}
                  </h3>
                  <p className="body-sm text-text/70">
                    {whyItems(`${index}.description`)}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      
      <section className="section bg-primary" aria-labelledby="about-cta">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 id="about-cta" className="heading-md !text-white mb-4">
              {locale === 'ar' ? 'احجز استشارتك الآن' : 'Book Your Consultation Now'}
            </h2>
            <p className="body-lg !text-white/90 mb-6">
              {locale === 'ar'
                ? 'ابدأ رحلتك نحو بشرة صحية وجميلة مع رعاية طبية متخصصة'
                : 'Start your journey to healthy, beautiful skin with specialized medical care'
              }
            </p>
            <a
              href={`/${locale}/appointment`}
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
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
