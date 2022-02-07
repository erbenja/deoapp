import { Actor } from 'cypress-screenplay';
import { visitExampleTestEditPage } from "../../screenplay/tasks/navigation";
import { login } from "../../screenplay/tasks/login";
import { checkNumberOfQuestionsInTest } from '../../screenplay/questions/count';
import { clickAddQuestionButton } from '../../screenplay/tasks/click';
import { selectQuestionType } from '../../screenplay/tasks/select';

describe('Logout as admin.', () => {
    context('Given that Bob, the admin, is logged in and can visit Edit Example Test.', () => {
        const Bob = new Actor();

        before (() => {
            Bob.perform(login, ["admin", "password"]);
            Bob.perform(visitExampleTestEditPage);
            Bob.perform(checkNumberOfQuestionsInTest, 0);
        })

        context(`When he selects questionType and clicks Add Question`, () => {
            beforeEach(() => {
                Bob.perform(selectQuestionType, 'yesNo');
                Bob.perform(clickAddQuestionButton, 'yesNo');
            })

            it('Then Bob should see one more question', () => {
                Bob.perform(checkNumberOfQuestionsInTest, 1);
            });
        })
    })
});