import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {jwtConstants} from './constants';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'accessTokenStrategy') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
            expirationTime: '1s',
        });
    }

    async validate(payload: any) {
        console.log('JwtAccessStrategy');
        // console.log(payload);
        const {code, iat, account} = payload;
        //prepare payload unpacking to pass onto authguard
        return {
            account,
            code,
            iat
        };
    }
}
