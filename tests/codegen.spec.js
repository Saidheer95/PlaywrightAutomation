import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://vportal-uat.aqaar.com/signin');
});