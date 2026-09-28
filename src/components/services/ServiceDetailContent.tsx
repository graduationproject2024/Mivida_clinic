'use client';

import Link from 'next/link';
import { ChevronRight, ArrowRight, CheckCircle, Info, AlertCircle, HelpCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { clinic } from '../../content/clinic';

interface ServiceDetailContentProps {
  service: {
    id: string;
    name: { ar: string; en: string };
    description: { ar: string; en: string };
    shortDescription: { ar: string; en: string };
    icon: string;
    order: number;
  };
  locale: 'ar' | 'en';
}

const serviceDetails: Record<string, { 
  suitableFor: { ar: string[]; en: string[] };
  experience: { ar: string[]; en: string[] };
  importantInfo: { ar: string[]; en: string[] };
  faqs: Array<{ q: { ar: string; en: string }; a: { ar: string; en: string } }>;
}> = {
  filler: {
    suitableFor: {
      ar: ['فقدان حجم الوجه', 'التجاعيد العميقة والخطوط الدقيقة', 'تحديد ملامح الوجه', 'تحسين مظهر الندبات'],
      en: ['Facial volume loss', 'Deep wrinkles and fine lines', 'Facial contouring', 'Improving scar appearance'],
    },
    experience: {
      ar: ['استشارة شاملة لتقييم الاحتياجات', 'تطبيق مخدر موضعي للراحة', 'حقن دقيقة في المناطق المستهدفة', 'نتائج فورية مع تحسن تدريجي'],
      en: ['Comprehensive consultation to assess needs', 'Topical anesthetic for comfort', 'Precise injections in targeted areas', 'Immediate results with gradual improvement'],
    },
    importantInfo: {
      ar: ['النتائج تستمر 6-18 شهراً', 'قد يحدث تورم أو كدمات مؤقتة', 'تجنب التعرض للشمس والحرارة', 'متابعة بعد أسبوعين للتقييم'],
      en: ['Results last 6-18 months', 'Temporary swelling or bruising may occur', 'Avoid sun exposure and heat', 'Follow-up after two weeks for assessment'],
    },
    faqs: [
      {
        q: { ar: 'هل الفيلر مؤلم؟', en: 'Is filler painful?' },
        a: { ar: 'نستخدم مخدر موضعي ونقدم حقناً دقيقة لتقليل أي إزعاج.', en: 'We use topical anesthetic and precise injections to minimize discomfort.' },
      },
      {
        q: { ar: 'متى تظهر النتائج النهائية؟', en: 'When do final results appear?' },
        a: { ar: 'تظهر نتائج فورية، مع النتيجة النهائية خلال 1-2 أسبوع.', en: 'Immediate results are visible, with final results in 1-2 weeks.' },
      },
    ],
  },
  botox: {
    suitableFor: {
      ar: ['خطوط الجبهة', 'خطوط العبوس بين الحاجبين', 'خطوط الضحك حول العينين', 'خطوط الرقبة'],
      en: ['Forehead lines', 'Frown lines between eyebrows', 'Crow’s feet around eyes', 'Neck bands'],
    },
    experience: {
      ar: ['تقييم عضلات الوجه', 'تحديد نقاط الحقن المثلى', 'حقن سريعة باستخدام إبر دقيقة', 'بداية التحسن خلال 3-7 أيام'],
      en: ['Facial muscle assessment', 'Identifying optimal injection points', 'Quick injections with fine needles', 'Onset of improvement within 3-7 days'],
    },
    importantInfo: {
      ar: ['النتائج تستمر 3-6 أشهر', 'تجنب فرك المنطقة المعالجة', 'الامتناع عن الرياضة 24 ساعة', 'المتابعة الدورية للحفاظ على النتائج'],
      en: ['Results last 3-6 months', 'Avoid rubbing treated area', 'No exercise for 24 hours', 'Regular maintenance for sustained results'],
    },
    faqs: [
      {
        q: { ar: 'هل سيبدو وجهي متجمداً؟', en: 'Will my face look frozen?' },
        a: { ar: 'لا، نهدف لنتائج طبيعية تحافظ على تعابير وجهك.', en: 'No, we aim for natural results preserving your facial expressions.' },
      },
      {
        q: { ar: 'متى يمكنني العودة للأنشطة الطبيعية؟', en: 'When can I resume normal activities?' },
        a: { ar: 'فوراً، مع تجنب الرياضة والاستلقاء لمدة 4 ساعات.', en: 'Immediately, avoiding exercise and lying down for 4 hours.' },
      },
    ],
  },
  plasma: {
    suitableFor: {
      ar: ['تجديد البشرة', 'ندبات حب الشباب', 'خطوط دقيقة وتجاعيد', 'تصبغات البشرة', 'فقدان مرونة الجلد'],
      en: ['Skin rejuvenation', 'Acne scars', 'Fine lines and wrinkles', 'Skin pigmentation', 'Loss of skin elasticity'],
    },
    experience: {
      ar: ['سحب عينة دم صغيرة', 'فصل البلازما الغنية بالصفائح', 'حقن البلازما في المناطق المستهدفة', 'تحفيز طبيعي للكولاجين'],
      en: ['Small blood sample drawn', 'PRP separation', 'PRP injected into target areas', 'Natural collagen stimulation'],
    },
    importantInfo: {
      ar: ['يحتاج 3-4 جلسات بفاصل شهر', 'احمرار مؤقت لمدة 1-2 يوم', 'تجنب الشمس أسبوع بعد الجلسة', 'النتائج تتحسن تدريجياً على أشهر'],
      en: ['Requires 3-4 sessions spaced monthly', 'Temporary redness for 1-2 days', 'Avoid sun for a week after', 'Results improve gradually over months'],
    },
    faqs: [
      {
        q: { ar: 'هل البلازما آمنة؟', en: 'Is PRP safe?' },
        a: { ar: 'تستخدم دمك الخاص مما يقلل احتمالية أي تفاعلات حساسية، وسيُقيّم الطبيب حالتك قبل العلاج.', en: 'Uses your own blood, which reduces the likelihood of allergic reactions. Your doctor will assess your case before treatment.' },
      },
    ],
  },
  'skin-hair': {
    suitableFor: {
      ar: ['تساقط الشعر', 'ضعف كثافة الشعر', 'حب الشباب وآثاره', 'تصبغات البشرة', 'ملمس بشرة غير متساوٍ'],
      en: ['Hair loss', 'Thinning hair', 'Acne and scarring', 'Skin pigmentation', 'Uneven skin texture'],
    },
    experience: {
      ar: ['تشخيص دقيق للحالة', 'خطة علاج مخصصة', 'علاجات موضعية وحقنية', 'متابعة منتظمة للنتائج'],
      en: ['Accurate diagnosis', 'Customized treatment plan', 'Topical and injectable treatments', 'Regular follow-up for results'],
    },
    importantInfo: {
      ar: ['النتائج تختلف حسب الحالة', 'الالتزام بالخطة العلاجية ضروري', 'قد تحتاج لجلسات متعددة', 'المتابعة الدورية مهمة'],
      en: ['Results vary by condition', 'Treatment plan adherence essential', 'Multiple sessions may be needed', 'Regular follow-up important'],
    },
    faqs: [
      {
        q: { ar: 'كم عدد الجلسات المطلوبة؟', en: 'How many sessions are needed?' },
        a: { ar: 'يعتمد على الحالة، عادة 4-8 جلسات بفواصل محددة.', en: 'Depends on condition, typically 4-8 sessions at specific intervals.' },
      },
    ],
  },
  laser: {
    suitableFor: {
      ar: ['إزالة الشعر', 'تصبغات الشمس والكلف', 'تجديد سطح البشرة', 'ندبات حب الشباب', 'الأوعية الدموية الظاهرة'],
      en: ['Hair removal', 'Sun spots and melasma', 'Skin resurfacing', 'Acne scars', 'Visible blood vessels'],
    },
    experience: {
      ar: ['تحديد نوع الليزر المناسب', 'تجهيز البشرة وحمايتها', 'جلسات سريعة ومريحة', 'تبريد البشرة أثناء العلاج'],
      en: ['Selecting appropriate laser type', 'Skin preparation and protection', 'Quick comfortable sessions', 'Skin cooling during treatment'],
    },
    importantInfo: {
      ar: ['تجنب الشمس قبل وبعد الجلسة', 'قد يحتاج 6-8 جلسات للشعر', 'احمرار مؤقت طبيعي', 'واقي شمس إلزامي'],
      en: ['Avoid sun before and after', 'May need 6-8 sessions for hair', 'Temporary redness is normal', 'Sunscreen mandatory'],
    },
    faqs: [
      {
        q: { ar: 'هل الليزر مؤلم؟', en: 'Is laser painful?' },
        a: { ar: 'نستخدم أنظمة تبريد متقدمة لتقليل الإحساس.', en: 'We use advanced cooling systems to minimize sensation.' },
      },
    ],
  },
  'glow-injection': {
    suitableFor: {
      ar: ['بشرة باهتة ومتعبة', 'جفاف البشرة', 'قبل المناسبات الخاصة', 'علامات الإرهاق', 'فقدان الإشراق'],
      en: ['Dull tired skin', 'Skin dehydration', 'Before special events', 'Signs of fatigue', 'Loss of radiance'],
    },
    experience: {
      ar: ['تنظيف البشرة', 'حقن مغذية بالفيتامينات والمعادن', 'تدليك لطيف للتوزيع', 'إشراقة ملحوظة للبشرة'],
      en: ['Skin cleansing', 'Nutrient injection with vitamins/minerals', 'Gentle massage for distribution', 'Noticeable skin radiance'],
    },
    importantInfo: {
      ar: ['نتائج مرئية تدوم عادة أسابيع', 'لا فترة نقاهة', 'يمكن تكرارها حسب توصية الطبيب', 'تقييم الطبيب يحدد مدى مناسبتها لحالتك'],
      en: ['Visible results typically lasting weeks', 'No downtime', 'Repeatable as recommended by your doctor', 'Your doctor will assess suitability for your case'],
    },
    faqs: [
      {
        q: { ar: 'كم تدوم النتيجة؟', en: 'How long do results last?' },
        a: { ar: 'عادة 2-4 أسابيع، وتتحسن مع الجلسات المنتظمة.', en: 'Typically 2-4 weeks, improving with regular sessions.' },
      },
    ],
  },
  mesotherapy: {
    suitableFor: {
      ar: ['ترهل البشرة', 'خطوط دقيقة', 'جفاف عميق', 'فقدان المرونة', 'بشرة مجهدة'],
      en: ['Skin laxity', 'Fine lines', 'Deep dehydration', 'Loss of elasticity', 'Stressed skin'],
    },
    experience: {
      ar: ['حقن دقيقة متعددة', 'توصيل مغذيات للطبقات العميقة', 'تحفيز الكولاجين والإيلاستين', 'تحسن تدريجي في جودة البشرة'],
      en: ['Multiple micro-injections', 'Delivering nutrients to deep layers', 'Stimulating collagen and elastin', 'Gradual skin quality improvement'],
    },
    importantInfo: {
      ar: ['يحتاج 4-6 جلسات', 'كدمات خفيفة محتملة', 'تجنب المكياج 24 ساعة', 'نتائج تراكمية'],
      en: ['Requires 4-6 sessions', 'Minor bruising possible', 'No makeup for 24 hours', 'Cumulative results'],
    },
    faqs: [
      {
        q: { ar: 'ما الفرق بين الميزوثيرابي والبلازما؟', en: 'Difference between mesotherapy and PRP?' },
        a: { ar: 'الميزوثيرابي يستخدم كوكتيل فيتامينات، البلازما تستخدم دمك الخاص.', en: 'Mesotherapy uses vitamin cocktail, PRP uses your own blood.' },
      },
    ],
  },
  'stem-cells': {
    suitableFor: {
      ar: ['تجديد البشرة العميق', 'ندبات عميقة', 'ترهل شديد', 'تساقط شعر متقدم', 'تلف أنسجة'],
      en: ['Deep skin regeneration', 'Deep scars', 'Severe laxity', 'Advanced hair loss', 'Tissue damage'],
    },
    experience: {
      ar: ['تقييم شامل للحالة', 'تحضير الخلايا الجذعية', 'تطبيق/حقن حسب البروتوكول', 'متابعة طبية دقيقة'],
      en: ['Comprehensive assessment', 'Stem cell preparation', 'Application/injection per protocol', 'Close medical follow-up'],
    },
    importantInfo: {
      ar: ['علاج متقدم يتطلب تقييم طبيب', 'بروتوكول مخصص لكل حالة', 'فترة تعافي قد تطول', 'نتائج طويلة الأمد'],
      en: ['Advanced treatment requiring physician assessment', 'Customized protocol per case', 'Longer recovery possible', 'Long-lasting results'],
    },
    faqs: [
      {
        q: { ar: 'هل الخلايا الجذعية آمنة؟', en: 'Are stem cells safe?' },
        a: { ar: 'تُجرى بعد تقييم طبي شامل وبالبروتوكول المناسب لحالتك.', en: 'Performed after a full medical assessment and using the protocol appropriate to your case.' },
      },
    ],
  },
};

export function ServiceDetailContent({ service, locale }: ServiceDetailContentProps) {
  const t = useTranslations('services');
  const common = useTranslations('common');
  const isRtl = locale === 'ar';
  const details = serviceDetails[service.id] || {
    suitableFor: { ar: [], en: [] },
    experience: { ar: [], en: [] },
    importantInfo: { ar: [], en: [] },
    faqs: [],
  };
  
  const getText = (obj: { ar: string; en: string }) => locale === 'ar' ? obj.ar : obj.en;
  const getArray = (obj: { ar: string[]; en: string[] }) => locale === 'ar' ? obj.ar : obj.en;
  
  return (
    <article className="min-h-screen">
      <header className="bg-gradient-to-b from-cream to-white pt-24 lg:pt-32 pb-12">
        <div className="container-custom">
          <div className="mb-8 flex flex-col items-start gap-4">
            <Link 
              href={`/${locale}/services`} 
              className="inline-flex items-center gap-2 text-sm font-medium text-text/70 hover:text-primary transition-colors"
            >
              <ChevronRight className={cn('w-4 h-4 rotate-180', isRtl && '-rotate-180')} aria-hidden="true" />
              {locale === 'ar' ? 'العودة للخدمات' : 'Back to Services'}
            </Link>
            
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-text/75" role="list">
                <li>
                  <Link href={`/${locale}`} className="hover:text-primary transition-colors">
                    {locale === 'ar' ? 'الرئيسية' : 'Home'}
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className={cn('w-4 h-4', isRtl && '-rotate-180')} aria-hidden="true" />
                  <Link href={`/${locale}/services`} className="hover:text-primary transition-colors">
                    {locale === 'ar' ? 'الخدمات' : 'Services'}
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className={cn('w-4 h-4', isRtl && '-rotate-180')} aria-hidden="true" />
                  <span aria-current="page">{getText(service.name)}</span>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="max-w-3xl mx-auto text-center mt-8">
            <span className="overline">{getText(service.shortDescription)}</span>
            <h1 className="heading-md md:heading-lg mt-3 mb-6 font-bold tracking-tight">
              {getText(service.name)}
            </h1>
            <p className="body-lg text-text/70">
              {getText(service.description)}
            </p>
          </div>
        </div>
      </header>
      
      <section className="section bg-white" aria-labelledby="suitable-for">
        <div className="container-custom">
          <header className="text-center max-w-2xl mx-auto mb-10">
            <h2 id="suitable-for" className="heading-md">
              {locale === 'ar' ? 'مناسب لـ' : 'Suitable For'}
            </h2>
            <p className="body text-text/70 mt-2">
              {locale === 'ar' 
                ? 'هذا العلاج مناسب للحالات التالية'
                : 'This treatment is suitable for the following conditions'
              }
            </p>
          </header>
          
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto" role="list">
            {getArray(details.suitableFor).map((item, index) => (
              <li key={index} className="flex items-start gap-3 p-4 rounded-xl bg-cream/50 hover:bg-cream transition-colors" role="listitem">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="body-sm text-text">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      
      <section className="section bg-cream" aria-labelledby="experience">
        <div className="container-custom">
          <header className="text-center max-w-2xl mx-auto mb-10">
            <h2 id="experience" className="heading-md">
              {locale === 'ar' ? 'ما يتضمنه العلاج' : 'What the Experience Involves'}
            </h2>
            <p className="body text-text/70 mt-2">
              {locale === 'ar' 
                ? 'خطوات الجلسة العلاجية المعتادة'
                : 'Typical treatment session steps'
              }
            </p>
          </header>
          
          <ol className="max-w-3xl mx-auto space-y-6" role="list">
            {getArray(details.experience).map((step, index) => (
              <li key={index} className="flex gap-4" role="listitem">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold flex-shrink-0">
                  {index + 1}
                </span>
                <div className="flex-1 pt-1">
                  <p className="body text-text">{step}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      
      <section className="section bg-white" aria-labelledby="important-info">
        <div className="container-custom">
          <header className="text-center max-w-2xl mx-auto mb-10">
            <h2 id="important-info" className="heading-md flex items-center justify-center gap-2">
              <Info className="w-5 h-5 text-primary" aria-hidden="true" />
              {locale === 'ar' ? 'معلومات هامة' : 'Important Information'}
            </h2>
          </header>
          
          <ul className="max-w-3xl mx-auto space-y-3" role="list">
            {getArray(details.importantInfo).map((item, index) => (
              <li key={index} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-cream/30" role="listitem">
                <AlertCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="body-sm text-text">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      
      <section className="section bg-cream" aria-labelledby="faq">
        <div className="container-custom">
          <header className="text-center max-w-2xl mx-auto mb-10">
            <h2 id="faq" className="heading-md flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" aria-hidden="true" />
              {locale === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h2>
          </header>
          
          <dl className="max-w-3xl mx-auto space-y-4">
            {details.faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-border overflow-hidden">
                <dt className="p-5 font-medium text-text bg-cream/50 border-b border-border">
                  {getText(faq.q)}
                </dt>
                <dd className="p-5 body text-text/80">
                  {getText(faq.a)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      
      <section className="section bg-primary" aria-labelledby="appointment-cta">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 id="appointment-cta" className="heading-md !text-white mb-4">
              {locale === 'ar' ? 'جاهز للبدء؟' : 'Ready to Start?'}
            </h2>
            <p className="body-lg !text-white/90 mb-6">
              {locale === 'ar'
                ? 'احجز استشارتك الآن ودعنا نضع خطة علاجية تناسب احتياجاتك.'
                : 'Book your consultation now and let us create a treatment plan tailored to your needs.'
              }
            </p>
            <Link
              href={`/${locale}/appointment`}
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              {locale === 'ar' ? common('bookAppointmentAr') : common('bookAppointment')}
              <ArrowRight className={cn('w-5 h-5', isRtl && '-rotate-180')} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
