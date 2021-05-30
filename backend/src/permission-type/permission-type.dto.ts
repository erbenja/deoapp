import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {BaseRO} from "../shared/base-ro";
import {ApiResponseProperty} from "@nestjs/swagger";


export enum PermissionTypes {
    admin = "admin",
    // guarantee = "guarantee",
    evaluator = "evaluator",
    creator = "creator"
}

export class PermissionTypeDTO {
    id?: number;
}


export class PermissionTypeRO{
    @ApiResponseProperty()
    id: number;
    @ApiResponseProperty()
    name: PermissionTypes;
}
