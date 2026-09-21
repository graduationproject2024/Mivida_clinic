import { describe, it, expect } from 'vitest';
import { 
  appointmentSchema, 
  isValidWorkingDay, 
  getWorkingHours, 
  isTimeWithinWorkingHours, 
  getAvailableTimeSlots,
  getDayLabel 
} from '@/lib/validation';

describe('Validation Utilities', () => {
  describe('appointmentSchema', () => {
    it('validates correct form data', () => {
      const validData = {
        name: 'John Doe',
        phone: '01556423361',
        service: 'filler',
        day: 'Saturday',
        time: '14:00',
        notes: 'Test notes',
      };
      
      const result = appointmentSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
    
    it('rejects invalid phone numbers', () => {
      const invalidData = {
        name: 'John Doe',
        phone: '123456',
        service: 'filler',
        day: 'Saturday',
        time: '14:00',
      };
      
      const result = appointmentSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('phone');
      }
    });
    
    it('rejects empty required fields', () => {
      const invalidData = {
        name: '',
        phone: '',
        service: '',
        day: '',
        time: '',
      };
      
      const result = appointmentSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
    
    it('accepts valid Egyptian phone format', () => {
      const validPhones = ['01556423361', '01012345678', '01112345678', '01212345678'];
      
      for (const phone of validPhones) {
        const data = {
          name: 'Test User',
          phone,
          service: 'filler',
          day: 'Saturday',
          time: '14:00',
        };
        const result = appointmentSchema.safeParse(data);
        expect(result.success).toBe(true);
      }
    });
  });
  
  describe('isValidWorkingDay', () => {
    it('returns true for valid working days', () => {
      expect(isValidWorkingDay('Saturday')).toBe(true);
      expect(isValidWorkingDay('Sunday')).toBe(true);
      expect(isValidWorkingDay('Wednesday')).toBe(true);
    });
    
    it('returns false for closed days', () => {
      expect(isValidWorkingDay('Monday')).toBe(false);
      expect(isValidWorkingDay('Tuesday')).toBe(false);
      expect(isValidWorkingDay('Thursday')).toBe(false);
      expect(isValidWorkingDay('Friday')).toBe(false);
    });
  });
  
  describe('getWorkingHours', () => {
    it('returns hours for working days', () => {
      const saturday = getWorkingHours('Saturday');
      expect(saturday).toEqual({ open: '13:00', close: '20:00' });
      
      const sunday = getWorkingHours('Sunday');
      expect(sunday).toEqual({ open: '10:00', close: '16:00' });
    });
    
    it('returns null for closed days', () => {
      expect(getWorkingHours('Monday')).toBeNull();
      expect(getWorkingHours('Friday')).toBeNull();
    });
  });
  
  describe('isTimeWithinWorkingHours', () => {
    it('returns true for times within working hours', () => {
      expect(isTimeWithinWorkingHours('Saturday', '14:00')).toBe(true);
      expect(isTimeWithinWorkingHours('Saturday', '13:00')).toBe(true);
      expect(isTimeWithinWorkingHours('Saturday', '20:00')).toBe(true);
      expect(isTimeWithinWorkingHours('Sunday', '10:00')).toBe(true);
      expect(isTimeWithinWorkingHours('Sunday', '16:00')).toBe(true);
    });
    
    it('returns false for times outside working hours', () => {
      expect(isTimeWithinWorkingHours('Saturday', '12:00')).toBe(false);
      expect(isTimeWithinWorkingHours('Saturday', '21:00')).toBe(false);
      expect(isTimeWithinWorkingHours('Sunday', '09:00')).toBe(false);
      expect(isTimeWithinWorkingHours('Sunday', '17:00')).toBe(false);
    });
    
    it('returns false for closed days', () => {
      expect(isTimeWithinWorkingHours('Monday', '14:00')).toBe(false);
    });
  });
  
  describe('getAvailableTimeSlots', () => {
    it('returns 30-minute slots for Saturday', () => {
      const slots = getAvailableTimeSlots('Saturday');
      expect(slots.length).toBeGreaterThan(0);
      expect(slots[0]).toBe('13:00');
      expect(slots[slots.length - 1]).toBe('20:00');
      expect(slots[1]).toBe('13:30');
    });
    
    it('returns 30-minute slots for Sunday', () => {
      const slots = getAvailableTimeSlots('Sunday');
      expect(slots[0]).toBe('10:00');
      expect(slots[slots.length - 1]).toBe('16:00');
    });
    
    it('returns empty array for closed days', () => {
      expect(getAvailableTimeSlots('Monday')).toEqual([]);
    });
  });
  
  describe('getDayLabel', () => {
    it('returns Arabic label for Arabic locale', () => {
      expect(getDayLabel('Saturday', 'ar')).toBe('السبت');
      expect(getDayLabel('Sunday', 'ar')).toBe('الأحد');
      expect(getDayLabel('Wednesday', 'ar')).toBe('الأربعاء');
    });
    
    it('returns English label for English locale', () => {
      expect(getDayLabel('Saturday', 'en')).toBe('Saturday');
      expect(getDayLabel('Sunday', 'en')).toBe('Sunday');
    });
  });
});