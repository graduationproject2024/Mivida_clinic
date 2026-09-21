import type { Locator, Page } from '@playwright/test';

export async function gotoHydrated(page: Page, url: string) {
  await page.goto(url);
  await page.waitForLoadState('networkidle');
}

async function isVisible(page: Page, locator: Locator, timeout = 2000): Promise<boolean> {
  try {
    await locator.waitFor({ state: 'visible', timeout });
    return true;
  } catch {
    return false;
  }
}

export async function switchLanguage(page: Page, target: 'English' | 'العربية') {
  const combobox = page.getByRole('combobox', { name: 'Select language' });
  const menuButton = page.getByRole('button', { name: /فتح القائمة|Open menu/ });

  if (await isVisible(page, combobox)) {
    await combobox.click();
    await page.getByRole('option', { name: target }).click();
  } else {
    await menuButton.click();
    await page.getByRole('dialog').getByRole('button', { name: target }).click();
  }
}

export async function clickNavLink(page: Page, label: string) {
  const desktopLink = page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: label, exact: true });
  const menuButton = page.getByRole('button', { name: /فتح القائمة|Open menu/ });

  if (await isVisible(page, desktopLink)) {
    await desktopLink.click();
  } else {
    await menuButton.click();
    await page.getByRole('dialog').getByRole('link', { name: label, exact: true }).click();
  }
}

export { isVisible };