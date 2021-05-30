
import {IsEmail, IsNotEmpty, IsString} from 'class-validator';
import {BaseRO} from "../shared/base-ro";
import {PermissionRO} from "../permission/permission.dto";
import {GuaranteeRO} from "../guarantee/guarantee.dto";
import {ApiPropertyOptional, ApiResponseProperty} from "@nestjs/swagger";

export class AccountDTO {
    id?: number;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    firstname: string;


    @IsNotEmpty()
    @IsString()
    surname: string;


    //TODO
    // permissions: PermissionDTO[];
}

export class LoginDTO {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class AccountRO{
    @ApiResponseProperty()
    id: number;
    @ApiResponseProperty()
    username: string;
    @ApiResponseProperty()
    email?: string;
    @ApiResponseProperty()
    firstname?: string;
    @ApiResponseProperty()
    surname?: string;
    @ApiResponseProperty({type: [PermissionRO]})
    permissions?: PermissionRO[];
    @ApiResponseProperty()
    guarantee?: GuaranteeRO;
}
