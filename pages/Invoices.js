import { TestDataGenerator } from '../utils/TestDataGenerator';

class Invoice {
    constructor(page) {
        this.page = page;
        this.clickInovices = "span:has-text('Invoices')";
        this.clickCreateInvoice = "button:has-text('Create NON-PO Invoice')";
        this.searchInvoice = '[data-testid="input-vendor-search"]';
        this.selectDpt = '[data-testid="select-department"]';
        this.enterInvoiceNumber = '[data-testid="input-invoice-number"]';
        this.enterInvoiceDate = '[data-testid="input-invoice-date"]';
        this.enterInvocieDesc = '[data-testid="input-description"]';
        this.enterReason = '[data-testid="input-reason"]';
        this.selectBudget = '[data-testid="select-budget"]';
        this.selectPymentTerm = '[data-testid="select-payment-terms"]';
        this.addInvoiceline = '[data-testid="button-add-line"]';
        this.selectItem = '[data-testid="button-select-item"]';
        this.selectDeliveryDate = '[data-testid="input-line-delivery-date"]';
        this.selectUOM = '[data-testid="select-line-uom"]';
        this.enterOrdereQuantity = '[data-testid="input-line-order-qty"]';
        this.enterLineCost = '[data-testid="input-line-unit-cost"]';
        this.saveLine = '[data-testid="button-save-line"]';
        this.uploadInvoice = 'input[type="file"]'; 
        this.termsAndConditionCheckbox = '[data-testid="checkbox-terms"]';
        this.finalSubmit = '[data-testid="button-submit-invoice"]';
    }

    async createInvoice() {
        await this.page.waitForLoadState('networkidle');

        // Navigation
        await this.page.click(this.clickInovices);
        await this.page.click(this.clickCreateInvoice);

        
        await this.page.fill(this.searchInvoice, "Comp_e2be19a2");
        await this.page.waitForSelector('[data-testid^="vendor-option"]');
        await this.page.locator('[data-testid^="vendor-option"]').first().click();

        // Department
        await this.page.click(this.selectDpt);
        await this.page.click(`text=IT Department`);

        // Invoice Number
        const invoiceNumber = TestDataGenerator.randonmInvoicenumber();
        await this.page.fill(this.enterInvoiceNumber, invoiceNumber);
        console.log("Entered Invoice Number: " + invoiceNumber);

        
        await this.page.click('[data-testid="select-invoice-type"]');
        await this.page.waitForSelector('[role="option"]');
        await this.page.locator('[role="option"]').first().click();

        // Invoice Date
        await this.page.fill(this.enterInvoiceDate, "2026-03-01");
        await this.page.keyboard.press('Tab'); // trigger blur

        // Description & Reason
        await this.page.fill(this.enterInvocieDesc, "Test Invoice Description");
        await this.page.keyboard.press('Tab');

        await this.page.fill(this.enterReason, "Test Reason for Invoice");
        await this.page.keyboard.press('Tab');

        // Budget
        await this.page.click(this.selectBudget);
        await this.page.waitForSelector('[role="option"]');
        await this.page.locator('[role="option"]').first().click();

        // Payment Terms
        await this.page.click(this.selectPymentTerm);
        await this.page.waitForSelector('[role="option"]');
        await this.page.locator('[role="option"]').first().click();

        // ✅ File Upload (FIXED)
        const filePath = 'utils/uploads/invoice.pdf';
        await this.page.setInputFiles(this.uploadInvoice, filePath);

        // Wait for upload processing
        await this.page.waitForLoadState('networkidle');

        // Invoice Line

        for(let i=0; i<2; i++){
        await this.page.click(this.addInvoiceline);

        await this.page.click(this.selectItem);
        await this.page.waitForSelector('[role="option"]');
        await this.page.locator('[role="option"]').first().click();

        await this.page.fill(this.selectDeliveryDate, "2026-03-15");
        await this.page.keyboard.press('Tab');

        await this.page.click(this.selectUOM);
        await this.page.waitForSelector('[role="option"]');
        await this.page.locator('[role="option"]').first().click();

        await this.page.fill(this.enterOrdereQuantity, "10");
        await this.page.fill(this.enterLineCost, "100");

        await this.page.click(this.saveLine);
    }

        await this.page.waitForLoadState('networkidle');

        // IMPORTANT: trigger validation (hidden UI requirement)
        await this.page.click('body');

        // Terms checkbox
        await this.page.click(this.termsAndConditionCheckbox);

        //  Wait until submit is enabled (CRITICAL FIX)
        await this.page.waitForFunction(() => {
            const btn = document.querySelector('[data-testid="button-submit-invoice"]');
            return btn && !btn.disabled;
        });

        // Submit
        await this.page.click(this.finalSubmit);
    }
}

module.exports = Invoice;