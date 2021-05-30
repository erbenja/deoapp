import {IsBoolean, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {OlympiadRoundRO} from "../olympiad-round/olympiad-round.dto";
import {CategoryRO} from "../category/category.dto";
import {Column, ManyToOne, OneToMany} from "typeorm";
import {TestRO} from "../test/test.dto";
import {QuestionOptionRO} from "../question-option/question-option.dto";
import {QuestionTypeRO} from "../question-type/question-type.dto";
import {BaseRO} from "../shared/base-ro";
import {ApiPropertyOptional, ApiResponseProperty} from "@nestjs/swagger";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {PermissionTypeRO} from "../permission-type/permission-type.dto";

export class QuestionDTO {
    id: number;
    // @IsString()
    @ApiPropertyOptional()
    task: string;
    // @IsNumber()
    @ApiPropertyOptional()
    points: number;
    // @IsNumber()
    @ApiPropertyOptional()
    orderNum: number;
    lastModified: Date;
    created: Date;
    @ApiPropertyOptional()
    img: string;
    // @IsNumber()
    optionIds: number[];
    // @IsNumber()
    @ApiModelProperty()
    typeId: number;
    // @IsNumber()
    @ApiModelProperty()
    testId: number;
}

export class QuestionRO extends BaseRO{
    @ApiResponseProperty()
    id: number;
    @ApiResponseProperty()
    task: string;
    @ApiResponseProperty()
    points?: number;
    @ApiResponseProperty()
    orderNum: number;
    @ApiResponseProperty()
    img?: string;
    @ApiResponseProperty()
    lastModified: Date;
    @ApiResponseProperty()
    created: Date;

    @ApiResponseProperty({type:TestRO})
    test?: TestRO;
    @ApiResponseProperty({type:[QuestionOptionRO]})
    options?: QuestionOptionRO[];
    @ApiResponseProperty({type:QuestionTypeRO})
    type?: QuestionTypeRO;
    //TODO
    // answeredQuestions?: AnsweredQuestionRO[];
    updatedId?: number;
}

export class QuestionOrderDTO{
    testId: number;
    questionIds: number[];
}



