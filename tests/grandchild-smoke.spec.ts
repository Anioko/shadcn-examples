import { test, expect } from '@playwright/test';

test('grandchild create and delete smoke', async ({ page }) => {
  await page.goto('http://localhost:3000/frameworks/lean-canvas/dashboard');

  // Wait for the Problems section (grandchild) card to load
  await expect(page.locator('text=Problems')).toBeVisible({ timeout: 5000 });

  // Click Add button (first Add in the page)
  await page.getByRole('button', { name: /Add/i }).first().click();

  // Fill the drawer form - the AddItemDrawer uses inputs with labels 'Title' and 'Content'
  await page.getByLabel('Title').fill('smoke-playwright-item');
  await page.getByLabel('Content').fill('created by playwright smoke test');

  // Submit - assume button text contains Add or Create
  await page.getByRole('button', { name: /Add|Create/i }).click();

  // Wait for the new item to appear in the table
  const row = page.locator('table >> text=smoke-playwright-item');
  await expect(row).toBeVisible({ timeout: 5000 });

  // Delete the item via the actions menu (three-dots then Delete). This depends on UI; we'll try generic selectors.
  const dots = row.locator('button', { has: page.locator('svg[title="More options"], svg') }).first();
  // fallback: click the last button in the row
  await row.locator('button').last().click();
  await page.getByRole('menuitem', { name: /Delete/i }).click();

  // Confirm the row is removed
  await expect(page.locator('table >> text=smoke-playwright-item')).toHaveCount(0);
});
