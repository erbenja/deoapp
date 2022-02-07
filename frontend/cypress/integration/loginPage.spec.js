/// <reference types="cypress" />

import AdministrationPage from "../pageObjects/AdministrationPage";
import AdminUsersPage from "../pageObjects/AdminUsersPage";
import LoginPage from "../pageObjects/LoginPage"
import { waitForRedirection } from "../utils/common.checks";

describe('Login through Login page', () => {
  it('should authorize and user can visit administration', () => {
    const loginPage = new LoginPage();
    loginPage.visit().logIn('admin', 'password');

    const adminPage = new AdministrationPage();
    adminPage.clickUsersButton();

    waitForRedirection('/admin/users');

    const usersPage = new AdminUsersPage();
    usersPage.displayedUsersShouldContain('Adam')
    .displayedUsersShouldContain('Novotny');
  })

  it('should stay on login page on invalid password', (done) => {
    cy.on('uncaught:exception', (err, runnable) => {
      expect(err.message).to.include('401')
      done()
      return false
    })

    const loginPage = new LoginPage();
    loginPage.visit()
      .typeUsername('admin')
      .typePassword('NOTpassword')
      .clickLoginButton({failOnStatusCode: false});
    waitForRedirection('/login');
  })
})

describe('Login through send request', () => {

  it('should return 401 on invalid login data', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/login',
      body: JSON.stringify({ username: 'admin', password: 'NOTpasswosrd' }),
      failOnStatusCode: false})
      .then((response) => {
          expect(response.status).to.eq(401)
        }
      )
    })

    it('should return 201 on valid username and password', () => {
    cy.request('POST', 'http://localhost:3000/api/auth/login', { username: 'admin', password: 'password'})
    .then((response) => {
      expect(response.status).to.eq(201)
    }
  )
  })
})