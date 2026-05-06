# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth-flow.spec.ts >> Brewflow Core Flows >> Logout Cancellation Flow
- Location: tests\auth-flow.spec.ts:45:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: /Go Back to Cashier/i })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - heading "Brew Flow" [level=1] [ref=e7]:
          - text: Brew
          - text: Flow
        - generic [ref=e8]:
          - paragraph [ref=e11]: Admin Access
          - paragraph [ref=e12]: Authorized personnel only. All access attempts are logged under security protocol.
      - generic [ref=e14]:
        - generic [ref=e15]:
          - heading "Login" [level=2] [ref=e16]
          - paragraph [ref=e17]: Admin Portal Entry
        - generic [ref=e18]:
          - generic [ref=e19]:
            - text: User Identification
            - generic [ref=e20]:
              - img [ref=e21]
              - textbox "admin@brewflow.com" [ref=e24]
          - generic [ref=e25]:
            - text: Security Token
            - generic [ref=e26]:
              - img [ref=e27]
              - textbox "••••••••" [ref=e30]
              - button [ref=e31]:
                - img [ref=e32]
          - button "Authorize Entry" [ref=e36]:
            - generic [ref=e37]: Authorize Entry
            - img [ref=e39]
          - button "FORGOT PASSWORD" [ref=e42]
        - paragraph [ref=e44]: BrewFlow © 2026
  - button "Open Next.js Dev Tools" [ref=e50] [cursor=pointer]:
    - img [ref=e51]
  - alert [ref=e54]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Brewflow Core Flows', () => {
  4  | 
  5  |   test('Password Reset Redirect Flow', async ({ page }) => {
  6  |     // Matches your /auth/confirm/page.tsx path
  7  |     await page.goto('/auth/confirm?next=/account/updatepass');
  8  |     
  9  |     // Checks for the "Verifying" state we just coded
  10 |     await expect(page.getByText(/Verifying/i)).toBeVisible();
  11 | 
  12 |     // Verify it moves to your account/updatepass route
  13 |     await expect(page).toHaveURL(/.*account\/updatepass/);
  14 |   });
  15 | 
  16 |   test('Cashier Dashboard Access', async ({ page }) => {
  17 |     // Matches your /login and /cashier folders
  18 |     await page.goto('/login');
  19 |     
  20 |     // Fill with your .env.local credentials
  21 |     await page.getByPlaceholder(/email/i).fill(process.env.TEST_USER_EMAIL!);
  22 |     await page.getByPlaceholder(/password/i).fill(process.env.TEST_USER_PASSWORD!);
  23 |     await page.getByRole('button', { name: /login/i }).click();
  24 | 
  25 |     // Should land in the /cashier directory route
  26 |     await expect(page).toHaveURL(/.*cashier/);
  27 |   });
  28 | });
     |                     ^ Error: locator.click: Test timeout of 30000ms exceeded.
```