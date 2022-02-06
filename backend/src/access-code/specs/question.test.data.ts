import { questionTypes } from "../../question-type/question-type.dto"
import { QuestionTypeEntity } from '../../question-type/question-type.entity';
import { QuestionOptionEntity } from "../../question-option/question-option.entity";
import { QuestionEntity } from '../../question/question.entity';
import { AnsweredQuestionEntity } from '../../answered-question/answered-question.entity';

export function transformAnswerData(data) {
    const type = questionTypes[data.question.type];
    const qType: QuestionTypeEntity = {
        ...data.question.type,
        type
    }

    const option = new QuestionOptionEntity();
    Object.assign(option, data.question.options[0]);

    const question = new QuestionEntity();
    Object.assign(question, {...data.question, options: [option]});

    const answer = new AnsweredQuestionEntity();
    Object.assign(answer, {...data, question});

    return answer;

}

export const data = {
    answer: {id: 1},
    question: {
        id: 1,
        task: "",
        points: 2,
        orderNum: 1,
        lastModified: "2021-03-01T09:54:35.562Z",
        created: "2020-08-12T13:05:41.547Z",
        img: null,
        options: [
            {
                id: 1,
                content: "content",
                img: null,
                correct: 1
            },
            {
                id: 2,
                content: "content",
                img: null,
                correct: 0
            },
            {
                id: 3,
                content: "content",
                img: null,
                correct: 0
            },
            {
                id: 4,
                content: "content",
                img: null,
                correct: 0
            }
        ],
        type: {
            id: 1,
            type: "singleChoice",
            serverEvaluation: true
        }
    }
}