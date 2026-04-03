const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const config = require('../config.json');
const userData = require('../user_data.json');



test('Approver: open notification, search task, click view icon', async ({ page }) => {

    // Navigate to the application base URL
    await page.goto(config.baseUrl);

    // Initialize Login Page Object
    const loginPage = new LoginPage(page);

    // Login to the application using provided credentials
    await loginPage.LoginToApplication("po@gmail.com", "Aqqa@123");

    // Verify that user is successfully redirected to the dashboard
    await expect(page).toHaveURL(`${config.dashboardUrl}`);

    // Wait until all network requests are completed
    await page.waitForLoadState('networkidle');

    // Click on the notification icon from the top navigation bar
    await page.locator('.d-flex.align-items-center .icon-notification').click();

    // Locate the "View all notifications" option
    const viewAllNotifications = page.locator('text=View all notifications');

    // If "View all notifications" is available, click it
    // Otherwise, navigate directly to the My Tasks page
    if (await viewAllNotifications.count() > 0) {
        await viewAllNotifications.click();
    } else {
        await page.goto(`${config.dashboardUrl}/my-tasks`);
    }

    // Locate the task search input field in My Tasks page
    const searchInput = page.locator('input[name="taskSearch"]');

    // Enter the vendor/task name from config into the search field
    await searchInput.fill(userData.vendor_name);
    console.log("Search input filled with task name: " + userData.vendor_name);

    // Trigger search by pressing Enter
    await searchInput.press('Enter');

    // Locate the "View Details" icon/button for the searched task
    const clickView = page.getByTitle('View Details');

    // Click on the view details icon to open the task
    await clickView.click();

    // Wait for loading spinner to disappear before proceeding
    await page.locator('.loader').waitFor({ state: 'hidden' });

    // Scroll to the bottom of the page (where approval actions usually reside)
    await page.keyboard.press('End');

    // Locate the approver action radio button (Approve/Reject/etc.)
    const selectbutton = page.locator('label.form-group-radio', {
        hasText: config.approver_actions
    });

    // Select the appropriate approver action
    await selectbutton.click();
   
    // Locate the Submit button using accessible role and visible text
    const finalSubmit = page.getByRole('button', { name: 'Submit' });

    // Click the Submit button to complete the approval action
    await finalSubmit.click();

});