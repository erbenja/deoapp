import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BaseService} from "../shared/base-service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PermissionTypeEntity} from "./permission-type.entity";
import {PermissionTypeDTO, PermissionTypeRO} from "./permission-type.dto";

@Injectable()
export class PermissionTypeService extends BaseService<PermissionTypeEntity, PermissionTypeRO, PermissionTypeDTO> {

    constructor(@InjectRepository(PermissionTypeEntity) private typesRepository: Repository<PermissionTypeEntity>) {
        super(typesRepository);
    }

    async create(createDTO: PermissionTypeDTO): Promise<PermissionTypeRO> {
        // const {name, year, description, openToPublic, registrationDeadline} = createDTO;
        // const newOlympiadYear = this.yearsRepository.create();
        // newOlympiadYear.name = name;
        // newOlympiadYear.year = year;
        // newOlympiadYear.description = description;
        // newOlympiadYear.openToPublic = openToPublic;
        // newOlympiadYear.registrationDeadline = registrationDeadline;
        //
        // //TODO -- permissions
        //
        // await this.yearsRepository.save(newOlympiadYear);
        // const result = await this.yearsRepository.findOne(newOlympiadYear);
        // return result.toResponseObject();
        // // } else {
        throw new HttpException(
            `Permissions create is not implemeted yet`,
            HttpStatus.NOT_IMPLEMENTED,
        );
        // }
    }

    async update(updateDTO: PermissionTypeDTO): Promise<PermissionTypeRO> {
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
                HttpStatus.NOT_FOUND,
            );
        // }

        //TODO
    }
}
