class AdministrationPage {
    visit() {
        cy.visit("/administration", {failOnStatusCode: false});
        return this;
    }

    getAdminButtons() {
        return cy.get('button.admin');
    }

    clickUsersButton() {
        cy.get('button.admin#AdminUsers').click();
        return this;
    }

    waitForRedirection(matchString) {
        cy.url().should('contain', matchString);
        return this;
    }

}

export default AdministrationPage