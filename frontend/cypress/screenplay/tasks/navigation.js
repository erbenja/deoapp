import { createTask } from 'cypress-screenplay';
import AdminPostsCreatePage from '../../pageObjects/AdminPostsCreatePage';
import AdminUsersCreatePage from '../../pageObjects/AdminUsersCreatePage';
import AdminUsersPage from '../../pageObjects/AdminUsersPage';
import ExampleTestEditPage from '../../pageObjects/ExampleTestEditPage';

export const visitAdminUsersPage = createTask(() => {
    const adminUsersPage = AdminUsersPage();
    adminUsersPage.visit();
});

export const visitAdminUsersCreatePage = createTask(() => {
    const adminCreateUsersPage = AdminUsersCreatePage();
    adminCreateUsersPage.visit();
});

export const visitAdminPostsCreatePage = createTask(() => {
    const adminPostsCreatePage = AdminPostsCreatePage();
    adminPostsCreatePage.visit();
});

export const visitHomePage = createTask(() => {
    const adminPostsCreatePage = AdminPostsCreatePage();
    adminPostsCreatePage.visit();
});

export const visitExampleTestEditPage = createTask(() => {
    const page = new ExampleTestEditPage();
    page.visit();
});
