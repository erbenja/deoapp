import {QuestionRO} from "../question/question.dto";
import {IsDate, IsJSON, IsObject} from "class-validator";
import {EvaluatedQuestionRO} from "../evaluated-question/evaluated-question.dto";
import {AccessCodeRO} from "../access-code/access-code.dto";
import {ApiModelProperty, ApiResponseModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {ApiPropertyOptional, ApiResponseProperty} from "@nestjs/swagger";
import {GuaranteeRO} from "../guarantee/guarantee.dto";


export class AnsweredQuestionDTO{
    id: number;

    @IsObject()
    @ApiModelProperty()
    answer: any;

    // @IsDate()
    // @ApiModelProperty()
    lastModified: Date;

    // @IsDate()
    // @ApiModelProperty()
    created: Date;

    @ApiModelProperty()
    accessCodeId?: number

    @ApiPropertyOptional()
    questionId?: number;
    // evaluationId?: number;
}

export class AnsweredQuestionRO{
    @ApiResponseProperty()
    id: number;
    @ApiResponseProperty()
    answer: {};
    @ApiResponseProperty()
    lastModified: Date;
    @ApiResponseProperty()
    created: Date;
    @ApiResponseProperty({type: () => AccessCodeRO})
    accessCode?: AccessCodeRO
    @ApiResponseProperty({type: QuestionRO})
    question?: QuestionRO;
    @ApiResponseProperty({type: () => EvaluatedQuestionRO})
    evaluation?: EvaluatedQuestionRO;

}
