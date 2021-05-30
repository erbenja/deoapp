
import {DistrictRO} from "../district/district.dto";
import {ContactPersonRO} from "../contact-person/contact-person.dto";
import {ApiResponseProperty} from "@nestjs/swagger";
import {TestRO} from "../test/test.dto";


export class RegionDTO {
    id: number;

    name: string;

    districtIds: number[];

    contactPersonId: number;
}

export class RegionRO {
    @ApiResponseProperty()
    id: number;
    @ApiResponseProperty()
    name: string;
    @ApiResponseProperty({type:[DistrictRO]})
    districts?: DistrictRO[];
    @ApiResponseProperty({type:ContactPersonRO})
    contactPerson?: ContactPersonRO;
}
