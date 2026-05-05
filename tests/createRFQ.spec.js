const {test, expect} = require('@playwright/test')
const LoginPage = require('../pages/loginPage')
const CreateRFQ = require('../pages/purchaserequisitions')
const AddVendor =require('../pages/AddVendor')
const EvaluationCriteria=require('../pages/evaluationCriteria')
const config = require('../config.json')
const userData = require('../user_data.json');


test.describe('RFQ Creation - Positive Test Cases', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(config.baseUrl);
        const loginPage = new LoginPage(page);
        await loginPage.LoginToApplication("sai.prokraya@aqaar.com", "Aqaar@123");

    });

    test('Create RFQ from PR', async ({ page }) => {

        const createRFQ = new CreateRFQ(page);
        createRFQ.pr_value = userData.pr_value;
        await createRFQ.createBid();


        console.log("RFQ creation process completed successfully for the purchase requisition: " + userData.pr_value);

        const addVendor = new AddVendor(page);
        await addVendor.addVendor();

        const evaluationCriteria = new EvaluationCriteria(page);
        await evaluationCriteria.addEvaluationCriteria();
    }); 
})