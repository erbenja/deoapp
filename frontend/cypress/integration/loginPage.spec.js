/// <reference types="cypress" />

import AdministrationPage from "../pageObjects/AdministrationPage";
import AdminUsersPage from "../pageObjects/AdminUsersPage";
import LoginPage from "../pageObjects/LoginPage"
import { waitForRedirection } from "../utils/common.checks";

  // it('login page exists', () => {
  //   const loginPage = new LoginPage();
  //   loginPage.visit().logIn('admin', 'password');
  // })

  it('visit AdminUsers', () => {
    const loginPage = new LoginPage();
    loginPage.visit().logIn('admin', 'password');

    const adminPage = new AdministrationPage();
    adminPage.clickUsersButton();

    waitForRedirection('/admin/users');

    const usersPage = new AdminUsersPage();
    usersPage.displayedUsersShouldContain('Adam')
      .displayedUsersShouldContain('Novotny');
  })
