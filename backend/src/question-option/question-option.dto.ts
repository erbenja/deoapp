import {Column, PrimaryGeneratedColumn} from "typeorm";
import {IsNumber, IsString} from "class-validator";
import {ApiPropertyOptional, ApiResponseProperty} from "@nestjs/swagger";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class QuestionOptionDTO {
    id: number;

    // @IsString()
    @ApiPropertyOptional()
    content: string;

    // @IsNumber()
    @ApiPropertyOptional()
    correct: number;

    // @IsNumber()
    @ApiModelProperty()
    questionId: number;

    @ApiPropertyOptional()
    img: string;

    active: number;
}

export class QuestionOptionRO {
    @ApiResponseProperty()
    id: number;
    @ApiResponseProperty()
    content: string;
    @ApiPropertyOptional()
    correct?: number;
    @ApiResponseProperty()
    img: string;
    // active: number;
    @ApiResponseProperty()
    questionId?: number;
}
