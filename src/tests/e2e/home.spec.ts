import { test, expect } from '@playwright/test';
import { clickNavLink, switchLanguage } from './helpers';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ar');
  });

  test('loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Mivida/);
  });

  test('displays hero section', async ({ page }) => {
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toContainText('عناية متخصصة ببشرتك وشعرك وجمالك');
  });

  test('displays services section', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 2, name: 'خدماتنا' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'اعرف المزيد عن فيلر' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'اعرف المزيد عن بوتوكس' })).toBeVisible();
  });

  test('displays doctor section', async ({ page }) => {
    await expect(page.getByText('د. نورهان يسري', { exact: false }).first()).toBeVisible();
  });

  test('navigation works', async ({ page }) => {
    await clickNavLink(page, 'الخدمات');
    await expect(page).toHaveURL(/.*\/services/);
  });

  test('language switcher works', async ({ page }) => {
    await switchLanguage(page, 'English');
    await expect(page).toHaveURL(/.*\/en/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Specialized Care');
  });
});

test.describe('Homepage - English', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
  });

  test('displays English content', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Specialized Care for Your Skin, Hair & Beauty');
    await expect(page.getByRole('link', { name: 'Learn more about Filler' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Learn more about Botox' })).toBeVisible();
  });

  test('switches back to Arabic from root path', async ({ page }) => {
    await switchLanguage(page, 'العربية');
    await expect(page).toHaveURL(/.*\/ar/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('عناية متخصصة');
  });
});