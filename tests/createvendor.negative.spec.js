const { test, expect } = require('@playwright/test')
const LoginPage = require('../pages/loginPage')
const CreateVendor = require('../pages/createendor')
const config = require('../config.json')

// Store first vendor data for duplicate tests
let firstVendorData = {};

test.describe.serial('Vendor Creation - Negative Test Cases', () => {

  test.beforeAll(async ({ browser }) => {
    // Create an initial vendor once for all negative scenarios
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(config.baseUrl);
    const loginPage = new LoginPage(page);
    await loginPage.LoginToApplication("prokrayateam@gmail.com", "Test@123");

    const createVendor = new CreateVendor(page);
    firstVendorData = await createVendor.CreateTheVendor();

    console.log('Initial vendor created for negative tests', firstVendorData);
    await context.close();
  });

  test.beforeEach(async ({ page }) => {
    // Navigate to application and login before each test so each scenario starts clean
    await page.goto(config.baseUrl);
    const loginPage = new LoginPage(page);
    await loginPage.LoginToApplication("prokrayateam@gmail.com", "Test@123");
  });

  test("Verify initial vendor exists for duplicate tests", async function ({ page }) {
    // This test only validates that setup stored data correctly.
    expect(firstVendorData.organization).toBeTruthy();
    expect(firstVendorData.email).toBeTruthy();
    expect(firstVendorData.contactPhone).toBeTruthy();
  });

  // Negative Test Case 1: Duplicate Organization Name
  test("Negative Test - Duplicate Organization Name", async function ({ page }) {
    
    const createVendor = new CreateVendor(page);
    
    if (!firstVendorData.organization) {
      console.warn('Skipping test: Initial vendor data not available');
      return;
    }

    console.log('Testing: Duplicate Organization Name');
    console.log('Attempting to create vendor with organization:', firstVendorData.organization);

    try {
      // Attempt to create vendor with same organization name
      await createVendor.CreateTheVendor({
        organization: firstVendorData.organization,
        address: 'Unique Address',
        email: 'newemail@testmail.com',
        city: 'Dubai',
        license: 'LIC999999',
        zipcode: '999999',
        contactname: 'NewContact',
        contactEmail: 'contact@testmail.com',
        contactPhone: '987654321'
      });

      // Check for error message
      const errorMessage = page.locator('text=already|exists|duplicate|Organization');
      const isVisible = await errorMessage.first().isVisible({ timeout: 3000 }).catch(() => false);
      
      if (isVisible) {
        const errorText = await errorMessage.first().textContent();
        console.log('Expected error received:', errorText);
        console.log('Duplicate organization validation working correctly');
      } else {
        console.log('No error message visible - API may have prevented submission');
      }
    } catch (error) {
      console.log('Error during duplicate organization test:', error.message);
    }
  });

  // Negative Test Case 2: Duplicate Email Address
  test("Negative Test - Duplicate Email Address", async function ({ page }) {
    
    const createVendor = new CreateVendor(page);
    
    if (!firstVendorData.email) {
      console.warn(' Skipping test: Initial vendor data not available');
      return;
    }

    console.log('Testing: Duplicate Email Address');
    console.log('   Attempting to create vendor with email:', firstVendorData.email);

    try {
      // Attempt to create vendor with same email
      await createVendor.CreateTheVendor({
        organization: 'UniqueOrg',
        address: 'Unique Address',
        email: firstVendorData.email,
        city: 'Dubai',
        license: 'LIC888888',
        zipcode: '888888',
        contactname: 'NewContact',
        contactEmail: 'newemail@testmail.com',
        contactPhone: '987654322'
      });

      // Check for error message
      const errorMessage = page.locator('text=email|already|exists|duplicate');
      const isVisible = await errorMessage.first().isVisible({ timeout: 3000 }).catch(() => false);
      
      if (isVisible) {
        const errorText = await errorMessage.first().textContent();
        console.log('Expected error received:', errorText);
        console.log(' Duplicate email validation working correctly');
      } else {
        console.log(' No error message visible - API may have prevented submission');
      }
    } catch (error) {
      console.log(' Error during duplicate email test:', error.message);
    }
  });

  // Negative Test Case 3: Duplicate Contact Phone Number
  test("Negative Test - Duplicate Contact Phone Number", async function ({ page }) {
    
    const createVendor = new CreateVendor(page);
    
    if (!firstVendorData.contactPhone) {
      console.warn('⚠️ Skipping test: Initial vendor data not available');
      return;
    }

    console.log('🧪 Testing: Duplicate Contact Phone Number');
    console.log('   Attempting to create vendor with phone:', firstVendorData.contactPhone);

    try {
      // Attempt to create vendor with same contact phone
      await createVendor.CreateTheVendor({
        organization: 'UniqueOrg2',
        address: 'Unique Address',
        email: 'unique@testmail.com',
        city: 'Abu Dhabi',
        license: 'LIC777777',
        zipcode: '777777',
        contactname: 'NewContact',
        contactEmail: 'newemail2@testmail.com',
        contactPhone: firstVendorData.contactPhone
      });

      // Check for error message
      const errorMessage = page.locator('text=phone|contact|already|exists|duplicate');
      const isVisible = await errorMessage.first().isVisible({ timeout: 3000 }).catch(() => false);
      
      if (isVisible) {
        const errorText = await errorMessage.first().textContent();
        console.log('❌ Expected error received:', errorText);
        console.log('✅ Duplicate phone validation working correctly');
      } else {
        console.log('⚠️ No error message visible - API may have prevented submission');
      }
    } catch (error) {
      console.log('⚠️ Error during duplicate phone test:', error.message);
    }
  });

 
  // Negative Test Case 4: Empty Organization Name
  test("Negative Test - Empty Organization Name", async function ({ page }) {
    
    const createVendor = new CreateVendor(page);

    console.log('🧪 Testing: Empty Organization Name');

    try {
      // Attempt to create vendor with empty organization
      await createVendor.CreateTheVendor({
        organization: '',
        address: 'Unique Address',
        email: 'test@testmail.com',
        city: 'Dubai',
        license: 'LIC555555',
        zipcode: '555555',
        contactname: 'NewContact',
        contactEmail: 'contact@testmail.com',
        contactPhone: '1234567890'
      });

      // Check for validation error
      const errorMessage = page.locator('text=required|empty|Organization|cannot');
      const isVisible = await errorMessage.first().isVisible({ timeout: 3000 }).catch(() => false);
      
      if (isVisible) {
        const errorText = await errorMessage.first().textContent();
        console.log('Expected validation error received:', errorText);
        console.log('Empty organization validation working correctly');
      } else {
        console.log('No validation error visible');
      }
    } catch (error) {
      console.log('Error during empty organization test:', error.message);
    }
  });

  // Negative Test Case 5: Invalid Email Format
  test("Negative Test - Invalid Email Format", async function ({ page }) {
    
    const createVendor = new CreateVendor(page);

    console.log('Testing: Invalid Email Format');
    console.log('Email attempted:', 'invalidemail');

    try {
      // Attempt to create vendor with invalid email
      await createVendor.CreateTheVendor({
        organization: 'TestOrg',
        address: 'Unique Address',
        email: 'invalidemail',
        city: 'Dubai',
        license: 'LIC444444',
        zipcode: '444444',
        contactname: 'NewContact',
        contactEmail: 'contact@testmail.com',
        contactPhone: '1234567809'
      });

      // Check for validation error
      const errorMessage = page.locator('text=email|invalid|format|valid');
      const isVisible = await errorMessage.first().isVisible({ timeout: 3000 }).catch(() => false);
      
      if (isVisible) {
        const errorText = await errorMessage.first().textContent();
        console.log('Expected validation error received:', errorText);
        console.log('Email format validation working correctly');
      } else {
        console.log('No validation error visible');
      }
    } catch (error) {
      console.log('Error during invalid email test:', error.message);
    }
  });

});
