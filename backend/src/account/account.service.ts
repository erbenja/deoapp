import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BaseService} from "../shared/base-service";
import {AccountEntity} from "./account.entity";
import {AccountDTO, AccountRO} from "./account.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class AccountService extends BaseService<AccountEntity, AccountRO, AccountDTO>{

    constructor(@InjectRepository(AccountEntity) private accountsRepository: Repository<AccountEntity>) {
        super(accountsRepository);
    }

    async create(createDTO: AccountDTO): Promise<AccountRO> {
        const accountExists = await this.accountsRepository.createQueryBuilder("account")
            .where("account.username = :username", { username: createDTO.username })
            .getCount();

        if(accountExists == 0) {
            const {username, password, email, firstname, surname} = createDTO;
            const newAccount = this.accountsRepository.create();
            newAccount.username = username;
            newAccount.password = password;
            newAccount.email = email;
            newAccount.firstname = firstname;
            newAccount.surname = surname;

            //TODO -- permissions

            await this.accountsRepository.save(newAccount);
            const result = await this.accountsRepository.findOne(newAccount);
            return result.toResponseObject();
        } else {
            throw new HttpException(
                `Username is already taken`,
                HttpStatus.CONFLICT,
            );
        }
    }

    async update(updateDTO: AccountDTO): Promise<AccountRO> {
        const toBeUpdated = await this.accountsRepository.findOne(updateDTO.id);

        if(toBeUpdated != undefined) {
            const merged = await this.accountsRepository.merge(toBeUpdated, updateDTO);
            await this.accountsRepository.update(merged.id, merged);
            const result = await this.accountsRepository.findOne(merged.id);

            return result.toResponseObject();
        } else {
            throw new HttpException(
                `Account with id ${updateDTO.id} doesnt exist`,
                HttpStatus.NOT_FOUND,
            );
        }

        //TODO
    }

    async findByName(name: string): Promise<AccountRO>{
        const foundAccount = await this.accountsRepository.findOne({where: {username: name}});

        console.log(`Found this account for authetication ${foundAccount.username}`);

        return foundAccount.toResponseObject();
    }
}
