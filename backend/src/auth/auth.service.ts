import {HttpException, HttpService, HttpStatus, Injectable} from '@nestjs/common';
import {AccountDTO} from "../account/account.dto";
import {AccountService} from "../account/account.service";
import {AuthCodeDTO, AuthDTO} from "./auth.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {AccountEntity} from "../account/account.entity";
import {Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";
import {jwtConstants} from "./constants"
import {AccessCodeEntity} from "../access-code/access-code.entity";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(AccountEntity) private accountsRepository: Repository<AccountEntity>,
                @InjectRepository(AccessCodeEntity) private codesRepository: Repository<AccessCodeEntity>,
                private readonly jwtService: JwtService) {
    }

    async validateUser(username: string, password: string): Promise<any> {
        const account = await this.accountsRepository.findOne({where: {username: username}});
        if (account && account.verifyPassword(password)) {
            const {password, ...result} = account;
            return result;
        }
        return null;
    }

    async login(account: AuthDTO) {
        const foundUser = await this.accountsRepository.findOne({
            where: {username: account.username},
            relations: ['permissions', 'guarantee']
        });
        if (foundUser != undefined) {
            const permissions = foundUser.permissions.map(item => item.type);
            const {username, id, guarantee} = foundUser;
            const payload = {account: {username, id, guarantee, permissions}};
            return {
                access_token: this.jwtService.sign(payload),
                // refresh_token: this.jwtService.sign(payload, {expiresIn: '7d'})
            };
        }
        throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }

    async validateCode(code: string): Promise<any> {
        console.log('validateCode');
        const accessCode = await this.codesRepository.findOne({where: {code: code}});
        //TODO potential validation of hashed code
        if (accessCode) {
            // console.log(accessCode)
            // console.log(Date.now());
            // console.log(accessCode.activated.getTime());

            if(accessCode.activated !== null) {
                if (accessCode.activated.getTime() >= Date.now()) {
                    throw new HttpException("Code is not yet activated", HttpStatus.UNAUTHORIZED);
                } else if (accessCode.testStart !== null) {
                    throw new HttpException("Code already used", HttpStatus.FORBIDDEN);
                } else {
                    return accessCode;
                }
            }
        }
        return null;
    }

    async loginWithAccessCode(codeDTO: AuthCodeDTO) {
        console.log('loginWithCode');
        const foundAccessCode = await this.codesRepository.findOne({
            where: {code: codeDTO.code},
            relations: ['round', 'round.tests']
        });
        console.log(foundAccessCode);

        const {classNum} = foundAccessCode.contestant;
        const foundTest = foundAccessCode.round.tests
            .find(a => a.category.classMin <= classNum && a.category.classMax >= classNum);

        console.log(foundTest);

        let testId = -1;
        let category = 'X'
        if(foundTest !== undefined){
            testId = foundTest.id;
            category = foundTest.category.name;
        }

        delete foundAccessCode.round.tests;

        if (foundAccessCode !== undefined) {
            const {code, ...restCode} = foundAccessCode;
            const payload = {code: {...restCode, testId, category}};
            return {
                access_token: this.jwtService.sign(payload),
                // refresh_token: this.jwtService.sign(payload, {expiresIn: '7d'})
            };
        }
        throw new HttpException("AccessCode not found", HttpStatus.NOT_FOUND);
    }
}
