
export abstract class BaseRO {
    id: number;
    active?: number;
    status?: number;
}

export class ROargs {
    correctAnswers?: boolean;
    testNoQuestions?: boolean;
}
