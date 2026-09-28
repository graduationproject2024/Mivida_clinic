'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const caseImages = [
  '/images/before-after/case-1.jpg',
  '/images/before-after/case-2.jpg',
  '/images/before-after/case-3.jpg',
  '/images/before-after/case-4.jpg',
  '/images/before-after/case-5.jpg',
  '/images/before-after/482071711_618446461181517_6856901480955110058_n.jpg',
  '/images/before-after/482239011_621791984180298_7535772327162613869_n.jpg',
  '/images/before-after/482343915_617901074569389_6428678620370820683_n.jpg',
  '/images/before-after/554101806_777013235324838_4203895029892298153_n.jpg',
  '/images/before-after/605824237_853246657701495_540184883368914623_n.jpg',
  '/images/before-after/606539070_854011997624961_2152647033265042487_n.jpg',
  '/images/before-after/667300334_938268739199286_8786036323224670968_n.jpg',
];

interface BeforeAfterContentProps {
  locale: 'ar' | 'en';
}

export function BeforeAfterContent({ locale }: BeforeAfterContentProps) {
  const t = useTranslations('beforeAfter');
  const tc = useTranslations('common');
  const isRtl = locale === 'ar';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const getCaseLabel = (index: number) => `${locale === 'ar' ? 'حالة' : 'Case'} ${index + 1}`;

  useEffect(() => {
    if (isModalOpen) {
      dialogRef.current?.focus();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isModalOpen]);

  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isModalOpen) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setModalIndex(prev => (prev === 0 ? caseImages.length - 1 : prev - 1));
      prevBtnRef.current?.focus();
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setModalIndex(prev => (prev === caseImages.length - 1 ? 0 : prev + 1));
      nextBtnRef.current?.focus();
    }
  };

  const modalCase = caseImages[modalIndex];

  return (
    <>
      <article className="min-h-screen">
        {/* Hero - editorial style matching homepage */}
        <header className="relative bg-neutral-warm pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-center bg-cover opacity-[0.03]" aria-hidden="true" />
          <div className="absolute top-0 end-0 w-1/3 h-full bg-cream hidden lg:block" aria-hidden="true" />
          
          <div className="container-custom relative z-10">
            <nav className="mb-10" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-text/60" role="list">
                <li>
                  <a href={`/${locale}`} className="hover:text-primary transition-colors">
                    {locale === 'ar' ? 'الرئيسية' : 'Home'}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className={cn('w-4 h-4', isRtl && '-rotate-180')} aria-hidden="true" />
                  <span className="text-primary font-medium" aria-current="page">{t('title')}</span>
                </li>
              </ol>
            </nav>
            
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-4">
                <div className="w-12 h-px bg-gold" aria-hidden="true" />
                <span className="text-overline text-primary font-medium tracking-widest uppercase">
                  {t('subtitle')}
                </span>
              </div>
              <h1 id="before-after-heading" className="text-display sm:text-display max-w-2xl text-balance font-bold text-primary-deep mb-6">
                {t('title')}
              </h1>
              <p className="text-body-lg text-text/80 max-w-lg" id="before-after-disclaimer">
                {t('disclaimer')}
              </p>
            </div>
          </div>
        </header>

        {/* Gallery */}
        <section className="section bg-white" aria-labelledby="before-after-heading">
          <div className="container-custom">
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6" role="list">
              {caseImages.map((src, index) => (
                <li key={src}>
                  <button
                    type="button"
                    onClick={() => openModal(index)}
                    className="group relative block w-full aspect-square rounded-2xl overflow-hidden bg-cream border border-border hover:border-primary/20 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label={getCaseLabel(index)}
                    aria-haspopup="dialog"
                  >
                    <Image
                      src={src}
                      alt={getCaseLabel(index)}
                      fill
                      priority={index < 2}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                    <span className="absolute top-3 start-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary">
                      {locale === 'ar' ? 'قبل وبعد' : 'Before & After'}
                    </span>
                    <span className="absolute inset-0 flex items-end justify-center pb-4 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-5 h-5 text-white" aria-hidden="true" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => openModal(0)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border border-primary text-primary bg-transparent hover:bg-primary hover:text-white transition-all duration-200 active:scale-[0.98]"
              >
                <ZoomIn className="w-4 h-4" aria-hidden="true" />
                {locale === 'ar' ? 'عرض بالحجم الكامل' : 'View Fullscreen'}
              </button>
            </div>
          </div>
        </section>

        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-fade-in"
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={t('title')}
            onKeyDown={handleKeyDown}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 end-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={locale === 'ar' ? 'إغلاق' : 'Close'}
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setModalIndex(prev => (prev === 0 ? caseImages.length - 1 : prev - 1))}
              className={cn(
                'absolute start-4 top-1/2 -translate-y-1/2 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
                isRtl && 'rotate-180'
              )}
              aria-label={tc('previous')}
              ref={prevBtnRef}
            >
              <ChevronLeft className="w-7 h-7" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setModalIndex(prev => (prev === caseImages.length - 1 ? 0 : prev + 1))}
              className={cn(
                'absolute end-4 top-1/2 -translate-y-1/2 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
                isRtl && 'rotate-180'
              )}
              aria-label={tc('next')}
              ref={nextBtnRef}
            >
              <ChevronRight className="w-7 h-7" aria-hidden="true" />
            </button>

            <div className="relative w-full max-w-4xl">
              <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-text/10">
                <Image
                  src={modalCase}
                  alt={getCaseLabel(modalIndex)}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-sm font-semibold text-primary">
                  {locale === 'ar' ? 'قبل وبعد' : 'Before & After'}
                </span>
                <span className="px-3 py-2 rounded-full bg-white/20 text-white text-sm font-medium" aria-hidden="true">
                  {modalIndex + 1} / {caseImages.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </article>
    </>
  );
}
