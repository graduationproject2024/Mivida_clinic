import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services } from '@/content/services';
import { generateSEO, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { ServiceDetailContent } from '@/components/services/ServiceDetailContent';

interface ServiceDetailPageProps {
  params: Promise<{ locale: string; service: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ service: service.id }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { locale: localeParam, service } = await params;
  const locale = localeParam as 'ar' | 'en';
  const serviceItem = services.find((s) => s.id === service);
  if (!serviceItem) return {};
  
  const title = locale === 'ar' ? serviceItem.name.ar : serviceItem.name.en;
  let description = locale === 'ar' ? serviceItem.description.ar : serviceItem.description.en;
  
  // Ensure description is >= 120 chars
  if (description.length < 120) {
    const pad = locale === 'ar' 
      ? ' اكتشف أفضل العلاجات في عيادة Mivida بطنطا تحت إشراف الدكتورة نورهان يسري. احجز موعدك الآن للحصول على استشارة متخصصة ونتائج مبهرة.'
      : ' Discover the best treatments at Mivida Clinic in Tanta under Dr. Norhan Yousry. Book your appointment now for expert consultation.';
    description += pad;
  }
  
  return generateSEO({
    locale,
    path: `/services/${service}`,
    title,
    description,
  });
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { locale: localeParam, service } = await params;
  const locale = localeParam as 'ar' | 'en';
  const serviceItem = services.find((s) => s.id === service);
  if (!serviceItem) notFound();

  const schema = generateServiceSchema(service, locale);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', path: '' },
    { name: locale === 'ar' ? 'خدماتنا' : 'Our Services', path: '/services' },
    { name: locale === 'ar' ? serviceItem.name.ar : serviceItem.name.en, path: `/services/${service}` },
  ], locale);

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServiceDetailContent service={serviceItem} locale={locale} />
    </>
  );
}