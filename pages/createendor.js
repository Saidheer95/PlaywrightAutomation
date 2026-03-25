import { TestDataGenerator } from '../utils/TestDataGenerator';
class createVendor {

   constructor(page) {
      this.page = page;
      this.clickVendor = "a[href='/supplier']"
      this.clickCreateVendor = "button:has-text('Create Vendor')";
      this.organizationName = "input[name='selectedSupplierName']";
      this.address = "input[name='selectedAddress']";
      this.emirate = "div.select__control:has-text(Select Emirate)";
      this.city = "input[name='selectedCity']";
      this.license = "input[name='selectedLicenceNo']";
      this.zipcode = "input[name='selectedPostalCode']";


   }



   async CreateTheVendor() {

      await this.page.waitForLoadState('networkidle');

      await this.page.waitForSelector(this.clickVendor, { state: 'visible' });
      await this.page.click(this.clickVendor);

      await this.page.waitForSelector(this.clickCreateVendor, { state: 'visible' });
      await this.page.click(this.clickCreateVendor);

      const vendorData = {
         organization: TestDataGenerator.randomCompanyName(),
         address: TestDataGenerator.randomAddress(),
         email: TestDataGenerator.randomEmail(),
         city: TestDataGenerator.randomCity(),
         zipcode: TestDataGenerator.randomZip(),
      };

      await this.page.fill(this.organizationName, vendorData.organization);
      await this.page.fill(this.address, vendorData.address);

      const emirateDropdown = this.page.locator(this.emirate);
      await emirateDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await emirateDropdown.click();
      await this.page.click("div.select__option:has-text('Abu Dhabi')");

      await this.page.fill(this.city, vendorData.city);
      await this.page.fill(this.license, "1234567890");
      await this.page.fill(this.zipcode, vendorData.zipcode);

      return vendorData;


   }
}
module.exports = createVendor;