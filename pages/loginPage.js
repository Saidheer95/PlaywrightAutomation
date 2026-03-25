class loginPage {

    constructor(page) {
        this.page = page;
        this.username = "input[name='username']";
        this.password = "input[name='password']";
        this.signInButton = "button:has-text('Sign In')";


    }

    async LoginToApplication(username, password) {

        // await this.page.fill(this.username, "prokrayateam@gmail.com", { delay: 200 })
        // await this.page.fill(this.password, "Test@123", { delay: 300 })
        
        if (username !== undefined) {
            await this.page.fill(this.username, username, { delay: 200 });
        }

        if (password !== undefined) {
            await this.page.fill(this.password, password, { delay: 300 });
        }


        await this.page.click(this.signInButton)

    }
}
module.exports = loginPage;