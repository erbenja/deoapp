import { createQuestion } from 'cypress-screenplay';
import AdminUsersPage from '../../pageObjects/AdminUsersPage';
import HomePage from '../../pageObjects/HomePage';

const _ = require('lodash');

export const checkIfUserTableContains = createQuestion((_, strings) => {
    const adminUsersPage = AdminUsersPage();
    _.forEach(strings, string => adminUsersPage.userTableContains(string));
});

export const checkIfPostTitlesContains = createQuestion((_, strings) => {
    const homePage = HomePage();
    _.forEach(strings, string => homePage.userTableContains(string));
});

export const checkIfUrlContains = createQuestion((_, strings) => {
    _.forEach(strings, string => cy.url().contains(string));
});