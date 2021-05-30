import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BaseService} from "../shared/base-service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PermissionEntity} from "./permission.entity";
import {PermissionDTO, PermissionRO} from "./permission.dto";
import {AccountEntity} from "../account/account.entity";
import {PermissionTypeEntity} from "../permission-type/permission-type.entity";

@Injectable()
export class PermissionService extends BaseService<PermissionEntity, PermissionRO, PermissionDTO> {

    constructor(@InjectRepository(PermissionEntity) private permissionsRepository: Repository<PermissionEntity>,
                @InjectRepository(AccountEntity) private accountsRepository: Repository<AccountEntity>,
                @InjectRepository(PermissionTypeEntity) private typesRepository: Repository<PermissionTypeEntity>) {
        super(permissionsRepository);
    }

    async create(createDTO: PermissionDTO): Promise<PermissionRO> {
        const {typeId, accountId} = createDTO;
        const foundPermission = await this.permissionsRepository.findOne({where: {account: accountId, type: typeId}});
        if(foundPermission !== undefined){
            throw new HttpException(
                `Account with id ${accountId} already has permission of type with id ${typeId} already exist`,
                HttpStatus.NOT_ACCEPTABLE,
            );
        }

        const newPermission = this.permissionsRepository.create();

        const foundAccount = await this.accountsRepository.findOne({where: {id: accountId}});
        if(foundAccount !== undefined){
            newPermission.account = foundAccount;
        } else {
            throw new HttpException(
                `Account with id ${accountId} doesnt exist`,
                HttpStatus.NOT_FOUND,
            );
        }

        const foundType = await this.typesRepository.findOne({where: {id: typeId}});
        if(foundType !== undefined){
            newPermission.type = foundType;
        } else {
            throw new HttpException(
                `Permission type with id ${typeId} doesnt exist`,
                HttpStatus.NOT_FOUND,
            );
        }

        await this.permissionsRepository.save(newPermission);
        const result = await this.permissionsRepository.findOne(newPermission);
        return result.toResponseObject();
    }

    async update(updateDTO: PermissionDTO): Promise<PermissionRO> {
        // const toBeUpdated = await this.yearsRepository.findOne({where: {id: updateDTO.id}});
        //
        // //RESET array
        // updateDTO.rounds = [];
        //
        // for (const roundId of updateDTO.roundIds) {
        //     updateDTO.rounds.push(await this.roundsRepository.findOne({where: {id: roundId}}));
        // }
        //
        // if (toBeUpdated != undefined) {
        //     const merged = this.yearsRepository.merge(toBeUpdated, updateDTO);
        //     await this.yearsRepository.update(merged.id, merged);
        //     const result = await this.yearsRepository.findOne({where: {id: merged.id}});
        //
        //     return result.toResponseObject();
        // } else {
            throw new HttpException(
                `Permission with id ${updateDTO.id} doesnt exist`,
                HttpStatus.NOT_IMPLEMENTED,
            );
        // }

        //TODO
    }
}
