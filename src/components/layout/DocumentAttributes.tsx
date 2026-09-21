'use client';

import { useEffect } from 'react';

interface DocumentAttributesProps {
  locale: 'ar' | 'en';
}

export function DocumentAttributes({ locale }: DocumentAttributesProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  return null;
}