'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Award, HeartPulse, Shield, Sparkles } from 'lucide-react';
import { doctor } from '../../content/doctor';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface DoctorSectionProps {
  locale: 'ar' | 'en';
}

const approachItems = [
  { icon: HeartPulse, titleKey: 'medicalExpertise', descKey: 'medicalExpertiseDesc' },
  { icon: Sparkles, titleKey: 'modernTech', descKey: 'modernTechDesc' },
  { icon: Shield, titleKey: 'personalizedCare', descKey: 'personalizedCareDesc' },
  { icon: Award, titleKey: 'safetyFirst', descKey: 'safetyFirstDesc' },
];

export function DoctorSection({ locale }: DoctorSectionProps) {
  const t = useTranslations('doctor');
  const whyT = useTranslations('whyMivida');
  const whyItems = useTranslations('whyMivida.items');
  const isRtl = locale === 'ar';
  
  return (
    <section className="section bg-cream" aria-labelledby="doctor-heading">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <header className="mb-8">
              <span className="overline">{t('subtitle')}</span>
              <h2 id="doctor-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-3 mb-4">
                {t('title')}
              </h2>
            </header>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white flex-shrink-0">
                  <HeartPulse className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="heading-sm text-text mb-2">
                    {locale === 'ar' ? doctor.name.ar : doctor.name.en}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {locale === 'ar' ? doctor.title.ar : doctor.title.en}
                  </p>
                  <p className="body text-text/80">
                    {locale === 'ar' ? doctor.bio.ar : doctor.bio.en}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white flex-shrink-0">
                  <Sparkles className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="heading-sm text-text mb-2">
                    {locale === 'ar' ? 'فلسفة العلاج' : 'Treatment Philosophy'}
                  </h3>
                  <p className="body text-text/80">
                    {locale === 'ar' ? doctor.approach.ar : doctor.approach.en}
                  </p>
                </div>
              </div>
            </div>
            
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-2 mt-8 font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              {locale === 'ar' ? 'تعرف على الدكتورة بالتفصيل' : 'Learn more about the doctor'}
              <ChevronRight className={cn('w-4 h-4', isRtl && '-rotate-180')} aria-hidden="true" />
            </Link>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-3 sm:-inset-4 rounded-3xl border-2 border-gold/40" aria-hidden="true" />
            <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden bg-text/5">
              <Image
                src={doctor.photoUrl!}
                alt={locale === 'ar' ? `الدكتورة ${doctor.name.ar}` : `Dr. ${doctor.name.en}`}
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
        </div>
        
        <ul className="mt-16 list-none grid gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-label={locale === 'ar' ? 'لماذا تختار عيادتنا' : 'Why choose our clinic'}>
          {Array.from({ length: 4 }, (_, index) => {
            const Icon = approachItems[index].icon;
            return (
              <li key={index} className="text-center p-6 rounded-xl bg-white border border-border hover:shadow-lg transition-shadow">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="heading-sm text-text mb-2">
                  {whyItems(`${index}.title`)}
                </h3>
                <p className="body-sm text-text/70">
                  {whyItems(`${index}.description`)}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}