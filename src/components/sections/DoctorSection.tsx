import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { doctor } from '../../content/doctor';
import { ButtonLink } from '@/components/ui/Button';

interface DoctorSectionProps {
  locale: 'ar' | 'en';
}

export function DoctorSection({ locale }: DoctorSectionProps) {
  const t = useTranslations('doctor');
  const isRtl = locale === 'ar';
  
  return (
    <section className="section bg-cream overflow-hidden" aria-labelledby="doctor-heading">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait (5 columns) */}
          <div className="lg:col-span-5 relative">
            {/* Subtle background offset block for editorial depth */}
            <div className={cn(
              "absolute -inset-6 bg-white rounded-3xl hidden md:block",
              isRtl ? "-right-12 left-6" : "-left-12 right-6"
            )} aria-hidden="true" />
            
            <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-warm shadow-sm">
              <Image
                src={doctor.photoUrl!}
                alt={locale === 'ar' ? `الدكتورة ${doctor.name.ar}` : `Dr. ${doctor.name.en}`}
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
          
          {/* Right Column: Editorial Text (6 columns, offset by 1) */}
          <div className="lg:col-start-7 lg:col-span-6 relative z-10 flex flex-col items-start text-start py-8 lg:py-0">
            <span className="text-overline text-primary font-medium tracking-widest uppercase mb-4">
              {t('subtitle')}
            </span>
            
            <h2 id="doctor-heading" className="text-h2 font-bold text-primary-deep tracking-tight mb-2">
              {locale === 'ar' ? doctor.name.ar : doctor.name.en}
            </h2>
            
            <p className="text-lg font-medium text-primary mb-8">
              {locale === 'ar' ? doctor.title.ar : doctor.title.en}
            </p>
            
            <div className="space-y-6 text-body-lg text-text/80 mb-10">
              <p>
                {locale === 'ar' ? doctor.bio.ar : doctor.bio.en}
              </p>
              
              <div className="pt-6 border-t border-border">
                <h3 className="text-h4 font-bold text-primary-deep mb-3">
                  {locale === 'ar' ? 'فلسفة العلاج' : 'Treatment Philosophy'}
                </h3>
                <p>
                  {locale === 'ar' ? doctor.approach.ar : doctor.approach.en}
                </p>
              </div>
            </div>
            
            <ButtonLink
              href={`/${locale}/about`}
              variant="secondary"
              size="md"
              withArrow
              locale={locale}
              rtl={isRtl}
            >
              {locale === 'ar' ? 'تعرف على الدكتورة' : 'Learn more about the doctor'}
            </ButtonLink>
          </div>
          
        </div>
      </div>
    </section>
  );
}
