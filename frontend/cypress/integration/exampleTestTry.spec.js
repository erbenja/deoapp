/// <reference types="cypress" />

import AdministrationPage from "../pageObjects/AdministrationPage";
import AdminUsersPage from "../pageObjects/AdminUsersPage";
import ExampleTestLobbyPage from "../pageObjects/ExampleTestLobbyPage";
import { waitForRedirection } from "../utils/common.checks";

it('Can visit AdminUsers as Admin user', () => {
  const lobbyPage = new ExampleTestLobbyPage();
  lobbyPage.visit().clickStartTestButton();

  const adminPage = new AdministrationPage();
  adminPage.clickUsersButton();

  waitForRedirection('/admin/users');

  const usersPage = new AdminUsersPage();
  usersPage.displayedUsersShouldContain('Adam')
    .displayedUsersShouldContain('Novotny');
})