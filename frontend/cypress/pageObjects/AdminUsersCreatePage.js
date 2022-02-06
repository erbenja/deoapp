export default class AdminUsersCreatePage {
    visit() {
        cy.visit("/admin/users/create", {failOnStatusCode: false});
        return this;
    }

    typeFirstname(firstname) {
        cy.get('input#firstname').type(firstname);
        return this;
    }

    typeSurname(surname) {
        cy.get('input#surname').type(surname);
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

    typeEmail(email) {
        cy.get('input#email').type(email);
        return this;
    }

    clickSaveButton() {
        cy.get('.container button').click();
        return this;
    }

    createUser({firstname = "", surname = "", username = "", password = "", email = ""}) {
        this.typeFirstname(firstname)
        .typeSurname(surname)
        .typeUsername(username)
        .typePassword(password)
        .typeEmail(email)
        .clickSaveButton
    }
}