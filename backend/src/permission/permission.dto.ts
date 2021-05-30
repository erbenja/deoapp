import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {BaseRO} from "../shared/base-ro";
import {PermissionTypeRO, PermissionTypes} from "../permission-type/permission-type.dto";
import {ApiResponseProperty} from "@nestjs/swagger";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";



export class PermissionDTO {
    id?: number;
    @ApiModelProperty()
    typeId: number;
    @ApiModelProperty()
    accountId: number;
}


export class PermissionRO{
    @ApiResponseProperty()
    id: number;
    @ApiResponseProperty({type:PermissionTypeRO})
    type?: PermissionTypeRO;
}
