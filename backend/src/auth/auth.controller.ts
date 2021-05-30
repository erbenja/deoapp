import {Body, Controller, Post, UseGuards, UsePipes} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {ValidationPipe} from "../shared/validation.pipe";
import {AuthCodeDTO, AuthDTO, AuthRO} from "./auth.dto";
import {apiPrefix} from "../shared/api.constants";
import {AuthGuard} from "@nestjs/passport";
import {LocalAuthGuard} from "./local.guard";
import {AccessCodeGuard} from "./access-code.guard";
import {ApiOkResponse} from "@nestjs/swagger";
import {AccountRO} from "../account/account.dto";


@Controller(apiPrefix + 'auth')
export class AuthController {

    constructor(private service: AuthService) {};

    @ApiOkResponse({type: AuthRO})
    @Post('login')
    @UseGuards(LocalAuthGuard)
    @UsePipes(ValidationPipe)
    login(
        @Body() authDTO: AuthDTO
    ) {
        // console.log(authDTO);
        return this.service.login(authDTO);
    }

    @ApiOkResponse({type: AuthRO})
    @Post('accessCode')
    @UseGuards(AccessCodeGuard)
    @UsePipes(ValidationPipe)
    loginWithAccessCode(
        @Body() authCodeDTO: AuthCodeDTO
    ) {
        console.log(authCodeDTO);
        return this.service.loginWithAccessCode(authCodeDTO);
    }

}
