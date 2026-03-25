const { test, expect } = require('@playwright/test')
const LoginPage = require('../pages/loginPage')
const config = require('../config.json')

test("Valid Login using the page objects", async function ({ page }) {

    await page.goto(config.baseUrl)

    const loginPage = new LoginPage(page);
    await loginPage.LoginToApplication("prokrayateam@gmail.com", "Test@123");
    
})
