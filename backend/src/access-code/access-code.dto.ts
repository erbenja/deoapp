import {Column, ManyToOne, OneToMany} from "typeorm";
import {ContestantEntity} from "../contestant/contestant.entity";
import {OlympiadRoundEntity} from "../olympiad-round/olympiad-round.entity";
import {AnsweredQuestionEntity} from "../answered-question/answered-question.entity";
import {AnsweredQuestionRO} from "../answered-question/answered-question.dto";
import {ContestantRO} from "../contestant/contestant.dto";
import {OlympiadRoundRO} from "../olympiad-round/olympiad-round.dto";
import {IsNotEmpty, IsString} from "class-validator";
import {ApiPropertyOptional, ApiResponseProperty} from "@nestjs/swagger";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";


export class AccessCodeDTO {
    id: number;

    // @IsNotEmpty()
    // @IsString()
    code?: string;

    activated?: Date;
    testStart?: Date;
    @ApiModelProperty()
    contestantId?: number;
    @ApiModelProperty()
    roundId?: number;
    answeredQuestionIds?: number[]
}

export class AccessCodeRO {
    @ApiResponseProperty()
    id: number;
    @ApiPropertyOptional()
    code: string;
    @ApiResponseProperty()
    activated: Date;
    @ApiResponseProperty()
    testStart: Date;
    @ApiResponseProperty()
    evaluated: Date;
    @ApiPropertyOptional({type: ContestantRO})
    contestant?: ContestantRO;
    @ApiResponseProperty({type: OlympiadRoundRO})
    round?: OlympiadRoundRO;
    @ApiResponseProperty({type: [AnsweredQuestionRO]})
    answeredQuestions?: AnsweredQuestionRO[]
}
