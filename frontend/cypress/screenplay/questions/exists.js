import { createQuestion } from 'cypress-screenplay';
import HomePage from '../../pageObjects/HomePage';

export const checkIfLoginButtonExists = createQuestion(() => {
    const homePage = HomePage();
    homePage.getLoginButton();
});