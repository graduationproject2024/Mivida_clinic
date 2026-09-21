import { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { DoctorSection } from '@/components/sections/DoctorSection';
import { BeforeAfterSection } from '@/components/sections/BeforeAfterSection';
import { WhyMividaSection } from '@/components/sections/WhyMividaSection';
import { AppointmentCTA } from '@/components/appointment/AppointmentCTA';
import { LocationSection } from '@/components/sections/LocationSection';
import { generateSEO, generateClinicSchema } from '@/lib/seo';
import { clinic } from '@/content/clinic';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as 'ar' | 'en';
  return generateSEO({ locale, path: '/' });
}

export default async function HomePage({ params }: HomePageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as 'ar' | 'en';
  const clinicSchema = generateClinicSchema(locale);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
      />
      <Hero locale={locale} />
      <ServicesSection locale={locale} />
      <DoctorSection locale={locale} />
      <BeforeAfterSection locale={locale} />
      <WhyMividaSection locale={locale} />
      <AppointmentCTA locale={locale} />
      <LocationSection locale={locale} />
    </>
  );
}