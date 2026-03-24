import { expect, test } from 'donobu';
import { z } from 'zod';

test.setTimeout(180_000);
test('search and extract the first result', async ({ page }) => {
  await page.goto('https://www.awaytravel.com/');

  const result = await page.ai(
    'Search for "carry-on" and go to the first product page',
    {
      schema: z.object({
        productName: z.string().describe('The name of the product'),
        price: z
          .string()
          .describe('The listed price, including the currency symbol'),
        color: z.string().describe('The color of the product'),
      }),
    },
  );

  console.log(
    `Found: ${result.productName} in ${result.color} for ${result.price}`,
  );
  expect(result.productName.toLowerCase()).toContain('carry-on');
  expect(result.price).toBeTruthy();
  expect(result.color).toBeTruthy();
});
