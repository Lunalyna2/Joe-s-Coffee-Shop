# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth-flow.spec.ts >> Brewflow Core Flows >> Cashier Dashboard Access & Logout Flow
- Location: tests\auth-flow.spec.ts:11:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/Closing Up?/i)
Expected: visible
Error: strict mode violation: getByText(/Closing Up?/i) resolved to 2 elements:
    1) <h1 class="text-4xl font-black tracking-tighter text-white mb-3 uppercase italic">Closing Up?</h1> aka getByRole('heading', { name: 'Closing Up?' })
    2) <div role="alert" aria-live="assertive" id="__next-route-announcer__">CLOSING UP?</div> aka getByText('CLOSING UP?', { exact: true })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/Closing Up?/i)

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - main [ref=e3]:
      - generic [ref=e7]:
        - heading "Closing Up?" [level=1] [ref=e8]
        - generic [ref=e9]:
          - paragraph [ref=e10]: Log out Confirmation
          - paragraph [ref=e11]: You are about to securely end your session on the BrewFlow Portal. Any unsaved cashier actions may be lost. Are you sure you wish to exit?
        - generic [ref=e12]:
          - button "Log Out" [ref=e14]:
            - img [ref=e15]
            - text: Log Out
          - link "Go Back to Cashier" [ref=e18] [cursor=pointer]:
            - /url: /cashier
            - img [ref=e19]
            - text: Go Back to Cashier
        - paragraph [ref=e21]: BrewFlow Admin Portal
  - button "Open Next.js Dev Tools" [ref=e27] [cursor=pointer]:
    - img [ref=e28]
  - alert [ref=e31]: CLOSING UP?
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Brewflow Core Flows', () => {
  4  | 
  5  |   test('Password Reset Redirect Flow', async ({ page }) => {
  6  |     await page.goto('/auth/confirm?next=/account/updatepass');
  7  |     await expect(page.getByText(/Verifying/i)).toBeVisible();
  8  |     await expect(page).toHaveURL(/.*account\/updatepass/);
  9  |   });
  10 | 
  11 |   test('Cashier Dashboard Access & Logout Flow', async ({ page }) => {
  12 |     // --- LOGIN SECTION ---
  13 |     await page.goto('/login');
  14 |     await page.locator('input[name="email"]').fill(process.env.TEST_USER_EMAIL!);
  15 |     await page.locator('input[name="password"]').fill(process.env.TEST_USER_PASSWORD!);
  16 |     
  17 |     const authorizeBtn = page.getByRole('button', { name: /Authorize Entry/i });
  18 |     await authorizeBtn.click();
  19 | 
  20 |     await expect(page).toHaveURL(/.*cashier/, { timeout: 10000 });
  21 | 
  22 |     // --- LOGOUT SECTION ---
  23 |     // 1. Navigate to Logout via the Navbar link
  24 |     // Your Navbar code uses uppercase: 'LOG OUT'
  25 |     await page.getByRole('link', { name: 'LOG OUT' }).click();
  26 | 
  27 |     // 2. Verify we are on the confirmation page
  28 |     await expect(page).toHaveURL(/.*logout/);
> 29 |     await expect(page.getByText(/Closing Up?/i)).toBeVisible();
     |                                                  ^ Error: expect(locator).toBeVisible() failed
  30 |     await expect(page.getByText(/You are about to securely end your session/i)).toBeVisible();
  31 | 
  32 |     // 3. Click the Logout Button
  33 |     const confirmLogoutBtn = page.getByRole('button', { name: /Log Out/i });
  34 |     await confirmLogoutBtn.click();
  35 | 
  36 |     // 4. Optional: Verify the "pending" state from your LogoutButton component
  37 |     // We check for the loading text "Clearing Brews..."
  38 |     // await expect(page.getByText(/Clearing Brews.../i)).toBeVisible();
  39 | 
  40 |     // 5. Verify successful redirect back to login
  41 |     // Most logout actions redirect to the root or login page
  42 |     await expect(page).toHaveURL(/.*login|^\/$/);
  43 |   });
  44 | 
  45 |   test('Logout Cancellation Flow', async ({ page }) => {
  46 |     // Test the "Go Back to Cashier" link on the logout page
  47 |     await page.goto('/logout');
  48 |     
  49 |     const goBackBtn = page.getByRole('link', { name: /Go Back to Cashier/i });
  50 |     await goBackBtn.click();
  51 | 
  52 |     // Verify it returns to dashboard
  53 |     await expect(page).toHaveURL(/.*cashier/);
  54 |   });
  55 | });
```