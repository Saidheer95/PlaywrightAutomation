const { test, expect } = require('@playwright/test')
const LoginPage = require('../pages/loginPage')
const CreateVendor = require('../pages/createendor')
const config = require('../config.json')

test("Verify the vendor creation functionality", async function ({ page }) {

    await page.goto(config.baseUrl)

    const loginPage = new LoginPage(page);
    await loginPage.LoginToApplication("prokrayateam@gmail.com", "Test@123");

    const createVendor = new CreateVendor(page);
    await createVendor.CreateTheVendor();

    

})
