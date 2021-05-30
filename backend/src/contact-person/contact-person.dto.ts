import {SchoolRO} from "../school/school.dto";
import {RegionRO} from "../region/region.dto";
import {IsArray, IsEmail, IsNotEmpty, IsPhoneNumber, IsString} from "class-validator";
import {DistrictRO} from "../district/district.dto";
import {ApiResponseProperty} from "@nestjs/swagger";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";


export class ContactPersonDTO {
    id: number;

    @IsNotEmpty()
    @IsString()
    @ApiModelProperty()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    @ApiModelProperty()
    surname: string;

    @IsNotEmpty()
    // @IsPhoneNumber("CZ")
    @ApiModelProperty()
    phone: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiModelProperty()
    email: string;

    @ApiModelProperty()
    regionIds: number[];
    @ApiModelProperty()
    districtIds: number[];
    @ApiModelProperty()
    schoolIds: number[];

}

export class ContactPersonRO {
    @ApiResponseProperty()
    id: number;
    @ApiResponseProperty()
    firstname: string;
    @ApiResponseProperty()
    surname: string;
    @ApiResponseProperty()
    phone: string;
    @ApiResponseProperty()
    email: string;

    regions?: RegionRO[];

    districts?: DistrictRO[];

    schools?: SchoolRO[];

}
