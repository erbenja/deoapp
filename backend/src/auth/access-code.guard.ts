import {ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

@Injectable()
export class AccessCodeGuard extends AuthGuard('accessCodeStrategy') {
    // canActivate(context: ExecutionContext) {
    //     // Add your custom authentication logic here
    //     // for example, call super.logIn(request) to establish a session.
    //     // super.logIn(context.  request);
    //     const req = context.switchToHttp().getRequest();
    //     console.log(req.body);
    //     return super.canActivate(context);
    // }

    handleRequest(err, code, info) {

        console.log('AccessCodeGuard');
        // console.log(`err: ${err}`);
        // console.log(`code: ${code}`);
        // console.log(err);
        // console.log(code);
        // console.log(info);
        // You can throw an exception based on either "info" or "err" arguments
        // console.log(`01 AccessCode: ${code}`);
        if (err || !code) {
            throw err || new UnauthorizedException();
        }

        // console.log(`02 AccessCode: ${code}`);
        // console.log(user);
        //request enrichments

        return code;
    }
}
