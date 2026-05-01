const { TestDataGenerator } = require('../utils/TestDataGenerator');
class RaiseReceiptPage {
    constructor(page) {
        this.page = page;
        this.clickRaisebutton = "button:has-text('Raise Receipt')";
        this.enterReceiptDate = "#Product-Receipt-Date";
        this.enterReceiptNumber = "input[name='recieptNumber']";
        this.selectCheckbox = "td.selection-cell input[type='checkbox']";
        this.enterValue = "input[type='number']";
        this.finalSubmit = "button:has-text('Add')";
    }

    async raiseReceipt() {
        await this.page.waitForLoadState('networkidle');
        await this.page.click(this.clickRaisebutton);

        await this.page.click(this.enterReceiptDate);
        await this.page.fill(this.enterReceiptDate, "16-04-2026", { delay: 200 });
        await this.page.keyboard.press('Enter');

        const receiptNumber = TestDataGenerator.randomReceiptNumber();
        await this.page.fill(this.enterReceiptNumber, receiptNumber, { delay: 200 });
        console.log("Entered Receipt Number: " + receiptNumber);

        // await this.page.click(this.selectCheckbox);

        // await this.page.fill(this.enterValue, "1", { delay: 200 });


        const rows = this.page.locator('table tbody tr:not(.disable-row)');
        const rowCount = await rows.count();

        let rowHandled = false;

        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);

            // ✅ get the FIRST enabled number input in the row
            const qtyInput = row.locator('input[type="number"]:enabled').first();

            if (await qtyInput.count() > 0) {
                // ✅ Fill quantity
                await qtyInput.fill("1");

                // ✅ Check checkbox (force required due to table overlay)
                await row
                    .locator('.selection-cell input[type="checkbox"]')
                    .check({ force: true });

                rowHandled = true;
                break;
            }
        }

        if (!rowHandled) {
            throw new Error('No active receipt row found to enter quantity');
        }





        await this.page.click(this.finalSubmit);



    }
}
module.exports = RaiseReceiptPage;