import { TestDataGenerator } from '../utils/TestDataGenerator';
class createVendor {

   constructor(page) {
      this.page = page;
      this.clickVendor = "a[href='/supplier']"
      this.clickCreateVendor = "button:has-text('Create Vendor')";
      this.organizationName = "input[name='selectedSupplierName']";
      this.address = "input[name='selectedAddress']";
      this.businessType = "div.select__control:has-text('Select Type')";
      this.city = "input[name='selectedCity']";
      this.emirate = "div.select__control:has-text('Select Emirate')";
      this.license = "input[name='selectedLicenceNo']";
      this.zipcode = "input[name='selectedPostalCode']";
      this.placeOfIssue="div.select__control:has-text('Select Place of Issue')";
      this.incorporationDate="input[id='Incorporation-Date']";
      this.contactname="input[name='selectedContactName']";
      this.contactemail="input[name='selectedContactEmail']";
      this.contactPhone="input[type='tel']";
      this.submitButton="div.fixed-footer button:has-text('Create')"


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
         license: TestDataGenerator.randomLicenseNumber(),
         zipcode: TestDataGenerator.randomZip(),
         contactname: `Contact_${TestDataGenerator.randomString(4)}`,
         contactEmail: TestDataGenerator.randomEmail(),
         contactPhone: TestDataGenerator.randomPhoneNumber()
      };

      await this.page.fill(this.organizationName, vendorData.organization);
      await this.page.fill(this.address, vendorData.address);

      await this.page.click(this.businessType);
      await this.page.click("div.select__option:has-text('CO-Op Society')");

      await this.page.fill(this.city, vendorData.city);

      const emirateDropdown = this.page.locator(this.emirate);
      await emirateDropdown.waitFor({ state: 'visible'});
      await emirateDropdown.click();
      await this.page.click("div.select__option:has-text('Abu Dhabi')");

      await this.page.fill(this.license, vendorData.license);
      await this.page.fill(this.zipcode, vendorData.zipcode);
      await this.page.click(this.placeOfIssue);
      await this.page.click("div.select__option:has-text('Abu Dhabi')");
      await this.page.fill(this.incorporationDate, '18-03-2026');
      await this.page.fill(this.contactname, vendorData.contactname);
      await this.page.fill(this.contactemail, vendorData.email);
      await this.page.fill(this.contactPhone, vendorData.contactPhone);
      await this.page.click(this.submitButton);


      return vendorData;


   }
}
module.exports = createVendor;