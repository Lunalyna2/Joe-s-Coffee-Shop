# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: history-flow.spec.ts >> History Navigation and Search Flow >> should show empty state for invalid searches
- Location: tests\history-flow.spec.ts:42:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByPlaceholder('SEARCH CUSTOMER OR RECEIPT...')
    - waiting for" http://localhost:3000/history" navigation to finish...
    - navigated to "http://localhost:3000/history"

```

# Page snapshot

```yaml
- generic:
  - generic [active]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]:
          - navigation [ref=e6]:
            - button "previous" [disabled] [ref=e7]:
              - img "previous" [ref=e8]
            - generic [ref=e10]:
              - generic [ref=e11]: 1/
              - text: "1"
            - button "next" [disabled] [ref=e12]:
              - img "next" [ref=e13]
          - img
        - generic [ref=e15]:
          - generic [ref=e16]:
            - img [ref=e17]
            - generic "Latest available version is detected (16.2.4)." [ref=e19]: Next.js 16.2.4
            - generic [ref=e20]: Turbopack
          - img
      - generic [ref=e21]:
        - dialog "Runtime Error" [ref=e22]:
          - generic [ref=e25]:
            - generic [ref=e26]:
              - generic [ref=e27]:
                - generic [ref=e29]: Runtime Error
                - generic [ref=e30]:
                  - button "Copy Error Info" [ref=e31] [cursor=pointer]:
                    - img [ref=e32]
                  - button "No related documentation found" [disabled] [ref=e34]:
                    - img [ref=e35]
                  - button "Attach Node.js inspector" [ref=e37] [cursor=pointer]:
                    - img [ref=e38]
              - generic [ref=e47]: "Playwright Test did not expect test.describe() to be called here. Most common reasons include: - You are calling test.describe() in a configuration file. - You are calling test.describe() in a file that is imported by the configuration file. - You have two different versions of @playwright/test. This usually happens when one of the dependencies in your package.json depends on @playwright/test."
            - generic [ref=e48]:
              - generic [ref=e49]:
                - paragraph [ref=e51]:
                  - img [ref=e53]
                  - generic [ref=e56]: app/history/page.tsx (6:6) @ <unknown>
                  - button "Open in editor" [ref=e57] [cursor=pointer]:
                    - img [ref=e59]
                - generic [ref=e62]:
                  - generic [ref=e63]: 4 | const PASS = process.env.TEST_USER_PASSWORD!;
                  - generic [ref=e64]: 5 |
                  - generic [ref=e65]: "> 6 | test.describe('History Navigation and Search Flow', () => {"
                  - generic [ref=e66]: "| ^"
                  - generic [ref=e67]: 7 |
                  - generic [ref=e68]: "8 | test.beforeEach(async ({ page }) => {"
                  - generic [ref=e69]: 9 | // Standard login to access the Navbar
              - generic [ref=e70]:
                - generic [ref=e71]:
                  - paragraph [ref=e72]:
                    - text: Call Stack
                    - generic [ref=e73]: "4"
                  - button "Show 3 ignore-listed frame(s)" [ref=e74] [cursor=pointer]:
                    - text: Show 3 ignore-listed frame(s)
                    - img [ref=e75]
                - generic [ref=e77]:
                  - generic [ref=e78]:
                    - text: <unknown>
                    - button "Open <unknown> in editor" [ref=e79] [cursor=pointer]:
                      - img [ref=e80]
                  - text: app/history/page.tsx (6:6)
          - generic [ref=e82]: "1"
          - generic [ref=e83]: "2"
        - contentinfo [ref=e84]:
          - region "Error feedback" [ref=e85]:
            - paragraph [ref=e86]:
              - link "Was this helpful?" [ref=e87] [cursor=pointer]:
                - /url: https://nextjs.org/telemetry#error-feedback
            - button "Mark as helpful" [ref=e88] [cursor=pointer]:
              - img [ref=e89]
            - button "Mark as not helpful" [ref=e92] [cursor=pointer]:
              - img [ref=e93]
    - generic [ref=e99] [cursor=pointer]:
      - button "Open Next.js Dev Tools" [ref=e100]:
        - img [ref=e101]
      - generic [ref=e104]:
        - button "Open issues overlay" [ref=e105]:
          - generic [ref=e106]:
            - generic [ref=e107]: "0"
            - generic [ref=e108]: "1"
          - generic [ref=e109]: Issue
        - button "Collapse issues badge" [ref=e110]:
          - img [ref=e111]
  - alert [ref=e113]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const EMAIL = process.env.TEST_USER_EMAIL!;
  4  | const PASS = process.env.TEST_USER_PASSWORD!;
  5  | 
  6  | test.describe('History Navigation and Search Flow', () => {
  7  |   
  8  |   test.beforeEach(async ({ page }) => {
  9  |     await page.goto('/login');
  10 |     await page.locator('input[name="email"]').fill(EMAIL);
  11 |     await page.locator('input[name="password"]').fill(PASS);
  12 |     await page.getByRole('button', { name: /Authorize Entry/i }).click();
  13 |     await expect(page).toHaveURL(/.*cashier/);
  14 |   });
  15 | 
  16 |   test('should navigate to history and find Maria via search', async ({ page }) => {
  17 |     // 1. Click HISTORY link
  18 |     const historyLink = page.getByRole('link', { name: 'HISTORY' });
  19 |     await historyLink.click();
  20 |     
  21 |     await expect(page).toHaveURL(/.*history/);
  22 | 
  23 |     // 2. THE FIX: Verify active state by the existence of the underline indicator
  24 |     // Your Navbar code renders a <span> when isActive is true
  25 |     const activeIndicator = page.locator('li').filter({ hasText: 'HISTORY' }).locator('span');
  26 |     await expect(activeIndicator).toBeVisible();
  27 | 
  28 |     // 3. Search Interaction
  29 |     const searchInput = page.getByPlaceholder('SEARCH CUSTOMER OR RECEIPT...');
  30 |     await searchInput.fill('Maria');
  31 |     await searchInput.press('Enter');
  32 | 
  33 |     // 4. Verify URL and Data
  34 |     await expect(page).toHaveURL(/.*query=Maria/i);
  35 | 
  36 |     // Using a more generic locator for the row to avoid strict mode violations 
  37 |     // seen in previous errors
  38 |     const mariaEntry = page.locator('tr').filter({ hasText: /Maria/i }).first();
  39 |     await expect(mariaEntry).toBeVisible({ timeout: 10000 });
  40 |   });
  41 | 
  42 |   test('should show empty state for invalid searches', async ({ page }) => {
  43 |     await page.getByRole('link', { name: 'HISTORY' }).click();
  44 |     
  45 |     const searchInput = page.getByPlaceholder('SEARCH CUSTOMER OR RECEIPT...');
> 46 |     await searchInput.fill('UnknownUserXYZ123');
     |                       ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  47 |     await searchInput.press('Enter');
  48 | 
  49 |     // Verify the "No Transactions Found" message from your HistoryPage component
  50 |     await expect(page.getByText(/No Transactions Found/i)).toBeVisible();
  51 |   });
  52 | });
```