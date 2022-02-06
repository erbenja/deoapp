const _ = require('lodash');

export default class AdminUsersPage {
    visit() {
        cy.visit("/admin/users", {failOnStatusCode: false});
        return this;
    }

    getCreateButton() {
        return cy.get('#create-new');
    }

    clickCreateNewUserButton() {
        cy.getCreateButton().click();
        return this;
    }

    getDisplayedUsers() {
        return cy.get('tbody');
    }

    displayedUsersShouldContain(string) {
        this.getDisplayedUsers().contains(string);
        return this
    }
}