const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const CreatePurchaseOrder = require('../pages/purchaseOrder');
const userData = require('../user_data.json');
const config = require('../config.json');
const RaiseReceipt = require('../pages/RaiseReceipt');
const RaiseInvoice = require('../pages/RaiseInvoice');
const LogoutPage = require('../pages/logoutPage');

test('login -> Create delivery -> Raise Receipt -> Raise Invoice -> Logout', async ({ page }) => {
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
    await creatpurchaseorder.createPurchaseOrderNew();
    console.log("Purchase order creation process completed successfully for the purchase order: " + userData.po_value);

    const createReceipt = new RaiseReceipt(page);
    await createReceipt.raiseReceipt();  
    console.log("Receipt created successfully for the purchase order: " + userData.po_value);

   
    const createInvoice = new RaiseInvoice(page);
    await createInvoice.raiseInvoice();
    console.log("Invoice created successfully for the purchase order: " + userData.po_value);

    //  const logoutPage = new LogoutPage(page);
    // await logoutPage.LogoutFromApplication();   
    // console.log("Logged out successfully");


})