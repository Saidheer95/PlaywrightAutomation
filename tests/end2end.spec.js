const {test,expect} = require('@playwright/test')

const LoginPage = require('../pages/loginPage');
const CreateVendor = require('../pages/createendor');
const LogoutPage = require('../pages/logoutPage');
const config = require('../config.json')    


test('E2E: Login → Create Vendor → Logout', async ({ page }) => {


// login to the application
await page.goto(config.baseUrl)

const loginPage = new LoginPage(page);
await loginPage.LoginToApplication("prokrayateam@gmail.com", "Test@123");

await expect(page).toHaveURL(/dashboard/);
  console.log('Login successful');

// create a new vendor
const createVendor = new CreateVendor(page);
const vendorData = await createVendor.CreateTheVendor();    
console.log('Vendor created successfully with details:'+ vendorData);

//Logout from the application
const logoutPage = new LogoutPage(page);
await logoutPage.LogoutFromApplication();
})