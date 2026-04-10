const { test, expect } = require('@playwright/test');
const InvoicePage = require('../pages/Invoices');
// const LoginPage = require('../pages/loginPage');

test('Verify non-po invoice creation is not allowed', async ({ page }) => {
    // Navigate to the application base URL
    await page.goto('https://autostage-prokrayaai.buildecho.online/login');   
    // Initialize Login Page Object
    await page.fill('input[name="email"]', 'mounika.manne@prokraya.com');
    await page.fill('input[name="password"]', 'Propswd@123');
    await page.click('button[type="submit"]');
    
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('https://autostage-prokrayaai.buildecho.online/app/dashboard');


    const invoicePage = new InvoicePage(page);
    await invoicePage.createInvoice();
})