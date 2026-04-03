const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const CreatePurchaseOrder = require('../pages/purchaseOrder');
const userData = require('../user_data.json');
const config = require('../config.json');

test('Delivery note', async ({ page }) => {
    // Navigate to the application base URL
    await page.goto(config.baseUrl);    
    // Initialize Login Page Object
    const loginPage = new LoginPage(page);
    // Login to the application using provided credentials
    await loginPage.LoginToApplication("saidheer.adabala@prokraya.com","Aqaar@123");
    // Verify that user is successfully redirected to the dashboard
    await expect(page).toHaveURL(`${config.dashboardUrl}`);
   
    const creatpurchaseorder = new CreatePurchaseOrder(page);
    creatpurchaseorder.po_value = userData.po_value;
    await creatpurchaseorder.createPurchaseOrder();
})