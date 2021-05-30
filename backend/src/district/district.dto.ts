import {SchoolRO} from "../school/school.dto";
import {RegionRO} from "../region/region.dto";
import {IsEmail, IsPhoneNumber} from "class-validator";
import {ContactPersonRO} from "../contact-person/contact-person.dto";
import {ApiResponseProperty} from "@nestjs/swagger";


export class DistrictDTO {
    id: number;

    name: string;

    schoolIds: number[];

    contactPersonId: number;
    // region: number;

}

export class DistrictRO {
    @ApiResponseProperty()
    id: number;
    @ApiResponseProperty()
    name: string;
    @ApiResponseProperty({type: RegionRO})
    region?: RegionRO;
    @ApiResponseProperty({type: [SchoolRO]})
    schools?: SchoolRO[];
    @ApiResponseProperty({type: ContactPersonRO})
    contactPerson?: ContactPersonRO;
}
