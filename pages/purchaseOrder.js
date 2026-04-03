import { TestDataGenerator } from '../utils/TestDataGenerator';
class PurchaseOrder {
    constructor(page) {
        this.page = page;
        // Define locators for purchase order elements
        this.purchaseOrderMenu = "a[href='/po-landing']";

        this.filtersExtPO = "input[aria-label='filter data by Ext. PO No.']";

        this.clickDeliveryNote = "button:has-text('Raise Delivery Note')";

        this.enterASNnumber= "input[name='asnNumber']";

        this.receiptDate="#Receipts-list-date";   
        
       this.selectCheckbox = "td.selection-cell input[type='checkbox']";
       this.enterValue = "input[type='number']";
       this.finalSubmit = "button:has-text('Submit')";

    
    }

    async createPurchaseOrder() {
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
    await this.page.fill(this.enterASNnumber, asnNumber, { delay: 200 });

    await this.page.click(this.receiptDate);

    await this.page.fill(this.receiptDate, "10/04/2026", { delay: 200 });  
    
    await this.page.keyboard.press('Enter');
    
    await this.page.click(this.selectCheckbox);

    const enteredValue = "1";
    await this.page.fill(this.enterValue, enteredValue, { delay: 200 });

    await this.page.click(this.finalSubmit);

    console.log("Purchase order creation process completed successfully.");
    console.log("Entered ASN Number: " + asnNumber);
    console.log("Entered Receipt Date: " + receiptDate);
    console.log("Selected checkbox and entered value: " + enteredValue);    
    }
}
    module.exports = PurchaseOrder;
