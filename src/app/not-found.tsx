'use client';

import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <article className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-primary/10 mb-4" aria-hidden="true">404</h1>
        <h2 className="heading-lg text-text mb-4">
          Page Not Found / الصفحة غير موجودة
        </h2>
        <p className="body text-text/70 mb-8">
          The page you are looking for does not exist.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/en"
            className="inline-flex items-center gap-2 btn-primary"
          >
            English Home
          </Link>
          <Link
            href="/ar"
            className="inline-flex items-center gap-2 btn-secondary"
          >
            الرئيسية
          </Link>
        </div>
      </div>
    </article>
  );
}
