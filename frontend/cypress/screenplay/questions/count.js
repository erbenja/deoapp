import { createQuestion } from 'cypress-screenplay';
import ExampleTestEditPage from '../../pageObjects/ExampleTestEditPage';

export const checkNumberOfQuestionsInTest = createQuestion((_, count) => {
    const page = ExampleTestEditPage();
    page.getQuestions().should('have.length', count);
});