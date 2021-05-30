import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BaseService} from "../shared/base-service";
import {RegionEntity} from "./region.entity";
import {RegionDTO, RegionRO} from "./region.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {SchoolEntity} from "../school/school.entity";
import {Repository} from "typeorm";

@Injectable()
export class RegionService extends BaseService<RegionEntity, RegionRO, RegionDTO>{
    constructor(@InjectRepository(RegionEntity) private regionsRepository: Repository<RegionEntity>) {
        super(regionsRepository);
    }

    async create(createDTO: RegionDTO): Promise<RegionRO> {
        return undefined;
    }

    async update(updateDTO: RegionDTO): Promise<RegionRO> {
        const toBeUpdated = await this.regionsRepository.findOne({where: {id: updateDTO.id}});

        if (toBeUpdated != undefined) {
            const merged = this.regionsRepository.merge(toBeUpdated, updateDTO);
            await this.regionsRepository.update(merged.id, merged);
            const result = await this.regionsRepository.findOne({where: {id: merged.id}});

            return result.toResponseObject();
        } else {
            throw new HttpException(
                `Region with id ${updateDTO.id} doesnt exist`,
                HttpStatus.NOT_FOUND,
            );
        }

        //TODO
    }
}
