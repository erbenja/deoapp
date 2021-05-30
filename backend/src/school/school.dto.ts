import {DistrictRO} from "../district/district.dto";
import {ContactPersonRO} from "../contact-person/contact-person.dto";
import {ApiResponseProperty} from "@nestjs/swagger";


export class SchoolDTO {
    id: number;

    name: string;

    districtId: number;

    contactPersonId: number;

}

export class SchoolRO {
    @ApiResponseProperty()
    id: number;
    @ApiResponseProperty()
    name: string;
    @ApiResponseProperty({type:DistrictRO})
    district?: DistrictRO;
    @ApiResponseProperty({type:ContactPersonRO})
    contactPerson?: ContactPersonRO;
}
