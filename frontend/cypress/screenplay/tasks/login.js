import { createTask } from 'cypress-screenplay';
import LoginPage from '../../pageObjects/LoginPage';
import HomePage from '../../pageObjects/HomePage';

export const login = createTask((_, [username, password]) => {
    const loginPage = new LoginPage();
    loginPage.visit().logIn(username, password);
});

export const logout = createTask(() => {
    const homePage = new HomePage();
    homePage.visit().logout();
});