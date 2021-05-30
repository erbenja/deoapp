import {Column, ManyToOne} from "typeorm";
import {SchoolEntity} from "../school/school.entity";
import {SchoolRO} from "../school/school.dto";
import {IsEmail, IsNumber, IsString} from "class-validator";
import {AccessCodeRO} from "../access-code/access-code.dto";
import {ApiMethodNotAllowedResponse, ApiResponseProperty} from "@nestjs/swagger";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";


export class ContestantDTO {
    id: number;

    @IsString()
    @ApiModelProperty()
    firstname: string;

    @IsString()
    @ApiModelProperty()
    surname: string;

    @IsEmail()
    @ApiModelProperty()
    email: string;

    @ApiModelProperty()
    birthdate: Date;

    @IsNumber()
    @ApiModelProperty()
    classNum: number;
    @ApiModelProperty()
    schoolId: number;
    @ApiModelProperty()
    yearId: number;
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
