import { test, expect } from '@playwright/test';

test.describe('Brewflow Core Flows', () => {

  test('Password Reset Redirect Flow', async ({ page }) => {
   
    await page.goto('/auth/confirm?next=/account/updatepass');
    
    await expect(page.getByText(/Verifying/i)).toBeVisible();

    await expect(page).toHaveURL(/.*account\/updatepass/);
  });

  test('Cashier Dashboard Access and Logout', async ({ page }) => {
    await page.goto('/login');
    
    //enter the input
    await page.locator('input[name="email"]').fill(process.env.TEST_USER_EMAIL!);
    await page.locator('input[name="password"]').fill(process.env.TEST_USER_PASSWORD!);
    
    //click the login button
    const authorizeBtn = page.getByRole('button', { name: /Authorize Entry/i });
    await authorizeBtn.click();

    //verify successful redirect to the cashier route
    await expect(page).toHaveURL(/.*cashier/, { timeout: 10000 });

    //LOGOUT FLOW 

    //navigate to logout page via vavbar
    await page.getByRole('link', { name: 'LOG OUT' }).click();
    await expect(page).toHaveURL(/.*logout/);

    //verify the logout page
    await expect(page.getByRole('heading', { name: /Closing Up?/i })).toBeVisible();

    //execute logout action
    await page.getByRole('button', { name: /Log Out/i }).click();

    //verify redirect back to login
    await expect(page).toHaveURL(/\/login$|.*:3000\/$/);
  });
});