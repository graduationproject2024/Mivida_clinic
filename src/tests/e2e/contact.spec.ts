import { test, expect } from '@playwright/test';
import { switchLanguage } from './helpers';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ar/contact');
  });

  test('loads contact page', async ({ page }) => {
    await expect(page).toHaveTitle(/تواصل معنا/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('تواصل معنا');
  });

  test('displays contact information', async ({ page }) => {
    await expect(page.getByText('0403408500').first()).toBeVisible();
    await expect(page.getByText('طنطا').first()).toBeVisible();
    await expect(page.getByText('السبت').first()).toBeVisible();
    await expect(page.getByText('الأحد').first()).toBeVisible();
    await expect(page.getByText('الأربعاء').first()).toBeVisible();
  });

  test('phone link works', async ({ page }) => {
    const phoneLink = page.getByRole('link', { name: '0403408500', exact: true }).first();
    await expect(phoneLink).toHaveAttribute('href', 'tel:0403408500');
  });

  test('WhatsApp buttons work', async ({ page }) => {
    const whatsapp = page.getByRole('link', { name: /واتساب/ }).first();
    await expect(whatsapp).toBeVisible();
    await expect(page.getByText('0155 642 3361', { exact: true }).first()).toBeVisible();
  });

  test('map link works', async ({ page }) => {
    const mapLink = page.locator('a[href*="google.com/maps"]');
    await expect(mapLink).toHaveAttribute('href', 'https://www.google.com/maps/search/?api=1&query=30.7865,31.0004');
  });

  test('social links work', async ({ page }) => {
    await expect(page.locator('a[href*="facebook.com"]').first()).toBeVisible();
    await expect(page.locator('a[href*="instagram.com"]').first()).toBeVisible();
    await expect(page.locator('a[href*="tiktok.com"]').first()).toBeVisible();
  });
});

test.describe('Language Switching', () => {
  test('switches from Arabic to English from root path', async ({ page }) => {
    await page.goto('/ar');
    await switchLanguage(page, 'English');
    await expect(page).toHaveURL(/.*\/en/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Specialized Care');
  });

  test('switches from English to Arabic from root path', async ({ page }) => {
    await page.goto('/en');
    await switchLanguage(page, 'العربية');
    await expect(page).toHaveURL(/.*\/ar/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('عناية متخصصة');
  });

  test('preserves current page when switching language', async ({ page }) => {
    await page.goto('/ar/services');
    await switchLanguage(page, 'English');
    await expect(page).toHaveURL(/.*\/en\/services/);

    await switchLanguage(page, 'العربية');
    await expect(page).toHaveURL(/.*\/ar\/services/);
  });

  test('switches language on a detail page', async ({ page }) => {
    await page.goto('/ar/services/filler');
    await switchLanguage(page, 'English');
    await expect(page).toHaveURL(/.*\/en\/services\/filler/);

    await switchLanguage(page, 'العربية');
    await expect(page).toHaveURL(/.*\/ar\/services\/filler/);
  });
});

test.describe('Responsive Design', () => {
  test('mobile viewport works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/ar');

    const menuButton = page.getByRole('button', { name: 'فتح القائمة' });
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    await expect(page.getByRole('dialog', { name: 'القائمة الرئيسية' })).toBeVisible();
  });

  test('tablet viewport works', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/ar');
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  });

  test('desktop viewport works', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/ar');
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
    await expect(
      page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'الرئيسية', exact: true })
    ).toBeVisible();
  });
});