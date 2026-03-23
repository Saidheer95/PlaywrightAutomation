import { test, expect } from '@playwright/test';

test("Raise Invoice", async function ({ page }) {



    await page.goto('https://prokraya.ai/login')

    await page.getByTestId('input-email').fill('1995saidheer@gmail.com');

    await page.locator("input[id='password']").fill('Test@123');


    await page.getByTestId('button-login').click();

    await page.getByTestId('nav-purchase-orders').click();


    await page.getByTestId('input-search').fill('PO_03457', { delay: 200 });
    await page.getByTestId('row-po-PO_03457').click();


    const clickRaiseDN = page.getByTestId('button-raise-dn');
    await expect(clickRaiseDN).toBeVisible();
    await expect(clickRaiseDN).toBeEnabled();
    await clickRaiseDN.click();

    await page.getByTestId('input-dn-asn').fill('ASN_17888', { delay: 200 });

    const carrierDropdown = page.getByTestId('select-dn-carrier');
    await carrierDropdown.click();
    await page.getByText('DTDC').click();

    await page.getByTestId('input-dn-ship-date').fill('2026-03-13');

    await page.getByTestId('input-dn-arrival-date').fill('2026-03-16', { delay: 200 });

    const selectaddress = page.getByTestId('select-dn-ship-to');
    await selectaddress.click();
    await page.getByText('Head Quarters - Dubai').click();

    await expect(page.locator('[role="dialog"]')).toBeVisible();
    const clickDeliveryNote = page.getByTestId('button-dn-submit');

    await clickDeliveryNote.click();

    






})