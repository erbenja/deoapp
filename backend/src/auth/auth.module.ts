import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LocalStrategy} from "./local.strategy";
import {PassportModule} from "@nestjs/passport";
import {AccountModule} from "../account/account.module";
import {AuthController} from "./auth.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AccountEntity} from "../account/account.entity";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {JwtRefreshStrategy} from "./unused/jwt-refresh.strategy";
import {JwtAccessStrategy} from "./jwt-access.strategy";
import {AccessCodeEntity} from "../access-code/access-code.entity";
import {AccessCodeStrategy} from "./access-code.strategy";

@Module({
    controllers: [AuthController],
    imports: [AccountModule, PassportModule, TypeOrmModule.forFeature([AccountEntity, AccessCodeEntity]),
        PassportModule.register({ defaultStrategy: 'accessTokenStrategy' }),
        JwtModule.register({
            secret: jwtConstants.secret,
            // signOptions: {expiresIn: '6000s'},
        })
    ],
    providers: [AuthService,  JwtAccessStrategy, LocalStrategy, AccessCodeStrategy],
    exports: [AuthService]
})
export class AuthModule {
}

