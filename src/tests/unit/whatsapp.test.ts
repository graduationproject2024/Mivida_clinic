import { describe, it, expect } from 'vitest';
import { 
  normalizeEgyptianWhatsAppNumber, 
  getWhatsAppUrl, 
  generateAppointmentMessage 
} from '@/lib/whatsapp';

describe('WhatsApp Utilities', () => {
  describe('normalizeEgyptianWhatsAppNumber', () => {
    it('normalizes local format (015...)', () => {
      expect(normalizeEgyptianWhatsAppNumber('01556423361')).toBe('1556423361');
      expect(normalizeEgyptianWhatsAppNumber('01508192424')).toBe('1508192424');
    });
    
    it('normalizes international format (2015...)', () => {
      expect(normalizeEgyptianWhatsAppNumber('201556423361')).toBe('1556423361');
      expect(normalizeEgyptianWhatsAppNumber('201508192424')).toBe('1508192424');
    });
    
    it('normalizes with +20 prefix', () => {
      expect(normalizeEgyptianWhatsAppNumber('+201556423361')).toBe('1556423361');
    });
    
    it('normalizes with 0020 prefix', () => {
      expect(normalizeEgyptianWhatsAppNumber('00201556423361')).toBe('1556423361');
    });
    
    it('handles spaces and special characters', () => {
      expect(normalizeEgyptianWhatsAppNumber('0155 642 3361')).toBe('1556423361');
      expect(normalizeEgyptianWhatsAppNumber('+20 155 642 3361')).toBe('1556423361');
    });
  });
  
  describe('getWhatsAppUrl', () => {
    it('generates correct WhatsApp URL', () => {
      const url = getWhatsAppUrl('01556423361', 'Hello World');
      expect(url).toBe('https://wa.me/201556423361?text=Hello%20World');
    });
    
    it('encodes special characters in message', () => {
      const url = getWhatsAppUrl('01556423361', 'Hello\nWorld & test');
      expect(url).toContain('Hello%0AWorld%20%26%20test');
    });
    
    it('works with different number formats', () => {
      const url1 = getWhatsAppUrl('01556423361', 'test');
      const url2 = getWhatsAppUrl('201556423361', 'test');
      const url3 = getWhatsAppUrl('+201556423361', 'test');
      
      expect(url1).toBe(url2);
      expect(url2).toBe(url3);
    });
  });
  
  describe('generateAppointmentMessage', () => {
    const formData = {
      name: 'Ahmed Ali',
      phone: '01556423361',
      service: 'Filler',
      day: 'Saturday',
      time: '14:00',
      notes: 'First time patient',
      locale: 'ar' as const,
    };
    
    it('generates Arabic message with correct format', () => {
      const message = generateAppointmentMessage(formData);
      
      expect(message).toContain('مرحباً عيادة Mivida');
      expect(message).toContain('أرغب في طلب موعد');
      expect(message).toContain('الاسم: Ahmed Ali');
      expect(message).toContain('رقم الهاتف: 01556423361');
      expect(message).toContain('الخدمة: Filler');
      expect(message).toContain('اليوم المفضل: Saturday');
      expect(message).toContain('الوقت المفضل: 14:00');
      expect(message).toContain('ملاحظات: First time patient');
      expect(message).toContain('أعلم أن الموعد يُعد طلباً');
    });
    
    it('generates English message with correct format', () => {
      const message = generateAppointmentMessage({ ...formData, locale: 'en' });
      
      expect(message).toContain('Hello Mivida Clinic');
      expect(message).toContain('I would like to request an appointment');
      expect(message).toContain('Name: Ahmed Ali');
      expect(message).toContain('Phone: 01556423361');
      expect(message).toContain('Service: Filler');
      expect(message).toContain('Preferred day: Saturday');
      expect(message).toContain('Preferred time: 14:00');
      expect(message).toContain('Notes: First time patient');
      expect(message).toContain('I understand that this is an appointment request');
    });
    
    it('handles empty notes', () => {
      const message = generateAppointmentMessage({ ...formData, notes: '' });
      expect(message).toContain('ملاحظات: لا يوجد');
      
      const messageEn = generateAppointmentMessage({ ...formData, notes: '', locale: 'en' });
      expect(messageEn).toContain('Notes: None');
    });
  });
});