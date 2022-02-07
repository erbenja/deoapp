import { createTask } from 'cypress-screenplay';
import ExampleTestEditPage from '../../pageObjects/ExampleTestEditPage';

export const selectQuestionType = createTask((_, type) => {
    const page = ExampleTestEditPage();
    page.selectQuestionType(type);
});
