export default class AdminPostsCreatePage {
    visit() {
        cy.visit("/admin/posts/create", {failOnStatusCode: false});
        return this;
    }

    typeTitle(title) {
        cy.get('input#title').type(title);
        return this;
    }

    typeContent(content) {
        cy.get('input#content').type(content);
        return this;
    }

    clickSaveButton() {
        cy.get('.container button').click();
        return this;
    }

    createPost({title = "", content = ""}) {
        this.typeTitle(title)
        .typeContent(content)
        .clickSaveButton
    }
}