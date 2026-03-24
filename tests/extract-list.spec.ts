import { expect, test } from 'donobu';
import { z } from 'zod';

test.setTimeout(180_000);
test('extract top search results', async ({ page }) => {
  await page.goto('https://bevmo.com/');

  const results = await page.ai('Search for "chocolate"', {
    schema: z.object({
      searchResults: z
        .array(
          z.object({
            name: z.string(),
            price: z.string(),
          }),
        )
        .describe('The first 5 search results with name and price'),
    }),
  });

  expect(results.searchResults.length).toBeGreaterThan(0);
  expect(results.searchResults.length).toBeLessThanOrEqual(5);

  for (const item of results.searchResults) {
    expect(item.name).toBeTruthy();
    expect(item.price).toBeTruthy();
    console.log(`Found: ${item.name} for ${item.price}`);
  }
});
