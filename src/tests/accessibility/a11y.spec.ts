import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pagesToTest = [
  '/ar',
  '/en',
  '/ar/services',
  '/en/services',
  '/ar/services/filler',
  '/en/services/filler',
  '/ar/about',
  '/en/about',
  '/ar/before-after',
  '/en/before-after',
  '/ar/appointment',
  '/en/appointment',
  '/ar/contact',
  '/en/contact',
];

for (const pagePath of pagesToTest) {
  test.describe(`Accessibility: ${pagePath}`, () => {
    test('should have no accessibility violations', async ({ page }) => {
      await page.goto(pagePath, { waitUntil: 'networkidle' });
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(
        accessibilityScanResults.violations,
        `${pagePath} violations: ${accessibilityScanResults.violations
          .map((v) => `${v.id} (${v.nodes.length})`)
          .join(', ')}`
      ).toEqual([]);
    });
  });
}

test.describe('Keyboard Navigation', () => {
  test('Tab navigation works on homepage', async ({ page }) => {
    await page.goto('/ar');

    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
  });

  test('Mobile menu opens and closes with keyboard', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/ar');

    const menuButton = page.getByRole('button', { name: 'فتح القائمة' });
    await menuButton.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('dialog', { name: 'القائمة الرئيسية' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog', { name: 'القائمة الرئيسية' })).toBeHidden();
  });

  test('Before/After modal closes with Escape', async ({ page }) => {
    await page.goto('/ar/before-after');

    await page.getByRole('button', { name: 'عرض بالحجم الكامل' }).click();
    const dialog = page.getByRole('dialog', { name: 'قبل وبعد' });
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });

  test('Before/After modal supports arrow key navigation', async ({ page }) => {
    await page.goto('/en/before-after');

    await page.getByRole('button', { name: 'View Fullscreen' }).click();
    const dialog = page.getByRole('dialog', { name: 'Before & After' });
    await expect(dialog).toBeVisible();

    await page.keyboard.press('ArrowRight');
    await expect(dialog.getByRole('button', { name: 'Next' })).toBeFocused();
  });
});

test.describe('ARIA Attributes', () => {
  test('Header has proper ARIA labels', async ({ page }) => {
    await page.goto('/ar');

    await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'فتح القائمة' })).toBeHidden();

    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('button', { name: 'فتح القائمة' })).toBeVisible();
  });

  test('Appointment form fields are labelled', async ({ page }) => {
    await page.goto('/ar/appointment');

    await expect(page.getByLabel('الاسم الكامل')).toBeVisible();
    await expect(page.getByLabel('رقم الهاتف')).toBeVisible();
    await expect(page.getByLabel('الخدمة')).toBeVisible();
    await expect(page.getByLabel('اليوم المفضل')).toBeVisible();
    await expect(page.getByLabel('الوقت المفضل')).toBeVisible();
  });

  test('Language switcher uses combobox semantics', async ({ page }) => {
    await page.goto('/ar');

    const combobox = page.getByRole('combobox', { name: 'Select language' });
    await combobox.click();
    await expect(page.getByRole('option', { name: 'English' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'العربية' })).toHaveAttribute('aria-selected', 'true');
  });

  test('Images have alt text', async ({ page }) => {
    await page.goto('/ar');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      if (alt === '') {
        const ariaHidden = await img.getAttribute('aria-hidden');
        expect(ariaHidden, `decorative image ${i} must be hidden from AT`).toBe('true');
      } else {
        expect(alt, `image ${i} must have an alt attribute`).toBeTruthy();
      }
    }
  });
});

test.describe('Reduced Motion', () => {
  test('respects prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/ar');

    const animatedElements = page.locator('[class*="animate-"]');
    const count = await animatedElements.count();

    for (let i = 0; i < count; i++) {
      const duration = await animatedElements.nth(i).evaluate((el) => {
        return parseFloat(window.getComputedStyle(el).animationDuration);
      });
      expect(duration, `animation ${i} duration ${duration}s must be near zero`).toBeLessThanOrEqual(0.02);
    }
  });
});