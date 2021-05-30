import {IsNotEmpty, IsString} from 'class-validator';
import {ApiResponseProperty} from "@nestjs/swagger";

export class RoundTypeDTO {
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;
}

export class RoundTypeRO {
    @ApiResponseProperty()
    id: number;
    @ApiResponseProperty()
    name: string;
}
