/// <reference types="cypress" />

import AdministrationPage from "../pageObjects/AdministrationPage";
import LoginPage from "../pageObjects/LoginPage"

  // it('login page exists', () => {
  //   const loginPage = new LoginPage();
  //   loginPage.visit().logIn('admin', 'password');
  // })

  it('visit AdminUsers', () => {
    const loginPage = new LoginPage();
    loginPage.visit().logIn('admin', 'password');

    const adminPage = new AdministrationPage();
    adminPage.clickUsersButton().waitForRedirection('/admin/users');
  })
