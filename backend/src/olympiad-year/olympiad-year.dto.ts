import {IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {OlympiadRoundDTO, OlympiadRoundRO} from "../olympiad-round/olympiad-round.dto";
import {OlympiadRoundEntity} from "../olympiad-round/olympiad-round.entity";
import {ApiPropertyOptional, ApiResponseProperty} from "@nestjs/swagger";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";


export class OlympiadYearDTO {
    id: number;

    @IsString()
    @ApiModelProperty()
    name: string;

    @IsNumber()
    @ApiModelProperty()
    year: number;

    @IsString()
    @ApiModelProperty()
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    @ApiModelProperty()
    openToPublic: boolean;

    // @IsDate()
    // @IsNotEmpty()
    @ApiPropertyOptional()
    registrationDeadline: Date;

    roundIds: number[];
    rounds: OlympiadRoundEntity[];

}

export class OlympiadYearRO {
    @ApiResponseProperty()
    id: number;
    @ApiResponseProperty()
    name: string;
    @ApiResponseProperty()
    year: number;
    @ApiResponseProperty()
    description: string;
    @ApiResponseProperty()
    openToPublic: boolean;
    @ApiResponseProperty()
    registrationDeadline: Date;
    @ApiResponseProperty({type: OlympiadRoundRO})
    rounds?: OlympiadRoundRO[];
}
