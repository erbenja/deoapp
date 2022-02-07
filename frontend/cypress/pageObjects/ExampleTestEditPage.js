export default class ExampleTestEditPage {
    visit() {
        cy.visit("/creator/tests/-1/edit", {failOnStatusCode: false});
        return this;
    }

    selectQuestionType(type) {
        cy.get("input#questionType").parent().click()
        cy.get(".v-menu__content.menuable__content__active").contains(type).click({force:true})
        return this;
    }

    getAddQuestionButton() {
        return cy.get('#addQuestion');
    }

    clickAddQuestionButton() {
        cy.getAddQuestionButton().click();
        return this;
    }

    getQuestionButtons() {
        return cy.get('.v-tab');
    }
}