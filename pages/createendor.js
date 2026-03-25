class createVendor {

   constructor(page) {
      this.page = page;
      this.clickVendor = "a[href='/supplier']"
      this.clickCreateVendor = "button:has-text('Create Vendor')";



   }
   async CreateTheVendor() {

      await this.page.click(this.clickVendor);
      await this.page.click(this.clickCreateVendor);

   }


}
module.exports = createVendor;