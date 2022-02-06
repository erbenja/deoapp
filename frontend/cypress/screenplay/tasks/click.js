import { createTask } from 'cypress-screenplay';
import AdminUsersPage from '../../pageObjects/AdminUsersPage';
import HomePage from '../../pageObjects/HomePage';

export const clickCreateNewUserButton = createTask(() => {
    const adminUsersPage = AdminUsersPage();
    adminUsersPage.clickCreateNewUserButton();
});

export const clickLogoutButton = createTask(() => {
    const homePage = HomePage();
    homePage.clickLogoutButton();
});
