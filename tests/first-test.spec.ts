import { test, expect } from 'donobu';

test.setTimeout(60_000);
test('search Hacker News for Donobu article', async ({ page }) => {
  await page.goto('https://news.ycombinator.com');

  await page.ai(
    'Scroll down to find the search box and then do a search for "mac app for web testing". Navigate to the first result.',
  );

  // Use a standard Playwright assertion to verify we landed on the right article
  await expect(page.locator('body')).toContainText('Donobu');
});
