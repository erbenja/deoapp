/// <reference types="cypress" />

import ExampleTestPage from "../pageObjects/ExampleTestPage";
import ExampleTestLobbyPage from "../pageObjects/ExampleTestLobbyPage";
import { waitForRedirection } from "../utils/common.checks";

it('Can visit AdminUsers as Admin user', () => {
  const lobbyPage = new ExampleTestLobbyPage();
  cy.on('window:confirm', () => true);
  lobbyPage.visit().clickStartTestButton();

  waitForRedirection('/exampletest');

  const testPage = new ExampleTestPage();
  testPage.clickEndTestButton();

  waitForRedirection('/exampletestend');
})