const {test,expect} = require('@playwright/test')

test("Valid Login",async function({page}){

    await page.waitForTimeout(5000)

    await page.goto("https://vportal-uat.aqaar.com/")

    await page.locator("input[name='username']").type("prokrayateam@gmail.com",{delay:200})

    await page.getByTestId('password').fill('Test@123',{delay:300});

    await page.getByRole('button',{name:'Sign In'}).click();

    await expect(page).toHaveURL("https://vportal-uat.aqaar.com/dashboard")

    const displayurl=page.url()

    console.log('url is dispalyed with link:'+ displayurl)

    




})