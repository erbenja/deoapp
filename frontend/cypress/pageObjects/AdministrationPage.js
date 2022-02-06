export default class AdministrationPage {
    visit() {
        cy.visit("/admin", {failOnStatusCode: false});
        return this;
    }

    getAdminButtons() {
        return cy.get('button.admin');
    }

    clickUsersButton() {
        cy.get('button.admin#AdminUsers').click();
        return this;
    }
}