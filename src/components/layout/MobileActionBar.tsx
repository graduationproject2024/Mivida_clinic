'use client';

import { useState, useEffect } from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { clinic } from '../../content/clinic';
import { normalizeEgyptianWhatsAppNumber, getWhatsAppUrl } from '@/lib/whatsapp';
import { useTranslations } from 'next-intl';

interface MobileActionBarProps {
  locale: 'ar' | 'en';
  messages: Record<string, unknown>;
}

export function MobileActionBar({ locale, messages }: MobileActionBarProps) {
  const t = useTranslations('common');
  const [showWhatsAppOptions, setShowWhatsAppOptions] = useState(false);

  useEffect(() => {
    if (!showWhatsAppOptions) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowWhatsAppOptions(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [showWhatsAppOptions]);
  
  const handleCall = () => {
    window.location.href = `tel:${clinic.phone}`;
  };
  
  const handleWhatsApp = (number: string) => {
    const message = locale === 'ar'
      ? 'مرحباً عيادة Mivida، أرغب في الاستفسار عن خدماتكم.'
      : 'Hello Mivida Clinic, I would like to inquire about your services.';
    const url = getWhatsAppUrl(number, message);
    window.open(url, '_blank');
    setShowWhatsAppOptions(false);
  };
  
  const handleAppointment = () => {
    window.location.href = `/${locale}/appointment`;
  };
  
  const whatsappNumbers = clinic.whatsappNumbers.map(num => ({
    display: formatPhoneNumber(num),
    normalized: normalizeEgyptianWhatsAppNumber(num),
  }));

  return (
    <>
      {showWhatsAppOptions && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={() => setShowWhatsAppOptions(false)}
          aria-hidden="true"
        />
      )}
      
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe',
          showWhatsAppOptions ? 'pb-48' : 'pb-0'
        )}
        role="navigation"
        aria-label={locale === 'ar' ? 'إجراءات سريعة' : 'Quick actions'}
      >
        <div className="container-custom">
          <div className="grid grid-cols-3 gap-2 px-4 py-3">
            <button
              type="button"
              onClick={handleCall}
              className={cn(
                'flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl bg-white border border-border',
                'shadow-lg transition-all duration-200 active:scale-[0.98]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
              )}
              aria-label={locale === 'ar' ? 'اتصال بالعيادة' : 'Call clinic'}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Phone className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-xs font-medium text-text">{locale === 'ar' ? 'اتصال' : 'Call'}</span>
            </button>
            
            <button
              type="button"
              onClick={() => setShowWhatsAppOptions(!showWhatsAppOptions)}
              className={cn(
                'flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl bg-white border border-border',
                'shadow-lg transition-all duration-200 active:scale-[0.98]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
              )}
              aria-label={locale === 'ar' ? 'واتساب' : 'WhatsApp'}
              aria-expanded={showWhatsAppOptions}
              aria-haspopup="true"
              aria-controls={showWhatsAppOptions ? 'whatsapp-options' : undefined}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">
                <MessageSquare className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-xs font-medium text-text">{locale === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
            </button>
            
            <button
              type="button"
              onClick={handleAppointment}
              className={cn(
                'flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl bg-primary text-white',
                'shadow-lg transition-all duration-200 active:scale-[0.98]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
              )}
              aria-label={locale === 'ar' ? 'احجز موعد' : 'Book Appointment'}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <Calendar className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-xs font-medium">{locale === 'ar' ? 'احجز موعد' : 'Book'}</span>
            </button>
          </div>
          
          {showWhatsAppOptions && (
            <div
              id="whatsapp-options"
              className="absolute bottom-full left-4 right-4 mb-2 animate-slide-up"
              role="group"
              aria-label={locale === 'ar' ? 'اختر رقم واتساب' : 'Choose WhatsApp number'}
            >
              <div className="bg-white rounded-xl border border-border shadow-lg p-2">
                <p className="px-3 py-2 text-sm font-medium text-text-muted border-b border-border">
                  {locale === 'ar' ? 'اختر رقم واتساب للتواصل' : 'Choose WhatsApp number'}
                </p>
                <div className="divide-y divide-border">
                  {whatsappNumbers.map((num) => (
                    <button
                      key={num.normalized}
                      type="button"
                      onClick={() => handleWhatsApp(num.normalized)}
                      className="w-full px-3 py-3 text-start text-sm text-text hover:bg-primary/5 transition-colors flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                    >
                      <span>{num.display}</span>
                      <MessageSquare className="w-4 h-4 text-green-600" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('01')) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  return phone;
}
