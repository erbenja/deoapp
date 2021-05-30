import {Strategy} from 'passport-accesstoken';
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {AuthService} from "./auth.service";

@Injectable()
export class AccessCodeStrategy extends PassportStrategy(Strategy, 'accessCodeStrategy') {
    constructor(private readonly authService: AuthService) {
        super({tokenField: 'code'});
    }

    async validate(code: string): Promise<any> {
        console.log(`AccessCodeStrategy`);
        const accessCode = await this.authService.validateCode(code);
        console.log('ACS after validateCode');
        if (!accessCode) {
            throw new UnauthorizedException();
        }
        return accessCode;
    }
}
