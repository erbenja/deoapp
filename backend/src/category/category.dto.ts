import {TestRO} from "../test/test.dto";
import {IsNumber, IsString} from "class-validator";
import {ApiResponseProperty} from "@nestjs/swagger";


export class CategoryDTO{
    id: number;

    @IsString()
    name: string;

    @IsNumber()
    classMax: number;

    @IsNumber()
    classMin: number;
}

export class CategoryRO{
    @ApiResponseProperty()
    id: number;
    @ApiResponseProperty()
    name: string;
    @ApiResponseProperty()
    classMax: number;
    @ApiResponseProperty()
    classMin: number;
    tests?: TestRO[];
}
