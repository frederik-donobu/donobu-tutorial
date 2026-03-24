import { test, expect } from 'donobu';

test('search Wikipedia for artificial intelligence', async ({ page }) => {
  await page.goto('https://en.wikipedia.org');

  await page.ai(
    'Search for "artificial intelligence" and navigate to the article',
  );

  // Use a standard Playwright assertion to verify we landed on the right page
  await expect(page).toHaveURL(/Artificial_intelligence/);
});
