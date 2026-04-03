class logoutPage {
    constructor(page) {
        this.page = page;
        this.userDropdownToggle = page.locator('.user-icon-drodown');
        this.userDropdownMenu = page.locator('.user-dropdown-menu.dropdown-menu.dropdown-menu-right');
        this.logoutButton = page.locator('.menu-option.dropdown-item').filter({ hasText: /logout/i });
    }

    async LogoutFromApplication() {
        // Wait for page to be fully loaded
        await this.page.waitForLoadState('networkidle');

        // Wait for the user dropdown toggle to be visible
        await this.userDropdownToggle.waitFor({ state: 'visible' });

        // Click to open the user dropdown
        await this.userDropdownToggle.click();

        // Wait for the dropdown menu to be visible/open
        await this.userDropdownMenu.last().waitFor({ state: 'visible' });

        // Wait for logout button to be visible after dropdown opens
        await this.logoutButton.waitFor({ state: 'visible' });

        // Click Logout
        await this.logoutButton.click();
    }
}

module.exports = logoutPage;