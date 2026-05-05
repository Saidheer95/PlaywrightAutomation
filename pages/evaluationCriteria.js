class evaluationCriteria { 
    constructor(page) {
        this.page = page;
        this.clickEvaluationCriteria = "ul.special-tabs li.nav-item:has-text('Evaluation Criteria')";
        this.clickAddWeightage = "button:has-text('+ Add Weightage')";
        this.enterTechnicalScore = "[data-testid='technical-score']";
        this.clicktechnicalSubmit="button:has-text('Submit')";
        this.clickAddCriteria = "button:has-text('+ Add Criteria')";
        this.clickCategoryDropdown = ".select__value-container";
        this.enterRequirment="[data-testid='requirement']";
        this.enterWeightagePoints="[data-testid='weightagePoints']";
        this.submitCriteria="button:has-text('Submit')";
    }

    async addEvaluationCriteria() {
        await this.page.waitForLoadState('networkidle');
        await this.page.click(this.clickEvaluationCriteria);
        await this.page.click(this.clickAddWeightage);  
        await this.page.fill(this.enterTechnicalScore, 70);
        await this.page.click(this.clicktechnicalSubmit);
        await this.page.click(this.clickAddCriteria);
        await this.page.click(this.clickCategoryDropdown);
        const categoryOption = this.page.locator(".select__option:has-text('Technical')");
        await categoryOption.waitFor({ state: 'visible' });
        await categoryOption.click();
        await this.page.fill(this.enterRequirment, "Test Requirement");
        await this.page.fill(this.enterWeightagePoints, "70");
        await this.page.click(this.submitCriteria);
    }   
}module.exports = evaluationCriteria;
