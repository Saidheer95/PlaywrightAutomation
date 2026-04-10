import { TestDataGenerator } from '../utils/TestDataGenerator';
class Invoice{
    constructor(page){
        this.page=page;
        this.clickInovices="span:has-text('Invoices')";
        this.clickCreateInvoice="button:has-text('Create NON-PO Invoice')";
        this.searchInvoice='[data-testid="input-vendor-search"]';
        this.selectDpt='[data-testid="select-department"]';
        this.enterInvoiceNumber='[data-testid="input-invoice-number"]';
        this.enterInvoiceDate='[data-testid="input-invoice-date"]';
        this.enterInvocieDesc='[data-testid="input-description"]';
        this.enterReason='[data-testid="input-reason"]';
        this.selectBudget='[data-testid="select-budget"]';
        this.selectPymentTerm='[data-testid="select-payment-terms"]';
        this.addInvoiceline='[data-testid="button-add-line"]';
        this.selectItem='[data-testid="button-select-item"]';
        this.selectDeliveryDate='[data-testid="input-line-delivery-date"]';
        this.selectUOM='[data-testid="select-line-uom"]';
        this.enterOrdereQuantity='[data-testid="input-line-order-qty"]';
        this.enterLineCost='[data-testid="input-line-unit-cost"]';
        this.saveLine='[data-testid="button-save-line"]';
        this.uploadInvoice='[data-testid="input-file-upload"]';
        this.termsAndConditionCheckbox='[data-testid="checkbox-terms"]';
        this.finalSubmit='[data-testid="button-submit-invoice"]';
    }

    async createInvoice(){
        await this.page.waitForLoadState('networkidle');
        await this.page.click(this.clickInovices);  
        await this.page.click(this.clickCreateInvoice);
        await this.page.fill(this.searchInvoice, "Comp_e2be19a2", { delay: 200 });
        // await this.page.click(`text=Test Vendor`);
        await this.page.click(this.selectDpt);
        await this.page.click(`text=IT Department`);

        const invoiceNumber = TestDataGenerator.randonmInvoicenumber();
        await this.page.fill(this.enterInvoiceNumber, invoiceNumber, { delay: 200 });
        console.log("Entered Invoice Number: " + invoiceNumber);

        await this.page.click(this.enterInvoiceDate);
        await this.page.fill(this.enterInvoiceDate, "2026-03-01", { delay: 200 });
        await this.page.keyboard.press('Enter'); 
        // Move focus away from the date field to trigger any on-blur events
        await this.page.fill(this.enterInvocieDesc, "Test Invoice Description", { delay: 200 });

        await this.page.fill(this.enterReason, "Test Reason for Invoice", { delay: 200 });
        // Add more steps as needed to complete the invoice creation process

        await this.page.click(this.selectBudget);

        
        await this.page.waitForSelector('[role="option"]');

        // Click the first budget option
        await this.page.locator('[role="option"]').first().click();

        await this.page.click(this.selectPymentTerm);       
        await this.page.waitForSelector('[role="option"]');     
        // Click the first payment term option
        await this.page.locator('[role="option"]').first().click();


        
        await this.page.click(this.addInvoiceline);
        await this.page.click(this.selectItem);
        await this.page.waitForSelector('[role="option"]'); 
        // Click the first item option
        await this.page.locator('[role="option"]').first().click();
        await this.page.click(this.selectDeliveryDate);
        await this.page.fill(this.selectDeliveryDate, "2026-03-15", { delay: 200 });
        await this.page.keyboard.press('Enter'); 
        await this.page.click(this.selectUOM);
        await this.page.waitForSelector('[role="option"]'); 
        // Click the first UOM option           
        await this.page.locator('[role="option"]').first().click();
        
        await this.page.fill(this.enterOrdereQuantity, "10", { delay: 200 });
        await this.page.fill(this.enterLineCost, "100", { delay: 200 });
        await this.page.click(this.saveLine);  

        // Upload an invoice file
        const filePath = 'utils/uploads/invoice.pdf'; // Update with the actual path to your invoice file 
        await this.page.setInputFiles(this.uploadInvoice, filePath); 
        
        await this.page.click(this.termsAndConditionCheckbox);
        await this.page.click(this.finalSubmit);
        
        console.log("Invoice creation process completed successfully.");
    }

}
module.exports = Invoice;