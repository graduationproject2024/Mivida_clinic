'use client';

import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { services } from '../../content/services';
import { clinic } from '../../content/clinic';
import { formatRange, formatTime } from '@/lib/time';
import { createAppointmentSchema, getAvailableTimeSlots, isValidWorkingDay, getDayLabel, type AppointmentFormData } from '@/lib/validation';
import { generateAppointmentMessage, getWhatsAppUrl, normalizeEgyptianWhatsAppNumber } from '@/lib/whatsapp';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Input';

interface AppointmentFormProps {
  locale: 'ar' | 'en';
}

const whatsappNumbers = clinic.whatsappNumbers.map(num => ({
  normalized: normalizeEgyptianWhatsAppNumber(num),
  display: num.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3'),
}));

export function AppointmentForm({ locale }: AppointmentFormProps) {
  const t = useTranslations('appointment');
  const isRtl = locale === 'ar';
  const [step, setStep] = useState<'form' | 'whatsapp' | 'confirmation'>('form');
  const [selectedWhatsApp, setSelectedWhatsApp] = useState<string | null>(null);
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  
  const resolver = useMemo(() => zodResolver(createAppointmentSchema({
    nameTooShort: t('form.errors.nameTooShort'),
    phoneInvalid: t('form.errors.phoneInvalid'),
    serviceRequired: t('form.errors.serviceRequired'),
    dayRequired: t('form.errors.dayRequired'),
    timeRequired: t('form.errors.timeRequired'),
    notesTooLong: t('form.errors.notesTooLong'),
  })), [t]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm<AppointmentFormData>({
    resolver,
    mode: 'onChange',
  });
  
  const selectedDay = watch('day');
  
  useEffect(() => {
    if (selectedDay && isValidWorkingDay(selectedDay)) {
      setTimeSlots(getAvailableTimeSlots(selectedDay));
    } else {
      setTimeSlots([]);
    }
    setValue('time', '');
  }, [selectedDay, setValue]);
  
  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    
    const message = generateAppointmentMessage({
      name: data.name,
      phone: data.phone,
      service: locale === 'ar' 
        ? services.find(s => s.id === data.service)?.name.ar || data.service
        : services.find(s => s.id === data.service)?.name.en || data.service,
      day: getDayLabel(data.day, locale),
      time: data.time,
      notes: data.notes || '',
      locale,
    });
    
    setGeneratedMessage(message);
    setStep('whatsapp');
    setIsSubmitting(false);
  };
  
  const handleWhatsAppSelect = (number: string) => {
    setSelectedWhatsApp(number);
    const url = getWhatsAppUrl(number, generatedMessage);
    window.open(url, '_blank');
    setStep('confirmation');
  };
  
  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(generatedMessage);
      alert(locale === 'ar' ? 'تم نسخ الرسالة' : 'Message copied');
    } catch {
      alert(locale === 'ar' ? 'فشل النسخ' : 'Copy failed');
    }
  };
  
  const resetForm = () => {
    reset();
    setStep('form');
    setSelectedWhatsApp(null);
    setGeneratedMessage('');
  };
  
  const serviceOptions = services.map(s => ({
    value: s.id,
    label: locale === 'ar' ? s.name.ar : s.name.en,
  }));
  
  const dayOptions = clinic.workingHours
    .filter(d => !d.isClosed)
    .map(d => ({
      value: d.day,
      label: locale === 'ar' ? `${d.ar} (${formatRange(d.open, d.close, 'ar')})` : `${d.day} (${formatRange(d.open, d.close, 'en')})`,
    }));
  
  return (
    <article className="min-h-screen">
      <nav className="container-custom py-4" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-text/75" role="list">
          <li>
            <a href={`/${locale}`} className="hover:text-primary transition-colors">
              {locale === 'ar' ? 'الرئيسية' : 'Home'}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <ChevronRight className={cn('w-4 h-4', isRtl && '-rotate-180')} aria-hidden="true" />
            <span aria-current="page">{t('title')}</span>
          </li>
        </ol>
      </nav>
      
      <section className="section bg-white" aria-labelledby="appointment-heading">
        <div className="container-custom">
          <header className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
            <h1 id="appointment-heading" className="heading-md md:heading-lg mb-4 font-bold tracking-tight">
              {t('title')}
            </h1>
            <p className="body-lg text-text/70">
              {t('subtitle')}
            </p>
          </header>
          
          {step === 'form' && (
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto" noValidate>
              <div className="space-y-6" role="group" aria-labelledby="appointment-heading">
                <Input
                  {...register('name')}
                  label={t('form.name')}
                  placeholder={t('form.namePlaceholder')}
                  error={errors.name?.message}
                  required
                  autoComplete="name"
                />
                
                <Input
                  {...register('phone')}
                  label={t('form.phone')}
                  placeholder={t('form.phonePlaceholder')}
                  error={errors.phone?.message}
                  required
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                />
                
                <Select
                  {...register('service')}
                  label={t('form.service')}
                  placeholder={t('form.servicePlaceholder')}
                  error={errors.service?.message}
                  options={serviceOptions}
                  required
                />
                
                <Select
                  {...register('day')}
                  label={t('form.day')}
                  placeholder={t('form.dayPlaceholder')}
                  error={errors.day?.message}
                  options={dayOptions}
                  required
                />
                
                <Select
                  {...register('time')}
                  label={t('form.time')}
                  placeholder={t('form.timePlaceholder')}
                  error={errors.time?.message}
                  options={timeSlots.map(t => ({ value: t, label: formatTime(t, locale) }))}
                  required
                  disabled={timeSlots.length === 0}
                />
                
                {timeSlots.length === 0 && selectedDay && (
                  <p className="text-sm text-error" role="alert">
                    {locale === 'ar' 
                      ? 'هذا اليوم غير متاح للحجز'
                      : 'This day is not available for booking'
                    }
                  </p>
                )}
                
                <Textarea
                  {...register('notes')}
                  label={t('form.notes')}
                  placeholder={t('form.notesPlaceholder')}
                  error={errors.notes?.message}
                  rows={3}
                />
                
                <p className="text-sm text-text/75 flex items-start gap-2" role="note">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-gold" aria-hidden="true" />
                  <span>{t('form.disclaimer')}</span>
                </p>
                
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  loading={isSubmitting}
                  disabled={!isValid || timeSlots.length === 0}
                >
                  {t('form.submit')}
                  <MessageSquare className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>
            </form>
          )}
          
          {step === 'whatsapp' && (
            <div className="max-w-2xl mx-auto space-y-6" role="group" aria-labelledby="whatsapp-heading">
              <div className="text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                  <CheckCircle className="w-8 h-8" aria-hidden="true" />
                </div>
                <h2 id="whatsapp-heading" className="heading-md text-text mb-2">
                  {t('form.whatsappSelect')}
                </h2>
                <p className="body text-text/70">
                  {locale === 'ar'
                    ? 'اختر رقم واتساب لإرسال طلب الموعد'
                    : 'Choose a WhatsApp number to send your appointment request'
                  }
                </p>
              </div>
              
              <div className="space-y-3" role="listbox" aria-label={t('form.whatsappSelect')}>
                {whatsappNumbers.map((num) => (
                  <button
                    key={num.normalized}
                    type="button"
                    role="option"
                    aria-selected={false}
                    onClick={() => handleWhatsAppSelect(num.normalized)}
                    className={cn(
                      'w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all',
                      'bg-white border-border hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                        <MessageSquare className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-medium text-text">WhatsApp</p>
                        <p className="text-sm text-text-muted font-mono">{num.display}</p>
                      </div>
                    </div>
                    <ChevronRight className={cn('w-5 h-5 text-text/40', isRtl && '-rotate-180')} aria-hidden="true" />
                  </button>
                ))}
              </div>
              
              <button
                type="button"
                onClick={() => setStep('form')}
                className="btn-ghost w-full"
              >
                {locale === 'ar' ? 'العودة للتعديل' : 'Back to Edit'}
              </button>
            </div>
          )}
          
          {step === 'confirmation' && (
            <div className="max-w-2xl mx-auto text-center space-y-6" role="group" aria-labelledby="confirmation-heading">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mx-auto mb-2">
                <CheckCircle className="w-8 h-8" aria-hidden="true" />
              </div>
              <h2 id="confirmation-heading" className="heading-md text-text">
                {t('confirmation.title')}
              </h2>
              <p className="body text-text/70">
                {t('confirmation.message')}
              </p>
              
              <div className="p-4 rounded-xl bg-cream border border-border text-start">
                <p className="font-mono text-sm text-text/80 whitespace-pre-wrap">{generatedMessage}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={copyMessage}
                  className="flex-1 sm:flex-none"
                >
                  <MessageSquare className="w-4 h-4" aria-hidden="true" />
                  {t('confirmation.copyMessage')}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={resetForm}
                  className="flex-1 sm:flex-none"
                >
                  {t('confirmation.backHome')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
