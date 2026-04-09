import { TestDataGenerator } from '../utils/TestDataGenerator';
class RaiseReceiptPage{
    constructor(page){
        this.page=page;
        this.clickRaisebutton="button:has-text('Raise Receipt')";
        this.enterReceiptDate="#Product-Receipt-Date";
        this.enterReceiptNumber="input[name='recieptNumber']";
        this.selectCheckbox = "td.selection-cell input[type='checkbox']";
        this.enterValue = "input[type='number']";
        this.finalSubmit = "button:has-text('Add')";
    }

    async raiseReceipt(){
        await this.page.waitForLoadState('networkidle');
        await this.page.click(this.clickRaisebutton);

        await this.page.click(this.enterReceiptDate);
        await this.page.fill(this.enterReceiptDate, "02-04-2026", { delay: 200 });
        await this.page.keyboard.press('Enter');    

        const receiptNumber = TestDataGenerator.randomReceiptNumber();
        await this.page.fill(this.enterReceiptNumber, receiptNumber,{ delay: 200 });
        console.log("Entered Receipt Number: " + receiptNumber);
        
        await this.page.click(this.selectCheckbox);

        await this.page.fill(this.enterValue, "1", { delay: 200 });

        await this.page.click(this.finalSubmit);



    }
}
module.exports = RaiseReceiptPage;