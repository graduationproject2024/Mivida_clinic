export function formatTime(time: string, locale: 'ar' | 'en'): string {
  const [hours, minutes] = time.split(':').map(Number);
  if (Number.isNaN(hours)) return time;
  const date = new Date(2000, 0, 1, hours, minutes || 0, 0, 0);
  const localeId =
    locale === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US';
  return new Intl.DateTimeFormat(localeId, {
    hour: 'numeric',
    minute: '2-digit' in ({} as { minute?: '2-digit' }) ? '2-digit' : ('2-digit' as const),
  }).format(date);
}

export function formatRange(open: string, close: string, locale: 'ar' | 'en'): string {
  return `${formatTime(open, locale)} - ${formatTime(close, locale)}`;
}