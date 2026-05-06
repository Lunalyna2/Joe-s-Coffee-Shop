import { test, expect } from '@playwright/test';

const EMAIL = process.env.TEST_USER_EMAIL!;
const PASS = process.env.TEST_USER_PASSWORD!;

test.describe('History Navigation and Detail View Flow', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.locator('input[name="email"]').fill(EMAIL);
    await page.locator('input[name="password"]').fill(PASS);
    await page.getByRole('button', { name: /Authorize Entry/i }).click();
    await expect(page).toHaveURL(/.*cashier/);
  });

  test('should navigate from history to order details and back', async ({ page }) => {
   //go to navbar
    await page.getByRole('link', { name: 'HISTORY' }).click();
    await expect(page).toHaveURL(/.*history/);
    await page.waitForLoadState('networkidle');

    //find the first transaction row
    const firstRow = page.locator('tbody tr').first();
    
    //extract the receipt number from the 4th column to use for URL verification
    const receiptNoWithHash = await firstRow.locator('td').nth(3).innerText();
    const receiptNo = receiptNoWithHash.replace('#', '').trim();

    //click the receipt button
    const detailsButton = firstRow.getByRole('link', { name: /View Details/i });
    await detailsButton.click();

    //verify receipt loading page
    const loadingState = page.getByText(/Brewing Receipt Details/i);
    await expect(loadingState).toBeVisible();

    //verify receipt page
    await expect(page).toHaveURL(new RegExp(`/receipt/${receiptNo}`));
    
    //check if the receiptcard is rendered
    await expect(page.locator('text=Receipt')).toBeVisible({ timeout: 10000 });
    
    //test the close button on the Receipt Page
    const closeButton = page.getByTitle('Close and Return');
    await closeButton.click();

    //verify if we are back in history
    await expect(page).toHaveURL(/.*history/);
  });
});