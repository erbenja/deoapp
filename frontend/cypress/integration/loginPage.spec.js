/// <reference types="cypress" />

import AdministrationPage from "../pageObjects/AdministrationPage";
import AdminUsersPage from "../pageObjects/AdminUsersPage";
import LoginPage from "../pageObjects/LoginPage"
import { waitForRedirection } from "../utils/common.checks";

it('Can visit AdminUsers as Admin user', () => {
  const loginPage = new LoginPage();
  loginPage.visit().logIn('admin', 'password');

  const adminPage = new AdministrationPage();
  adminPage.clickUsersButton();

  waitForRedirection('/admin/users');

  const usersPage = new AdminUsersPage();
  usersPage.displayedUsersShouldContain('Adam')
    .displayedUsersShouldContain('Novotny');
})
