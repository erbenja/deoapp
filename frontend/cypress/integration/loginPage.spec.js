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

it('Entering invalid username should keep user on login page', () => {
  const loginPage = new LoginPage();
  loginPage.visit().logIn('NOTEXISTING', 'password');

  waitForRedirection('/login');
})

it('Entering invalid username should keep user on login page', () => {
  const loginPage = new LoginPage();
  loginPage.visit().logIn('admin', 'NOTpassword');

  waitForRedirection('/login');
})
