export default class HomePage {
    visit() {
        cy.visit("/", {failOnStatusCode: false});
        return this;
    }

    getDisplayedPostTitles() {
        return cy.get('.post-title');
    }

    displayedPostsShouldContain(string) {
        this.getDisplayedPostTitles().contains(string);
        return this
    }

    getLoginButton() {
        return cy.get('#login');
    }

    getLogoutButton() {
        return cy.get('#logout');
    }

    clickLogoutButton() {
        this.getLogoutButton().click();
        return this;
    }

    clickLoginButton() {
        this.getLoginButton().click();
        return this;
    }
}