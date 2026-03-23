const { test, expect } = require('@playwright/test')
const LoginPage = require('../pages/loginPage')


test("Valid Login using the page objects", async function ({ page }) {

    await page.goto("https://vportal-uat.aqaar.com/")

    const loginPage = new LoginPage(page);
    await loginPage.LoginToApplication();

    await expect(page).toHaveURL("https://vportal-uat.aqaar.com/dashboard")

    const displayurl = page.url()   
    console.log('url is dispalyed with link:' + displayurl)
    

})