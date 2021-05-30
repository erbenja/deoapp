import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class ContestantsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, ) {
    }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        //TODO data from token

        console.log('ContestantsGuard');
        // console.log(request);
        const code = request.user.code;

        console.log(code);
        if (code !== undefined) {
                return code;
        }
    }
}
