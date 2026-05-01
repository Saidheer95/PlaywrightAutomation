const { TestDataGenerator } = require('../utils/TestDataGenerator');
class PurchaseOrder {
    constructor(page) {
        this.page = page;
        // Define locators for purchase order elements
        this.purchaseOrderMenu = "a[href='/po-landing']";

        this.filtersExtPO = "input[aria-label='filter data by Ext. PO No.']";

        this.clickDeliveryNote = "button:has-text('Raise Delivery Note')";

        this.enterASNnumber = "input[name='asnNumber']";

        this.receiptDate = "#Receipts-list-date";

        this.selectCheckbox = "td.selection-cell input[type='checkbox']";
        this.enterValue = "input[type='number']";
        this.finalSubmit = "button:has-text('Submit')";


    }

    async createPurchaseOrderNew() {
        // Wait for page stability
        await this.page.waitForLoadState('networkidle');

        // Navigate to Purchase Orders
        await this.page.waitForSelector(this.purchaseOrderMenu, { state: 'visible' });
        await this.page.click(this.purchaseOrderMenu);

        // Wait for filter input
        await this.page.waitForSelector(this.filtersExtPO, { state: 'visible' });

        await this.page.fill(this.filtersExtPO, this.po_value, { delay: 200 });

        await this.page.locator(`span[title="${this.po_value}"]`).click();

        await this.page.click(this.clickDeliveryNote);

        const asnNumber = TestDataGenerator.randomNumber();
        await this.page.fill(this.enterASNnumber, asnNumber, { delay: 2000 });

        await this.page.click(this.receiptDate);

        await this.page.fill(this.receiptDate, "18/04/2026", { delay: 2000 });

        await this.page.keyboard.press('Enter');

        // await this.page.click(this.selectCheckbox);
        // await this.page.fill(this.enterValue, "1", { delay: 200 });


        const rows = this.page.locator('table tbody tr:not(.disable-row)');
        const rowCount = await rows.count();

        let targetRowFound = false;

        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);
            const qtyInput = row.locator('input[type="number"]');

            if (await qtyInput.count() > 0 && await qtyInput.isEnabled()) {

                // Fill quantity first
                await qtyInput.fill("1");

                // Then click checkbox (force needed due to overlay)
                await row
                    .locator('.selection-cell input[type="checkbox"]')
                    .check({ force: true });

                targetRowFound = true;
                break;
            }
        }

        if (!targetRowFound) {
            throw new Error('No active (non-disabled) row found to process');
        }

        await this.page.click(this.finalSubmit);


        console.log("Purchase order creation process completed successfully.");
        console.log("Entered ASN Number: " + asnNumber);
    }
}
module.exports = PurchaseOrder;
