'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export default function NotFoundPage() {
  const t = useTranslations('notFound');
  const locale = useLocale();

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
        <div className="flex gap-4 justify-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 btn-primary"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            {t('backHome')}
          </Link>
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 btn-secondary"
          >
            {locale === 'ar' ? 'خدماتنا' : 'Services'}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 btn-secondary"
          >
            {locale === 'ar' ? 'تواصل معنا' : 'Contact'}
          </Link>
        </div>
      </div>
    </article>
  );
}
