const { test, expect } = require('@playwright/test')
const LoginPage = require('../pages/loginPage')
const CreateVendor = require('../pages/createendor')
const config = require('../config.json')

const { writeVendorOrganization } = require('../utils/logger');


test("Verify the vendor creation functionality", async function ({ page }) {

    // Navigate to the application URL from config
    await page.goto(config.baseUrl)

    // Login using page object and credentials
    const loginPage = new LoginPage(page);
    await loginPage.LoginToApplication("prokrayateam@gmail.com", "Test@123");

    // Create vendor flow using page object, this method fills the form and submits
    const createVendor = new CreateVendor(page);
    const vendorData = await createVendor.CreateTheVendor();

    // Log vendor details for reference
    console.log('Vendor created successfully with details:');
    console.log('   Organization:', vendorData.organization);
    console.log('   Email:', vendorData.email);
    console.log('   Contact Email:', vendorData.contactEmail);
    console.log('   Contact Phone:', vendorData.contactPhone);
    console.log('   City:', vendorData.city);
    console.log('   License:', vendorData.license);
    console.log('   Zipcode:', vendorData.zipcode);
    console.log('   Address:', vendorData.address);
    console.log('   Contact Name:', vendorData.contactname);

    
    writeVendorOrganization(vendorData.organization);


})
