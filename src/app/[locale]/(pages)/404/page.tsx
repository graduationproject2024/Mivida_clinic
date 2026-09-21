'use client';

import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export default function NotFoundPage() {
  const locale = useLocale() as 'ar' | 'en';
  const t = useTranslations('notFound');
  const common = useTranslations('common');
  const isRtl = locale === 'ar';
  
  return (
    <article className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-primary/10 mb-4" aria-hidden="true">404</h1>
        <h2 className="heading-lg text-text mb-4">
          {t('title')}
        </h2>
        <p className="body text-text/70 mb-8">
          {t('message')}
        </p>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 btn-primary"
        >
          <Home className="w-4 h-4" aria-hidden="true" />
          {t('backHome')}
        </Link>
      </div>
    </article>
  );
}