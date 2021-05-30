import {IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {Column, ManyToOne, OneToOne} from "typeorm";
import {RoundTypeEntity} from "../round-type/round-type.entity";
import {OlympiadYearEntity} from "../olympiad-year/olympiad-year.entity";
import {RoundTypeDTO, RoundTypeRO} from "../round-type/round-type.dto";
import {OlympiadYearDTO, OlympiadYearRO} from "../olympiad-year/olympiad-year.dto";
import {TestRO} from "../test/test.dto";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {ApiPropertyOptional, ApiResponseProperty} from "@nestjs/swagger";


export class OlympiadRoundDTO {
    id: number;

    @ApiModelProperty()
    roundStart: Date;
    @ApiModelProperty()
    roundEnd: Date;
    @ApiPropertyOptional()
    nextRoundId: number;
    @ApiPropertyOptional()
    previousRoundId: number;
    @ApiModelProperty()
    typeId: number;
    @ApiModelProperty()
    yearId: number;

    // TODO most likely unnecessary
    // test: TestDTO[];

    //TODO
    // accessCodes: AccessCodeDTO[];

    //TODO
    // guarantees: GuaranteeDTO[];

}

export class OlympiadRoundRO {
    id: number;
    @ApiResponseProperty()
    roundStart: Date;
    @ApiResponseProperty()
    roundEnd: Date;
    @ApiResponseProperty({type: OlympiadRoundRO})
    nextRound?: OlympiadRoundRO;
    @ApiResponseProperty({type: OlympiadRoundRO})
    previousRound?: OlympiadRoundRO;
    @ApiResponseProperty({type: RoundTypeRO})
    type?: RoundTypeRO;
    @ApiResponseProperty({type: OlympiadYearRO})
    year?: OlympiadYearRO;
    @ApiPropertyOptional({type: [TestRO]})
    tests?: TestRO[];

    //TODO
    // accessCodes: AccessCodeRO[];

    //TODO
    // guarantees: GuaranteeRO[];
}
