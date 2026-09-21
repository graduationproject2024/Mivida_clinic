import { Metadata } from 'next';
import { generateSEO, generateBreadcrumbSchema } from '@/lib/seo';
import { BeforeAfterContent } from '@/components/before-after/BeforeAfterContent';

interface BeforeAfterPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BeforeAfterPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as 'ar' | 'en';
  return generateSEO({
    locale,
    path: '/before-after',
    title: locale === 'ar' ? 'قبل وبعد' : 'Before & After',
    description: locale === 'ar'
      ? 'شاهد نتائج حقيقية من علاجات عيادة Mivida: فيلر، بوتوكس، ليزر، بلازما، والمزيد.'
      : 'View real results from Mivida Clinic treatments: Filler, Botox, Laser, PRP, and more.',
  });
}

export default async function BeforeAfterPage({ params }: BeforeAfterPageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as 'ar' | 'en';
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: `https://mivida-clinic.com/${locale}` },
    { name: locale === 'ar' ? 'قبل وبعد' : 'Before & After', url: `https://mivida-clinic.com/${locale}/before-after` },
  ]);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BeforeAfterContent locale={locale} />
    </>
  );
}