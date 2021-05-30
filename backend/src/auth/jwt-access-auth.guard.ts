import {ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {request} from "express";

@Injectable()
export class JwtAccessAuthGuard extends AuthGuard('accessTokenStrategy') {
    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        // super.logIn(context.  request);
        const req = context.switchToHttp().getRequest();
        // console.log(req.body.access_token);
        return super.canActivate(context);
    }

    handleRequest(err, data, info) {
        // You can throw an exception based on either "info" or "err" arguments


        if (err || !data) {
            throw err || new UnauthorizedException();
        }

        console.log(`JwtAccessAuthGuard`);
        // console.log(data);
        // console.log(data);
        // console.log(user);
        //request enrichments

        return data;
    }
}
