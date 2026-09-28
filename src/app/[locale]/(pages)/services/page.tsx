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
      <article className="min-h-screen">
        {/* Hero - editorial style matching homepage */}
        <header className="relative bg-neutral-warm pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-center bg-cover opacity-[0.03]" aria-hidden="true" />
          <div className="absolute top-0 right-0 w-1/3 h-full bg-cream hidden lg:block" aria-hidden="true" />
          
          <div className="container-custom relative z-10">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-4">
                <div className="w-12 h-px bg-gold" aria-hidden="true" />
                <span className="text-overline text-primary font-medium tracking-widest uppercase">
                  {locale === 'ar' ? 'علاجات جلدية وتجميلية شاملة' : 'Comprehensive Dermatology & Aesthetic Treatments'}
                </span>
              </div>
              <h1 id="services-heading" className="text-display sm:text-display max-w-2xl text-balance font-bold text-primary-deep mb-6">
                {locale === 'ar' ? 'خدماتنا' : 'Our Services'}
              </h1>
              <p className="text-body-lg text-text/80 max-w-lg">
                {locale === 'ar'
                  ? 'نقدم مجموعة متكاملة من العلاجات الجلدية والتجميلية باستخدام أحدث التقنيات وأعلى معايير السلامة.'
                  : 'We offer a comprehensive range of dermatology and aesthetic treatments using the latest technologies and highest safety standards.'}
              </p>
            </div>
          </div>
        </header>
        
        {/* Services Grid */}
        <section className="section bg-white" aria-labelledby="services-heading">
          <div className="container-custom">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}