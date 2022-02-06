

export function waitForRedirection(matchString) {
    cy.url().should('contain', matchString);
}
