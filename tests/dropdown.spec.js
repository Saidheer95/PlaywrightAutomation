const{test,expect}=require("@playwright/test")

test("verify the dropdwon",async function ({page}) {

    await page.goto("await page.locator('body').click()")
    await page.goto("https://vportal-uat.aqaar.com/")
    await page.getByTestId('username').click();
    await page.getByTestId('username').click();
    await page.getByTestId('username').fill('saidheer.adabala@prokraya.com');
    await page.getByTestId('username').press('Tab');
    await page.getByTestId('password').click();
    await page.getByTestId('password').press('CapsLock');
    await page.getByTestId('password').fill('A');
    await page.getByTestId('password').press('CapsLock');
    await page.getByTestId('password').fill('Aqaar@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('link', { name: 'Purchase Orders' }).click();
    await page.getByText('PO/0024543').click();
    await page.getByRole('button', { name: 'Raise Delivery Note' }).click();
    await page.getByTestId('asnNumber').click();
    await page.getByTestId('asnNumber').fill('DD_INV_255667');
    await page.locator('#Receipts-list-date').click();
    await page.getByRole('button', { name: 'Choose Saturday, April 4th,' }).click();
    await page.getByRole('row', { name: '1 5\'\' Vortices Ex Fan 6 6 AED' }).getByRole('checkbox').check();
    await page.getByRole('row', { name: '1 5\'\' Vortices Ex Fan 6 6 AED' }).getByRole('spinbutton').click();
    await page.getByRole('row', { name: '1 5\'\' Vortices Ex Fan 6 6 AED' }).getByRole('spinbutton').fill('2');
    await page.getByRole('row', { name: '2 5\'\' Vortices Ex Fan 4 2 AED' }).getByRole('checkbox').check();
    await page.getByRole('row', { name: '2 5\'\' Vortices Ex Fan 4 2 AED' }).getByRole('spinbutton').click();
    await page.getByRole('row', { name: '2 5\'\' Vortices Ex Fan 4 2 AED' }).getByRole('spinbutton').fill('0');
    await page.getByRole('row', { name: '2 5\'\' Vortices Ex Fan 4 2 AED' }).getByRole('spinbutton').click();
    await page.getByRole('row', { name: '2 5\'\' Vortices Ex Fan 4 2 AED' }).getByRole('spinbutton').fill('1');
    await page.getByRole('dialog').click();
    await page.getByRole('dialog').click();
    
})