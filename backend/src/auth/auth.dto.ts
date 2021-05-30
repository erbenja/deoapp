import {IsString} from "class-validator";
import {createParamDecorator} from "@nestjs/common";
import {ApiResponseProperty} from "@nestjs/swagger";


export class AuthDTO{

    @IsString()
    readonly username: string;

    @IsString()
    readonly password: string;
}

export class AuthCodeDTO{

    @IsString()
    readonly code: string;
}

export class AuthRO{
    @ApiResponseProperty()
    access_token: string;
}

export const AuthUserId = createParamDecorator((data, req) => {
    // console.log(req);
    return req.user.account.id;
});

export const AuthGuaranteeId = createParamDecorator((data, req) => {
    // console.log(req);
    return req.user.account.guarantee.id;
});

export const AuthCodeId = createParamDecorator((data, req) => {
    // console.log(req);
    return req.user.code.id;
});

export const AuthCodeTestId = createParamDecorator((data, req) => {
    // console.log(req);
    return req.user.code.testId;
});
