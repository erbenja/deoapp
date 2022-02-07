export default class ExampleTestLobbyPage {
    visit() {
        cy.visit("/exampletest", {failOnStatusCode: false});
        return this;
    }

    clickEndTestButton() {
        cy.get('button#endTest').click();
        return this;
    }
}