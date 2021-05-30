import {JoinTable, ManyToMany, ManyToOne, OneToOne} from "typeorm";
import {AccountEntity} from "../account/account.entity";
import {RegionEntity} from "../region/region.entity";
import {DistrictEntity} from "../district/district.entity";
import {SchoolEntity} from "../school/school.entity";
import {RoundTypeEntity} from "../round-type/round-type.entity";
import {OlympiadRoundEntity} from "../olympiad-round/olympiad-round.entity";
import {OlympiadRoundRO} from "../olympiad-round/olympiad-round.dto";
import {RoundTypeRO} from "../round-type/round-type.dto";
import {SchoolRO} from "../school/school.dto";
import {DistrictRO} from "../district/district.dto";
import {RegionRO} from "../region/region.dto";
import {AccountRO} from "../account/account.dto";
import {IsNumber} from "class-validator";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {ApiPropertyOptional, ApiResponseProperty} from "@nestjs/swagger";


export class GuaranteeDTO{
    id: number;

    @ApiModelProperty()
    accountId: number;
    @ApiPropertyOptional()
    regionIds: number[];
    @ApiPropertyOptional()
    districtIds: number[];
    @ApiPropertyOptional()
    schoolIds: number[];
    @ApiPropertyOptional()
    roundTypeIds: number[];
    @ApiPropertyOptional()
    guaranteedRoundIds: number[];
}

export class GuaranteeRO{
    @ApiResponseProperty()
    id: number;
    @ApiResponseProperty({type: () => AccountRO})
    account?: AccountRO;
    @ApiResponseProperty({type: [RegionRO]})
    regions?: RegionRO[];
    @ApiResponseProperty({type: [DistrictRO]})
    districts?: DistrictRO[];
    @ApiResponseProperty({type: [SchoolRO]})
    schools?: SchoolRO[];
    @ApiResponseProperty({type: [RoundTypeRO]})
    roundTypes?: RoundTypeRO[];
    @ApiResponseProperty({type: [OlympiadRoundRO]})
    guaranteedRounds?: OlympiadRoundRO[];
}

export class GuaranteeREntities{
    regions: RegionEntity[];
    districts: DistrictEntity[];
    schools: SchoolEntity[];
    roundTypes: RoundTypeEntity[];
    guaranteedRounds: OlympiadRoundEntity[];
}
