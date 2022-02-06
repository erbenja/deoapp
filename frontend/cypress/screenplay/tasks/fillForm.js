import { createTask } from 'cypress-screenplay';
import AdminPostsCreatePage from '../../pageObjects/AdminPostsCreatePage';
import AdminUsersCreatePage from '../../pageObjects/AdminUsersCreatePage';

export const fillAndConfirmNewUser = createTask((_, user) => {
    const page = AdminUsersCreatePage();
    page.createUser(user);
});

export const fillAndConfirmNewPost = createTask((_, post) => {
    const page = AdminPostsCreatePage();
    page.createPost(post);
});