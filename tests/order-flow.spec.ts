import { test, expect } from '@playwright/test';

const EMAIL = process.env.TEST_USER_EMAIL!;
const PASS = process.env.TEST_USER_PASSWORD!;

test('Full Brewflow Checkout and Status Update', async ({ page }) => {
  await page.goto('/login');

  //input data
  await page.locator('input[name="email"]').fill(EMAIL);
  await page.locator('input[name="password"]').fill(PASS);
  await page.getByRole('button', { name: /Authorize Entry/i }).click();

  //select and checkout
  const milkTeaCard = page.locator('div.grid > div').filter({ hasText: 'Milk Tea' });
  await milkTeaCard.locator('button').filter({ has: page.locator('svg.lucide-plus') }).click();

  const checkoutContainer = page.locator('div.flex-col').filter({ hasText: 'Checkout' });
  const testName = `Elias ${Date.now().toString().slice(-4)}`;
  
  await checkoutContainer.getByPlaceholder('CUSTOMER NAME').fill(testName);
  await checkoutContainer.getByRole('button', { name: 'TAKE OUT' }).first().click();
  await checkoutContainer.locator('input[placeholder="0.00"]').last().fill('1000');
  await page.getByRole('button', { name: 'Complete Order' }).click();

  //navigate to all orders
  await page.getByRole('link', { name: /All Orders/i }).click();
  
  const orderNameRegex = new RegExp(testName, 'i');
  //find a specific card
  const card = page.locator('div.bg-white').filter({ hasText: orderNameRegex }).last();
  
 //wait to appear
  await expect(card).toBeVisible({ timeout: 15000 });

  //use a generic locator for the select element inside that card
  const statusDropdown = card.locator('select');

  // Select complete bypassing animations, etc
  await statusDropdown.selectOption({ value: 'completed' }, { force: true });

  //final verification
  await expect(statusDropdown).toHaveValue('completed');
});