export default class LoginPage {
    visit() {
        cy.visit("/login", {failOnStatusCode: false});
        return this;
    }

    typeUsername(username) {
        cy.get('input#username').type(username);
        return this;
    }

    typePassword(password) {
        cy.get('input#password').type(password);
        return this;
    }

    clickLoginButton() {
        cy.get('button[type=submit]').click();
        return this;
    }

    logIn(username, password) {
        this.typeUsername(username).typePassword(password).clickLoginButton();
        return this;
    }
}