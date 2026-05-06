import { test, expect } from '@playwright/test';

const EMAIL = process.env.TEST_USER_EMAIL!;
const PASS = process.env.TEST_USER_PASSWORD!;

test.describe('Menu Management Flow', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.locator('input[name="email"]').fill(EMAIL);
    await page.locator('input[name="password"]').fill(PASS);
    await page.getByRole('button', { name: /Authorize Entry/i }).click();
    await expect(page).toHaveURL(/.*cashier/, { timeout: 10000 });
  });

  test('should add a new product and then delete it', async ({ page }) => {
    //open manage menu
    const inventoryBtn = page.locator('button, div[role="button"]').filter({ hasText: /Inventory|Manage/i }).first();
    await inventoryBtn.click(); 

    await expect(page.getByText(/Add New Item/i)).toBeVisible();

    const newItemName = `Test Brew ${Date.now().toString().slice(-4)}`;
    const newItemPrice = '145.50';

    //fill out form
    await page.locator('input[name="name"]').fill(newItemName);
    await page.locator('input[name="price"]').fill(newItemPrice);
    await page.locator('select[name="category"]').selectOption('non_coffee');
    
    await page.getByRole('button', { name: /Add to Menu/i }).click();

    const inventoryRow = page.locator('div.bg-white\\/60').filter({ hasText: newItemName });
    
    await expect(inventoryRow).toBeVisible({ timeout: 15000 });

    //delete
    const deleteBtn = inventoryRow.locator('button').last();
    
    //using this cuz i have animation 
    await deleteBtn.click({ force: true });

    //final verification
    await expect(inventoryRow).not.toBeVisible({ timeout: 10000 });
  });
});