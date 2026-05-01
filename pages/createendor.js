const { TestDataGenerator } = require('../utils/TestDataGenerator');
class createVendor {

   constructor(page) {
      this.page = page;
      // this.clickVendor = "a[href='/supplier']"
      this.clickVendor="a:has-text('Vendors')";
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

      // Ensure the page has finished loading resources before acting
      await this.page.waitForLoadState('networkidle');

      // Navigate to the supplier (vendor) page
      await this.page.waitForSelector(this.clickVendor, { state: 'visible' });
      await this.page.click(this.clickVendor);

      // Click the 'Create Vendor' button to open the creation form
      await this.page.waitForSelector(this.clickCreateVendor, { state: 'visible' });
      await this.page.click(this.clickCreateVendor);

      // Generate test data for vendor fields
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

      // Fill vendor details in the form fields
      await this.page.fill(this.organizationName, vendorData.organization);
      await this.page.fill(this.address, vendorData.address);

      // Select business type option from dropdown dynamically
      await this.page.click(this.businessType);
      const businessOptions = await this.page.locator("div.select__option").allTextContents();
      const chosenBusiness = businessOptions[Math.floor(Math.random() * businessOptions.length)];
      await this.page.click(`div.select__option:has-text('${chosenBusiness}')`);

      // Fill city name
      await this.page.fill(this.city, vendorData.city);

      // Select emirate from dropdown dynamically
      const emirateDropdown = this.page.locator(this.emirate);
      await emirateDropdown.waitFor({ state: 'visible'});
      await emirateDropdown.click();
      const emirateOptions = await this.page.locator("div.select__option").allTextContents();
      const chosenEmirate = emirateOptions[Math.floor(Math.random() * emirateOptions.length)];
      await this.page.click(`div.select__option:has-text('${chosenEmirate}')`);
      console.log('Selected Emirate:', chosenEmirate);
      
      // Fill remaining fields: license, zipcode, place of issue, incorporation date, contact details
      await this.page.fill(this.license, vendorData.license);
      await this.page.fill(this.zipcode, vendorData.zipcode);
      await this.page.click(this.placeOfIssue);
      await this.page.click("div.select__option:has-text('Abu Dhabi')");
      await this.page.fill(this.incorporationDate, '18-03-2026');
      await this.page.fill(this.contactname, vendorData.contactname);
      await this.page.fill(this.contactemail, vendorData.email);

      const normalizedPhone = vendorData.contactPhone.replace(/^\+971/, '').trim();
      await this.page.fill(this.contactPhone, normalizedPhone);


      // Submit the vendor creation form
      await this.page.click(this.submitButton);

      // Return the generated data for assertions in tests
      return vendorData;
   }
}
module.exports = createVendor;