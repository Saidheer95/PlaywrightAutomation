class loginPage {

    constructor(page) {
        this.page = page;
        this.username = "input[name='username']";
        this.password = "input[name='password']";
        this.signInButton = "button:has-text('Sign In')";


    }

    async LoginToApplication() {

        await this.page.fill(this.username, "prokrayateam@gmail.com", { delay: 200 })
        await this.page.fill(this.password, "Test@123", { delay: 300 })
        await this.page.click(this.signInButton)

    }
}
module.exports = loginPage;