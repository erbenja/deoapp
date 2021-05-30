import {IsBoolean, IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {PostTagDTO, PostTagRO} from "../post-tag/post-tag.dto";
import {AccountDTO} from "../account/account.dto";
import {OlympiadRoundRO} from "../olympiad-round/olympiad-round.dto";
import {CategoryRO} from "../category/category.dto";
import {QuestionRO} from "../question/question.dto";
import {BaseRO} from "../shared/base-ro";
import {ApiResponseProperty} from "@nestjs/swagger";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {DistrictRO} from "../district/district.dto";

export class TestDTO {
    id: number;

    // @IsNotEmpty()
    // @IsNumber()
    @ApiModelProperty()
    timeLimit: number;

    // @IsNotEmpty()
    // @IsBoolean()
    @ApiModelProperty()
    closed: boolean;

    categoryId: number;
    roundId?: number;
    lastModified?: Date;
    created?: Date;
}

export class TestRO extends BaseRO{
    @ApiResponseProperty()
    id: number;
    @ApiResponseProperty()
    timeLimit: number;
    @ApiResponseProperty()
    closed: boolean;
    @ApiResponseProperty()
    lastModified: Date;
    @ApiResponseProperty()
    created: Date;
    @ApiResponseProperty({type:OlympiadRoundRO})
    round?: OlympiadRoundRO;
    @ApiResponseProperty({type:CategoryRO})
    category?: CategoryRO;
    @ApiResponseProperty({type:[QuestionRO]})
    questions?: QuestionRO[];
}
