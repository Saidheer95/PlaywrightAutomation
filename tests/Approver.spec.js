const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage')
const config = require('../config.json');


test('Approver: open notification, search task, click view icon', async ({ page }) => {

    await page.goto(config.baseUrl)

    // Login using page object and credentials
    const loginPage = new LoginPage(page);
    await loginPage.LoginToApplication("po@gmail.com", "Aqqa@123");
    await expect(page).toHaveURL(`${config.dashboardUrl}`);

    await page.waitForLoadState('networkidle');

    await page.locator('.d-flex.align-items-center .icon-notification').click();


    // 3. Click "View all notifications" option
    const viewAllNotifications = page.locator('text=View all notifications');
    if (await viewAllNotifications.count() > 0) {
        await viewAllNotifications.click();
    } else {
        await page.goto(`${config.dashboardUrl}/my-tasks`);
    }

    // 4. Search the task in My Tasks
    const searchInput = page.locator('input[name="taskSearch"]');
    await searchInput.fill('Vendor_eis0');
    await searchInput.press('Enter');

    const clickView = page.getByTitle('View Details');
    await clickView.click();


    await page.locator('.loader').waitFor({ state: 'hidden' });


    await page.keyboard.press('End');

    const selectbutton = page.locator('label.form-group-radio', { hasText: 'Approve' })

    await selectbutton.click();



});
