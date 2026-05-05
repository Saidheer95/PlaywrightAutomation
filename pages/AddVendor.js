class addVendor {
    constructor(page) {
        this.page = page;
        this.clickVendorsTab = "ul.special-tabs li.nav-item:has-text('Vendors')";
        this.clickAddVendor = "button:has-text('+ Add Vendors')";
        this.searchVendor = "[aria-label='filter data by Vendor Name']";
        this.selectCheckbox = "span.MuiIconButton-label input[type='checkbox']";
        this.clickSelectButton = "button:has-text('Select')";
    }

    async addVendor(){
        await this.page.waitForLoadState('networkidle');
        const vendorsTab = this.page.locator(this.clickVendorsTab);     
        await vendorsTab.waitFor({ state: 'visible' });
        await vendorsTab.click();
        await this.page.click(this.clickAddVendor);
        await this.page.fill(this.searchVendor, "Testvendor", { delay: 200 });
        const rowCheckbox = this.page.locator(`tr:has-text("Testvendor") input[type='checkbox']`).first();
        await rowCheckbox.waitFor({ state: 'visible' });
        await rowCheckbox.click();
        await this.page.click(this.clickSelectButton);
    }
}

module.exports = addVendor;
