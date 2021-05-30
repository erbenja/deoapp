import {IsBoolean, IsEnum, IsString} from "class-validator";
import {ApiResponseProperty} from "@nestjs/swagger";


export enum questionTypes {
    singleChoice = "singleChoice",
    multipleChoice = "multipleChoice",
    yesNo = "yesNo",
    description = "description",
    ordering = "ordering",

}

export class QuestionTypeDTO{

    id: number;

    @IsString()

    @IsEnum(questionTypes)
    type: questionTypes;

    @IsBoolean()
    serverEvaluation: boolean;
}

export class QuestionTypeRO{
    @ApiResponseProperty()
    id: number;
    @ApiResponseProperty()
    type: string;
    @ApiResponseProperty()
    serverEvaluation: boolean;
}
