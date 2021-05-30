import {ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {request} from "express";

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('refreshTokenStrategy') {
    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        // super.logIn(context.  request);
        const req = context.switchToHttp().getRequest();
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new UnauthorizedException();
        }

        console.log(`JwTAUthGuard ${user}`);
        // console.log(user);

        return user;
    }
}
