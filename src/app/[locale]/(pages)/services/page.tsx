import { Metadata } from 'next';
import { services } from '@/content/services';
import { generateSEO, generateServiceSchema } from '@/lib/seo';
import { ServiceCard } from '@/components/services/ServiceCard';

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as 'ar' | 'en';
  return generateSEO({
    locale,
    path: '/services',
    title: locale === 'ar' ? 'خدماتنا' : 'Our Services',
    description: locale === 'ar'
      ? 'اكتشف جميع خدمات عيادة Mivida: فيلر، بوتوكس، ليزر، بلازما، علاج الشعر والبشرة، والمزيد.'
      : 'Discover all Mivida Clinic services: Filler, Botox, Laser, PRP, Skin & Hair treatments, and more.',
  });
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as 'ar' | 'en';
  
  return (
    <>
      {services.map((service) => (
        <script
          key={service.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceSchema(service.id, locale)) }}
        />
      ))}
      <section className="section bg-white" aria-labelledby="services-heading">
        <div className="container-custom">
          <header className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
            <span className="overline">{locale === 'ar' ? 'علاجات جلدية وتجميلية شاملة' : 'Comprehensive Dermatology & Aesthetic Treatments'}</span>
            <h1 id="services-heading" className="heading-md md:heading-lg mt-3 mb-4 font-bold tracking-tight">
              {locale === 'ar' ? 'خدماتنا' : 'Our Services'}
            </h1>
            <p className="body-lg text-text/70">
              {locale === 'ar'
                ? 'نقدم مجموعة متكاملة من العلاجات الجلدية والتجميلية باستخدام أحدث التقنيات وأعلى معايير السلامة.'
                : 'We offer a comprehensive range of dermatology and aesthetic treatments using the latest technologies and highest safety standards.'
              }
            </p>
          </header>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}