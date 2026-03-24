import { test, expect } from 'donobu';
import { z } from 'zod';

test('extract product information from a product page', async ({ page }) => {
  await page.goto('https://www.lush.com/us/en_us/p/sticky-dates-shower-gel');

  const product = await page.ai.extract(
    z.object({
      name: z.string().describe('The product name'),
      price: z.string().describe('The product price including currency symbol'),
      rating: z.number().describe('The star rating out of 5'),
      inStock: z.boolean().describe('Whether the product is in stock'),
    }),
  );

  expect(product.name).toContain('Sticky Dates');
  expect(product.price).toBeTruthy();
  expect(product.rating).toBeGreaterThan(0);
  expect(product.rating).toBeLessThanOrEqual(5);
  console.log(
    `Found: ${product.name} at ${product.price} (${product.rating} stars, ${
      product.inStock ? 'in stock' : 'out of stock'
    })`,
  );
});
