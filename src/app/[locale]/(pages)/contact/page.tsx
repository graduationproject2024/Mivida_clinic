import { Metadata } from 'next';
import { generateSEO, generateBreadcrumbSchema, generateClinicSchema } from '@/lib/seo';
import { ContactContent } from '@/components/sections/ContactContent';
import { clinic } from '@/content/clinic';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as 'ar' | 'en';
  return generateSEO({
    locale,
    path: '/contact',
    title: locale === 'ar' ? 'تواصل معنا' : 'Contact Us',
    description: locale === 'ar'
      ? 'تواصل مع عيادة Mivida في طنطا. الهاتف، واتساب، العنوان، وساعات العمل.'
      : 'Contact Mivida Clinic in Tanta. Phone, WhatsApp, address, and working hours.',
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as 'ar' | 'en';
  
  const clinicSchema = generateClinicSchema(locale);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: `https://mivida-clinic.com/${locale}` },
    { name: locale === 'ar' ? 'تواصل معنا' : 'Contact Us', url: `https://mivida-clinic.com/${locale}/contact` },
  ]);
  
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
      <ContactContent locale={locale} />
    </>
  );
}