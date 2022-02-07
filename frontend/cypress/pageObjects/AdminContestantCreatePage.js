export default class AdminContestantCreatePage {
    visit() {
        cy.visit("/guarantee/contestants/create", {failOnStatusCode: false});
        return this;
    }


    selectOlympiadYear(year) {
        cy.get("input#olympiadYear").parent().click()
        cy.get(".v-menu__content").contains(year).click()
        return this;
    }

    selectOlympiadYearDoesNotContain(year) {
        cy.get("input#olympiadYear").parent().click();
        cy.get(".v-menu__content").contains(year).should('not.exist');
        cy.get(".v-menu__content").contains('none').click({force:true})
        return this;
    }

    getInputFirstname() {
        return cy.get('input#firstname');
    }

    typeFirstname(firstname) {
        this.getInputFirstname().type(firstname);
        return this;
    }

    typeSurname(surname) {
        cy.get('input#surname').type(surname);
        return this;
    }

    typeEmail(email) {
        cy.get('input#email').type(email);
        return this;
    }

    typeClassNum(classNum) {
        cy.get('input#classNum').clear().type(classNum);
        return this;
    }

    getBirthDateInput() {
        return cy.get('input#birthDate');
    }

    typeBirthDate(date) {
        this.getBirthDateInput().type(date);
        return this;
    }
    cannotTypeBirthDate(date) {
        expect(date).contain('1st');
        return this;
    }

    selectSchool(school) {
        cy.get("input#school").parent().click()
        cy.get(".v-menu__content").contains(school).click()
        return this;
    }

    selectSchoolDoesNotContain(school) {
        cy.get("input#school").parent().click()
        cy.get(".v-menu__content").contains(school).should('not.exist');
        cy.get(".v-menu__content").contains('none').click({force:true})
        return this;
    }

    clickSaveButton() {
        cy.get('.container button').click({force: true});
        return this;
    }

    createContestant({olympiadYear, firstname, surname, email, classNum, birthDate, school}) {
        this.typeFirstname(firstname)
        .typeSurname(surname)
        .typeEmail(email)
        .selectOlympiadYear(olympiadYear)
        .selectSchool(school)
        .typeBirthDate(birthDate)
        .typeClassNum(classNum)
        .clickSaveButton();
    }
}