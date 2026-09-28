import { Metadata } from 'next';
import { generateSEO, generateClinicSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { clinic, doctor } from '@/content';
import { AboutContent } from '@/components/sections/AboutContent';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as 'ar' | 'en';
  return generateSEO({
    locale,
    path: '/about',
    title: locale === 'ar' ? 'عن الدكتورة' : 'About Doctor',
    description: locale === 'ar'
      ? 'تعرف على الدكتورة نورهان يسري، أخصائية الجلدية والتجميل والليزر في عيادة Mivida بطنطا.'
      : 'Meet Dr. Norhan Yousry, Dermatology, Aesthetics & Laser Specialist at Mivida Clinic in Tanta.',
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as 'ar' | 'en';
  
  const clinicSchema = generateClinicSchema(locale);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', path: '' },
    { name: locale === 'ar' ? 'عن الدكتورة' : 'About Doctor', path: '/about' },
  ], locale);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutContent locale={locale} />
    </>
  );
}