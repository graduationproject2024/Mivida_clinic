import { test, expect } from '@playwright/test';

test.describe('Routing & 404', () => {
  test('Root redirects to default locale /ar', async ({ page }) => {
    const response = await page.goto('/');
    expect(page.url()).toMatch(/\/(ar|en)$/);
    expect(response?.status()).toBe(200);
  });

  test('Valid localized routes return 200', async ({ page }) => {
    const response = await page.goto('/en/services');
    expect(response?.status()).toBe(200);
  });

  test('Invalid locale returns 404 with Arabic as default fallback', async ({ page }) => {
    const response = await page.goto('/xx');
    expect(response?.status()).toBe(404);
    await expect(page.locator('h1')).toHaveText('404');
    await expect(page.locator('text=الصفحة غير موجودة')).toBeVisible();
  });

  test('Unknown route in /en returns localized 404', async ({ page }) => {
    const response = await page.goto('/en/unknown-slug-xyz');
    expect(response?.status()).toBe(404);
    await expect(page.locator('h1')).toHaveText('404');
    // Check if the 404 page is translated to English
    await expect(page.locator('text=Page Not Found')).toBeVisible();
    await expect(page.locator('text=English Home')).toBeVisible(); // or check for Home icon with English text
  });

  test('Unknown service slug returns 404', async ({ page }) => {
    const response = await page.goto('/ar/services/unknown-slug');
    expect(response?.status()).toBe(404);
    await expect(page.locator('h1')).toHaveText('404');
  });

  test('Uppercase locale redirects or returns 404', async ({ page }) => {
    // Next-intl strict locales should 404 on /EN unless mapped, or redirect
    const response = await page.goto('/EN');
    if (response?.status() === 200) {
      expect(page.url()).toMatch(/\/en$/); // Should have redirected
    } else {
      expect(response?.status()).toBe(404);
    }
  });
});
