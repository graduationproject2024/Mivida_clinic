import { test, expect } from '@playwright/test';
import { clickNavLink, gotoHydrated } from './helpers';

const services = [
  { id: 'filler', ar: 'فيلر', en: 'Filler' },
  { id: 'botox', ar: 'بوتوكس', en: 'Botox' },
  { id: 'plasma', ar: 'بلازما', en: 'Plasma' },
  { id: 'skin-hair', ar: 'علاج الشعر والبشرة', en: 'Skin & Hair Treatment' },
  { id: 'laser', ar: 'ليزر', en: 'Laser' },
  { id: 'glow-injection', ar: 'حقنة النضارة', en: 'Glow Injection' },
  { id: 'mesotherapy', ar: 'الميزوثيرابي', en: 'Mesotherapy' },
  { id: 'stem-cells', ar: 'الخلايا الجذعية', en: 'Stem Cells' },
];

test.describe('Services Page - Arabic', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHydrated(page, '/ar/services');
  });

  test('loads services overview page', async ({ page }) => {
    await expect(page).toHaveTitle(/خدماتنا/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('خدماتنا');
    await clickNavLink(page, 'الرئيسية');
    await expect(page).toHaveURL(/.*\/ar$/);
  });

  for (const service of services) {
    test(`navigates to ${service.ar} detail page`, async ({ page }) => {
      await page.getByRole('link', { name: `اعرف المزيد عن ${service.ar}` }).focus();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(new RegExp(`.*/services/${service.id}`));
      await expect(page.getByRole('heading', { level: 1 })).toContainText(service.ar);
    });
  }
});

test.describe('Services Page - English', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHydrated(page, '/en/services');
  });

  test('loads services overview page', async ({ page }) => {
    await expect(page).toHaveTitle(/Our Services/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Our Services');
  });

  for (const service of services) {
    test(`navigates to ${service.en} detail page`, async ({ page }) => {
      await page.getByRole('link', { name: `Learn more about ${service.en}` }).focus();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(new RegExp(`.*/services/${service.id}`));
      await expect(page.getByRole('heading', { level: 1 })).toContainText(service.en);
    });
  }
});

test.describe('Service Detail Pages', () => {
  for (const service of services) {
    test(`${service.ar} detail page has required sections`, async ({ page }) => {
      await page.goto(`/ar/services/${service.id}`);

      await expect(page.getByRole('heading', { level: 1 })).toContainText(service.ar);
      await expect(page.getByRole('heading', { level: 2, name: 'مناسب لـ' })).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: 'ما يتضمنه العلاج' })).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: 'معلومات هامة' })).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: 'الأسئلة الشائعة' })).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: 'جاهز للبدء؟' })).toBeVisible();
    });

    test(`${service.en} detail page has required sections`, async ({ page }) => {
      await page.goto(`/en/services/${service.id}`);

      await expect(page.getByRole('heading', { level: 1 })).toContainText(service.en);
      await expect(page.getByRole('heading', { level: 2, name: 'Suitable For' })).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: 'What the Experience Involves' })).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: 'Important Information' })).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: 'Frequently Asked Questions' })).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name: 'Ready to Start?' })).toBeVisible();
    });
  }
});