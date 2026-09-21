import { test, expect } from '@playwright/test';
import { gotoHydrated } from './helpers';

test.describe('Appointment Flow', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHydrated(page, '/ar/appointment');
  });

  test('loads appointment page', async ({ page }) => {
    await expect(page).toHaveTitle(/احجز موعدك/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('احجز موعدك');
    await expect(page.getByText('هذا طلب موعد')).toBeVisible();
  });

  test('shows validation errors for invalid input', async ({ page }) => {
    await page.locator('input[name="name"]').fill('أ');
    await expect(page.getByText('الاسم يجب أن يكون حرفين على الأقل', { exact: true })).toBeVisible();

    await page.locator('input[name="phone"]').fill('123');
    await expect(page.getByText('يرجى إدخال رقم موبايل مصري صحيح (01XXXXXXXXX)', { exact: true })).toBeVisible();
  });

  test('submit button is disabled until form is valid', async ({ page }) => {
    const submit = page.getByRole('button', { name: 'إرسال إلى واتساب' });
    await expect(submit).toBeDisabled();

    await page.locator('input[name="name"]').fill('أحمد علي');
    await page.locator('input[name="phone"]').fill('01556423361');
    await page.selectOption('select[name="service"]', 'filler');
    await page.selectOption('select[name="day"]', 'Saturday');
    await page.selectOption('select[name="time"]', '14:00');

    await expect(submit).toBeEnabled();
  });

  test('fills form and navigates to WhatsApp selection', async ({ page }) => {
    await page.locator('input[name="name"]').fill('أحمد علي');
    await page.locator('input[name="phone"]').fill('01556423361');
    await page.selectOption('select[name="service"]', 'filler');
    await page.selectOption('select[name="day"]', 'Saturday');
    await page.selectOption('select[name="time"]', '14:00');
    await page.locator('textarea[name="notes"]').fill('أول زيارة');

    await page.getByRole('button', { name: 'إرسال إلى واتساب' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'اختر رقم واتساب' })).toBeVisible();
    await expect(page.getByText('0155 642 3361', { exact: true })).toBeVisible();
    await expect(page.getByText('0150 819 2424', { exact: true })).toBeVisible();
  });

  test('day select only offers working days', async ({ page }) => {
    const enabledDays = page.locator('select[name="day"] option:not(:disabled)');
    await expect(enabledDays).toHaveCount(3);
    await expect(enabledDays).toHaveText(['السبت (1:00 م - 8:00 م)', 'الأحد (10:00 ص - 4:00 م)', 'الأربعاء (1:00 م - 8:00 م)']);
  });

  test('time slots update based on selected day', async ({ page }) => {
    await page.selectOption('select[name="day"]', 'Saturday');
    await expect(page.locator('select[name="time"] option')).toHaveCount(16); // 13:00 to 20:00 half-hourly + placeholder

    await page.selectOption('select[name="day"]', 'Sunday');
    await expect(page.locator('select[name="time"] option')).toHaveCount(14); // 10:00 to 16:00 half-hourly + placeholder
  });
});

test.describe('Appointment Flow - English', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHydrated(page, '/en/appointment');
  });

  test('loads appointment page in English', async ({ page }) => {
    await expect(page).toHaveTitle(/Book Appointment/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Book Appointment');
    await expect(page.getByText('This is an appointment request')).toBeVisible();
  });

  test('shows English validation errors', async ({ page }) => {
    await page.locator('input[name="name"]').fill('أ');
    await expect(page.getByText('Name must be at least 2 characters', { exact: true })).toBeVisible();

    await page.locator('input[name="phone"]').fill('123');
    await expect(page.getByText('Please enter a valid Egyptian mobile number (01XXXXXXXXX)', { exact: true })).toBeVisible();
  });

  test('fills form in English', async ({ page }) => {
    await page.locator('input[name="name"]').fill('John Doe');
    await page.locator('input[name="phone"]').fill('01556423361');
    await page.selectOption('select[name="service"]', 'filler');
    await page.selectOption('select[name="day"]', 'Saturday');
    await page.selectOption('select[name="time"]', '14:00');

    await page.getByRole('button', { name: 'Send to WhatsApp' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Choose WhatsApp Number' })).toBeVisible();
    await expect(page.getByText('0155 642 3361', { exact: true })).toBeVisible();
  });
});