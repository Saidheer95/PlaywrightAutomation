import TestDataGenerator from '../utils/TestDataGenerator';
class BidCreation{
    constructor(page){
        this.page = page;
        this.clickPurchaserequisition = "a[href='/sourcing']";
        this.filterPR="input[aria-label='filter data by Ext.PR No.']";
        this.clickBID="button:has-text('Create RFQ')";
        this.enterRFQOPenDate="#RFQ-Open-Date";
        this.enterRFQCloseDate="#RFQ-Close-Date";
        this.clickCheckbox="span[class='checkmark']";
        this.submitRFQ="button:has-text('Submit')";
        
    }

    async createBid(){
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForSelector(this.clickPurchaserequisition, { state: 'visible' });
        await this.page.click(this.clickPurchaserequisition);

        await this.page.waitForSelector(this.filterPR, { state: 'visible' });

        await this.page.fill(this.filterPR, this.pr_value, { delay: 200 });
        
        const selectpr='span:has-text("'+this.pr_value+'")';
        await this.page.locator(selectpr).click();
        

        await this.page.click(this.clickBID);

        const currentDate = new Date();
        const openDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
        const closeDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);    
        await this.page.fill(this.enterRFQOPenDate, openDate.toISOString().split('T')[0], { delay: 200 });
        await this.page.keyboard.press('Enter');
        await this.page.fill(this.enterRFQCloseDate, closeDate.toISOString().split('T')[0], { delay: 200 });
        await this.page.keyboard.press('Enter');    
        await this.page.click(this.clickCheckbox);
        await this.page.click(this.submitRFQ);  


    }
}module.exports = BidCreation;