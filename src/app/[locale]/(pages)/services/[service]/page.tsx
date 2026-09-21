import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services } from '@/content/services';
import { generateSEO, generateServiceSchema } from '@/lib/seo';
import { ServiceDetailContent } from '@/components/services/ServiceDetailContent';

interface ServiceDetailPageProps {
  params: Promise<{ locale: string; service: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ service: service.id }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { locale: localeParam, service } = await params;
  const locale = localeParam as 'ar' | 'en';
  const serviceItem = services.find((s) => s.id === service);
  if (!serviceItem) return {};
  return generateSEO({
    locale,
    path: `/services/${service}`,
    title: locale === 'ar' ? serviceItem.name.ar : serviceItem.name.en,
    description: locale === 'ar' ? serviceItem.shortDescription.ar : serviceItem.shortDescription.en,
  });
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { locale: localeParam, service } = await params;
  const locale = localeParam as 'ar' | 'en';
  const serviceItem = services.find((s) => s.id === service);
  if (!serviceItem) notFound();

  const schema = generateServiceSchema(service, locale);

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <ServiceDetailContent service={serviceItem} locale={locale} />
    </>
  );
}