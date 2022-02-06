import { Actor } from 'cypress-screenplay';
import { visitAdminUsersPage, visitHomePage } from "../../screenplay/tasks/navigation";
import { login } from "../../screenplay/tasks/login";
import { clickLogoutButton } from '../../screenplay/tasks/click';
import { checkIfLoginButtonExists, checkIfUrlContains } from '../../screenplay/questions/exists';

describe('Logout as admin.', () => {
    context('Given that Bob, the admin, is logged in and can visit the Home Page.', () => {
        const Bob = new Actor();

        before (() => {
            Bob.perform(login, ["admin", "password"]);
            Bob.perform(visitHomePage);
        })

        context(`When he click logout button`, () => {
            beforeEach(() => {
                Bob.perform(clickLogoutButton);
            })

            it('Then Bob should see a login button', () => {
                Bob.perform(visitHomePage);
                Bob.perform(checkIfLoginButtonExists);
            });

            it('Then Bob should should not be able to visit Administration Page', () => {
                Bob.perform(visitAdminUsersPage);
                Bob.perform(checkIfUrlContains, ['/login']);
            });
        })
    })
});