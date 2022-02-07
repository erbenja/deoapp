import {Column, ManyToOne} from "typeorm";
import {SchoolEntity} from "../school/school.entity";
import {SchoolRO} from "../school/school.dto";
import {IsEmail, IsNumber, IsString, Min, Max, IsISO8601, IsNotEmpty, IsAlpha} from "class-validator";
import {AccessCodeRO} from "../access-code/access-code.dto";
import {ApiMethodNotAllowedResponse, ApiResponseProperty} from "@nestjs/swagger";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { Type } from "class-transformer";


export class ContestantDTO {
    id: number;

    @IsNotEmpty()
    @IsAlpha()
    @IsString()
    @ApiModelProperty()
    firstname: string;

    @IsNotEmpty()
    @IsAlpha()
    @IsString()
    @ApiModelProperty()
    surname: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiModelProperty()
    email: string;

    @IsNotEmpty()
    @IsISO8601()
    @ApiModelProperty()
    birthdate: Date;

    @IsNotEmpty()
    @IsNumber()
    @Min(8)
    @Max(13)
    @Type(() => Number)
    @ApiModelProperty()
    classNum: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiModelProperty()
    schoolId: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiModelProperty()
    yearId: number;

    // @IsNotEmpty()
    // @IsNumber()
    @ApiModelProperty()
    guaranteeId: number;

    // accessCodeId: number;
}

export class ContestantRO {
    @ApiResponseProperty()
    id: number;
    @ApiResponseProperty()
    firstname: string;
    @ApiResponseProperty()
    surname: string;
    @ApiResponseProperty()
    email: string;
    @ApiResponseProperty()
    birthdate: Date;
    @ApiResponseProperty()
    classNum: number;
    @ApiResponseProperty({type: SchoolRO})
    school?: SchoolRO;
    @ApiResponseProperty({type: [() => AccessCodeRO]})
    accessCodes?: AccessCodeRO[];
}
