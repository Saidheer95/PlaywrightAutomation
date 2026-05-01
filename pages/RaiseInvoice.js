const { TestDataGenerator } = require('../utils/TestDataGenerator');
class RaiseInvoice{
    constructor(page){
        this.page = page;
        this.clickInovices = "button:has-text('Raise Invoice')";
        this.enterInvoiceDes='[data-testid="invDescription"]';
        this.eneterInvoiceNumber='[data-testid="invNumber"]';
        this.selectDueDate="input[id='Invoice-Due-Date']";
        this.selectReceipt="input[type='checkbox']";
        this.uploadInvoice="input[type='file']";
        this.calculateTotal='[alt="Calculate"]';
        this.selectterms="span[class='checkmark' ]";
        this.finalSubmit="button:has-text('Submit Invoice')";
        this.selectInvoiceSubmission=".confirm-dialog button:has-text('Yes')";        
    }
    async raiseInvoice(){
        await this.page.waitForLoadState('networkidle');
        await this.page.click(this.clickInovices);  
        await this.page.fill(this.enterInvoiceDes, "Test Invoice Description");
        const invoiceNumber = TestDataGenerator.randomInvoicenumber();
        await this.page.fill(this.eneterInvoiceNumber, invoiceNumber);
        console.log("Entered Invoice Number: " + invoiceNumber);        
        await this.page.click(this.selectDueDate);  
        await this.page.fill(this.selectDueDate, "2026-04-19", { delay: 200 });
        await this.page.keyboard.press('Enter');
        await this.page.click(this.selectReceipt);
        const filePath = 'utils/uploads/invoice.pdf';
        await this.page.setInputFiles(this.uploadInvoice, filePath);

        // await this.page.waitForFunction(() => {
        //     const input = document.querySelector("input[type='file']");
        //     return input && input.files.length > 0;
        // });
        // await this.page.waitForLoadState('networkidle');
        await this.page.click(this.calculateTotal);
        await this.page.click(this.selectterms);
        // await this.page.pause();
        await this.page.click(this.finalSubmit);
        await this.page.click(this.selectInvoiceSubmission);

    }
}
module.exports = RaiseInvoice;