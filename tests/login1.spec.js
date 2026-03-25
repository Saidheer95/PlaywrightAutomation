const { test, expect } = require('@playwright/test')
const LoginPage = require('../pages/loginPage')
const config = require('../config.json')


test.describe.serial("Login Test Cases", () => {

test("Valid Login using the page objects", async function ({ page }) {

    await page.goto(config.baseUrl)

    const loginPage = new LoginPage(page);
    await loginPage.LoginToApplication("prokrayateam@gmail.com", "Test@123");

    await expect(page).toHaveURL(config.dashboardUrl)

    const displayurl = page.url()   
    console.log('url is dispalyed with link:' + displayurl)
    

})

test("Invalid username with valid password", async function ({ page }) {

    await page.goto(config.baseUrl)

    const loginPage = new LoginPage(page);
    await loginPage.LoginToApplication("invaliduser@gmail.com", "Test@123");

    // Expect to stay on login page or show error
    await expect(page).not.toHaveURL(config.dashboardUrl)
    // Assuming there's an error message
    await expect(page.locator("text=Login details are invalid. Please try again")).toBeVisible();

})

test("Valid username with invalid password", async function ({ page }) {

    await page.goto(config.baseUrl)

    const loginPage = new LoginPage(page);
    await loginPage.LoginToApplication("prokrayateam@gmail.com", "WrongPass123");

    await expect(page).not.toHaveURL(config.dashboardUrl)
    await expect(page.locator("text=Login details are invalid. Please try again")).toBeVisible();

})

test("Invalid username and invalid password", async function ({ page }) {

    await page.goto(config.baseUrl)

    const loginPage = new LoginPage(page);
    await loginPage.LoginToApplication("wronguser@gmail.com", "WrongPass123");

    await expect(page).not.toHaveURL(config.dashboardUrl)
    await expect(page.locator("text=Login details are invalid. Please try again")).toBeVisible();

})

test("Empty username with valid password", async function ({ page }) {

    await page.goto(config.baseUrl)

    const loginPage = new LoginPage(page);
    await loginPage.LoginToApplication("", "Test@123");

    await expect(page).not.toHaveURL(config.dashboardUrl)
    // Assuming validation message for required field
    await expect(page.locator("text=Username is required")).toBeVisible();

})

test("Valid username with empty password", async function ({ page }) {

    await page.goto(config.baseUrl)

    const loginPage = new LoginPage(page);
    await loginPage.LoginToApplication("prokrayateam@gmail.com", "");

    await expect(page).not.toHaveURL(config.dashboardUrl)
    await expect(page.locator("text=Password is required")).toBeVisible();

})

test("Empty username and empty password", async function ({ page }) {

    await page.goto(config.baseUrl)

    const loginPage = new LoginPage(page);
    await loginPage.LoginToApplication("", "");

    await expect(page).not.toHaveURL(config.dashboardUrl)
    await expect(page.locator("text=Username is required")).toBeVisible();
    await expect(page.locator("text=Password is required")).toBeVisible();

})

})