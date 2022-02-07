import { Actor } from 'cypress-screenplay';
import { visitAdminUsersCreatePage, visitAdminUsersPage, visitHomePage } from "../../screenplay/tasks/navigation";
import { login } from "../../screenplay/tasks/login";
import { fillAndConfirmNewPost, fillAndConfirmNewUser } from '../../screenplay/tasks/fillForm';
import { checkIfPostTitlesContains, checkIfUserTableContains } from '../../screenplay/questions/contains';

describe('Create new user.', () => {
    const user = {
        firstname: 'Pavel',
        surname: 'Losicky',
        username: 'pavlos2',
        password: 'pavlos2',
        email: 'pavlos2@seznam.cz',
    };

    context('Given that Bob, the admin, is logged in and can visit the Create User page.', () => {
        const Bob = new Actor();

        before (() => {
            Bob.perform(login, ["admin", "password"]);
            Bob.perform(visitAdminUsersCreatePage);
        })

        context(`When he fills in New User form`, () => {
            beforeEach(() => {
                Bob.perform(fillAndConfirmNewUser, user);
            })

            it('Then Bob should see a new user in users table', () => {
                Bob.perform(visitAdminUsersPage);
                Bob.perform(checkIfUserTableContains, [user.firstname, user.surname]);
            });
        })
    })
});


describe('Create new post.', () => {
    const post = {
        title: 'New Post',
        content: 'Content of new Post',
    };

    context('Given that Bob, the admin, is logged in and can visit the Create Post page.', () => {
        const Bob = new Actor();

        before (() => {
            Bob.perform(login, ["admin", "password"]);
            Bob.perform(visitAdminUsersCreatePage);
        })

        context(`When he fills in New Post form`, () => {
            beforeEach(() => {
                Bob.perform(fillAndConfirmNewPost, post);
            })

            it('Then Bob should see a new post title on Home Page', () => {
                Bob.perform(visitHomePage);
                Bob.perform(checkIfPostTitlesContains, post.title);
            });
        })
    })
});