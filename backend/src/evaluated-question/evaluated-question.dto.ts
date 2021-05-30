import {Column, ManyToOne, OneToOne} from "typeorm";
import {AccountEntity} from "../account/account.entity";
import {AnsweredQuestionEntity} from "../answered-question/answered-question.entity";
import {IsBoolean, IsNumber, IsString} from "class-validator";
import {AccountRO} from "../account/account.dto";
import {AnsweredQuestionRO} from "../answered-question/answered-question.dto";
import {ApiPropertyOptional, ApiResponseProperty} from "@nestjs/swagger";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {RegionRO} from "../region/region.dto";


export class EvaluatedQuestionDTO{
    id: number;

    // @IsNumber()
    @ApiModelProperty()
    points: number;

    // @IsString()
    @ApiModelProperty()
    note: string;

    // @IsBoolean()
    @ApiModelProperty()
    closed: boolean;

    created: Date;

    lastModified: Date;

    evaluatorId: number;

    @ApiPropertyOptional()
    answerId: number;
}


export class EvaluatedQuestionRO{
    @ApiResponseProperty()
    id: number;
    @ApiResponseProperty()
    points: number;
    @ApiResponseProperty()
    note: string;
    @ApiResponseProperty()
    closed: boolean;
    @ApiResponseProperty()
    created: Date;
    @ApiResponseProperty()
    lastModified: Date;
    @ApiResponseProperty({type: () => AccountRO})
    evaluator?: AccountRO;
    @ApiPropertyOptional({type: () => AnsweredQuestionRO})
    answeredQuestion?: AnsweredQuestionRO;
}
