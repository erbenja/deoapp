import AdminContestantCreatePage from '../../pageObjects/AdminContestantCreatePage';
import LoginPage from "../../pageObjects/LoginPage"
const params = require("../../fixtures/2-way-CreateContestant-output.json");

describe('Create New Contestant - [Parametrized]', () => {
    beforeEach(() => {
        const loginPage = new LoginPage();
        loginPage.visit().logIn('admin', 'password');
        // cy.wait(400);
    })

    params.filter(a => a.valid).forEach(param => {
        {
            it(`Should be able to create contestant`, () => {
                const page = new AdminContestantCreatePage();
                page.visit().createContestant(param)
                cy.url().should('contain', '/guarantee/contestants');
                cy.url().should('contain', '/view');
            });
        }
    });

    params.filter(a => !a.valid).forEach(param => {
        {
            const { olympiadYear, firstname, surname, email, birthDate, classNum, school, invalidYear, invalidSchool } = param;
            it(`Should NOT be able to create contestant ${olympiadYear} ${firstname} ${surname} ${email} ${birthDate} ${classNum} ${school}`, () => {
                const page = new AdminContestantCreatePage();
                page.visit();

                if (firstname !== "-") page.typeFirstname(firstname)
                if (surname !== "-") page.typeSurname(surname)
                if (email !== "-") page.typeEmail(email)
                if (classNum !== "-") page.typeClassNum(classNum)

                if (!birthDate.includes("-")) page.cannotTypeBirthDate(birthDate)
                else if (birthDate !== "-") page.typeBirthDate(birthDate)

                if (invalidSchool) page.selectSchoolDoesNotContain(school)
                else page.selectSchool(school)

                if (invalidYear) page.selectOlympiadYearDoesNotContain(olympiadYear)
                else page.selectOlympiadYear(olympiadYear)


                page.clickSaveButton()
                cy.url().should('contain', '/guarantee/contestants/create');
            });
        }
    });
});