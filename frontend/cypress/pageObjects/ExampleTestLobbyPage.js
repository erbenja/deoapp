export default class ExampleTestLobbyPage {
    visit() {
        cy.visit("/exampletestlobby", {failOnStatusCode: false});
        return this;
    }

    clickStartTestButton() {
        cy.get('button#startTest').click();
        return this;
    }

    clickReturnButton() {
        cy.get('button#return').click();
        return this;
    }
}