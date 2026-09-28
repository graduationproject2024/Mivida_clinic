import { Metadata } from 'next';
import { generateSEO, generateBreadcrumbSchema } from '@/lib/seo';
import { AppointmentForm } from '@/components/appointment/AppointmentForm';
import { clinic } from '@/content/clinic';

interface AppointmentPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AppointmentPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as 'ar' | 'en';
  return generateSEO({
    locale,
    path: '/appointment',
    title: locale === 'ar' ? 'احجز موعدك' : 'Book Appointment',
    description: locale === 'ar'
      ? 'احجز موعدك في عيادة Mivida بطنطا. اختر الخدمة والوقت المناسب، وسنتواصل معك عبر واتساب للتأكيد.'
      : 'Book your appointment at Mivida Clinic in Tanta. Select service and preferred time, we will confirm via WhatsApp.',
  });
}

export default async function AppointmentPage({ params }: AppointmentPageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as 'ar' | 'en';
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', path: '' },
    { name: locale === 'ar' ? 'احجز موعدك' : 'Book Appointment', path: '/appointment' },
  ], locale);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AppointmentForm locale={locale} />
    </>
  );
}