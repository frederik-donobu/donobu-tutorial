import { test } from 'donobu';

test.setTimeout(180_000);
test('verify product page has required elements', async ({ page }) => {
  await page.goto(
    'https://us.pandora.net/en/rings/promise-rings/double-heart-sparkling-ring/161198C01.html',
  );

  await page.ai.assert(
    'The page shows a product with a name, price, and add-to-bag button',
  );
  await page.ai.assert('The product has at least one customer review');
  await page.ai.assert('The price is displayed in USD');
});
