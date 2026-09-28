import { z } from 'zod';
import { clinic } from '../content/clinic';

export interface AppointmentFormMessages {
  nameTooShort: string;
  phoneInvalid: string;
  serviceRequired: string;
  dayRequired: string;
  timeRequired: string;
  notesTooLong: string;
}

export function createAppointmentSchema(m: AppointmentFormMessages) {
  return z.object({
    name: z.string().min(2, { message: m.nameTooShort }).max(100),
    phone: z.preprocess(
      (val) => typeof val === 'string' ? val.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString()) : val,
      z.string()
        .min(10, { message: m.phoneInvalid })
        .max(15)
        .regex(/^01[0-9]{9}$/, { message: m.phoneInvalid })
    ),
    service: z.string().min(1, { message: m.serviceRequired }),
    day: z.string().min(1, { message: m.dayRequired }),
    time: z.string().min(1, { message: m.timeRequired }),
    notes: z.string().max(500, { message: m.notesTooLong }).optional(),
  });
}

export const appointmentSchema = createAppointmentSchema({
  nameTooShort: 'Name must be at least 2 characters',
  phoneInvalid: 'Please enter a valid Egyptian mobile number (01XXXXXXXXX)',
  serviceRequired: 'Please select a service',
  dayRequired: 'Please select a day',
  timeRequired: 'Please select a time',
  notesTooLong: 'Notes must be 500 characters or less',
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

export function isValidWorkingDay(day: string): boolean {
  return clinic.availableDays.includes(day);
}

export function getWorkingHours(day: string): { open: string; close: string } | null {
  const dayData = clinic.workingHours.find(d => d.day === day);
  if (!dayData || dayData.isClosed) return null;
  return { open: dayData.open, close: dayData.close };
}

export function isTimeWithinWorkingHours(day: string, time: string): boolean {
  const hours = getWorkingHours(day);
  if (!hours) return false;
  
  const [selectedHour, selectedMinute] = time.split(':').map(Number);
  const [openHour, openMinute] = hours.open.split(':').map(Number);
  const [closeHour, closeMinute] = hours.close.split(':').map(Number);
  
  const selectedMinutes = selectedHour * 60 + selectedMinute;
  const openMinutes = openHour * 60 + openMinute;
  const closeMinutes = closeHour * 60 + closeMinute;
  
  return selectedMinutes >= openMinutes && selectedMinutes <= closeMinutes;
}

export function getAvailableTimeSlots(day: string): string[] {
  const hours = getWorkingHours(day);
  if (!hours) return [];
  
  const slots: string[] = [];
  const [openHour, openMinute] = hours.open.split(':').map(Number);
  const [closeHour, closeMinute] = hours.close.split(':').map(Number);
  
  let currentHour = openHour;
  let currentMinute = openMinute;
  
  while (currentHour < closeHour || (currentHour === closeHour && currentMinute <= closeMinute)) {
    const formatted = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
    slots.push(formatted);
    
    currentMinute += 30;
    if (currentMinute >= 60) {
      currentMinute = 0;
      currentHour += 1;
    }
  }
  
  return slots;
}

export function getDayLabel(day: string, locale: 'ar' | 'en'): string {
  const dayData = clinic.workingHours.find(d => d.day === day);
  if (!dayData) return day;
  return locale === 'ar' ? dayData.ar : dayData.day;
}