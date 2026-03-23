import { test, expect } from '@playwright/test';

//Here is the script
test('Receipt_creation_po', async ({ page, request }) => {
  await page.goto('https://vportal-uat.aqaar.com/signin');
  await page.locator(`[data-testid="username"]`).click();
  await page.locator(`[data-testid="username"]`).fill('saidheer.adabala@prokraya.com');
  await page.locator(`[data-testid="username"]`).press('Tab');
  await page.locator(`[data-testid="password"]`).fill('Aqaar@123');
  await page.locator(`internal:role=button[name="Sign In"i]`).click();
  await page.locator(`internal:role=link[name="Purchase Orders"i]`).click();
  await page.locator(`internal:text="PO/0024546"i`).click();
  await page.locator(`internal:role=button[name="Raise Delivery Note"i]`).click();
  await page.locator(`[data-testid="asnNumber"]`).click();
  const randomString = Math.random().toString(36).slice(2, 10);

  const asnNumber = `DD_${randomString}`;

  console.log(asnNumber);

  await page.locator('[data-testid="asnNumber"]').fill(asnNumber);
  await page.locator(`#Receipts-list-date`).click();
  await page.locator(`internal:role=button[name="Choose Thursday, March 12th,"i]`).click();
  await page.locator(`input[type="checkbox"]`).check();
  await page.locator(`input[type="number"]`).click();
  await page.locator(`input[type="number"]`).fill('1');
  await page.locator(`internal:role=button[name="Submit"i]`).click();
  await page.waitForTimeout(20000);

});