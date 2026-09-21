export function normalizeEgyptianWhatsAppNumber(input: string): string {
  const digits = input.replace(/\D/g, '');
  
  if (digits.startsWith('0020')) {
    return digits.slice(4);
  }
  
  if (digits.startsWith('20')) {
    return digits.slice(2);
  }
  
  if (digits.startsWith('0')) {
    return digits.slice(1);
  }
  
  return digits;
}

export function getWhatsAppUrl(phoneNumber: string, message: string): string {
  const normalized = normalizeEgyptianWhatsAppNumber(phoneNumber);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/20${normalized}?text=${encodedMessage}`;
}

export function generateAppointmentMessage(data: {
  name: string;
  phone: string;
  service: string;
  day: string;
  time: string;
  notes: string;
  locale: 'ar' | 'en';
}): string {
  const { name, phone, service, day, time, notes, locale } = data;
  
  if (locale === 'ar') {
    return `مرحباً عيادة Mivida،
أرغب في طلب موعد.

الاسم: ${name}
رقم الهاتف: ${phone}
الخدمة: ${service}
اليوم المفضل: ${day}
الوقت المفضل: ${time}
ملاحظات: ${notes || 'لا يوجد'}

أعلم أن الموعد يُعد طلباً وسيتم تأكيده من خلال العيادة عبر واتساب.`;
  }
  
  return `Hello Mivida Clinic,
I would like to request an appointment.

Name: ${name}
Phone: ${phone}
Service: ${service}
Preferred day: ${day}
Preferred time: ${time}
Notes: ${notes || 'None'}

I understand that this is an appointment request and the clinic will confirm the appointment through WhatsApp.`;
}