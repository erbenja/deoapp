import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BaseService} from "../shared/base-service";
import {DistrictDTO, DistrictRO} from "./district.dto";
import {DistrictEntity} from "./district.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class DistrictService extends BaseService<DistrictEntity, DistrictRO, DistrictDTO>{
    constructor(@InjectRepository(DistrictEntity) private districtsRepository: Repository<DistrictEntity>) {
        super(districtsRepository);
    }

    async create(createDTO: DistrictDTO): Promise<DistrictRO> {
        //TODO
        const name = "my name sdlk ll";
        name.toUpperCase();
        console.log(name);

        return undefined;
    }

    async update(updateDTO: DistrictDTO): Promise<DistrictRO> {
        const toBeUpdated = await this.districtsRepository.findOne({where: {id: updateDTO.id}});

        if (toBeUpdated != undefined) {
            const merged = this.districtsRepository.merge(toBeUpdated, updateDTO);
            await this.districtsRepository.update(merged.id, merged);
            const result = await this.districtsRepository.findOne({where: {id: merged.id}});

            return result.toResponseObject();
        } else {
            throw new HttpException(
                `District with id ${updateDTO.id} doesnt exist`,
                HttpStatus.NOT_FOUND,
            );
        }

        //TODO
    }

    getByRegionId(id: number) {
        //TODO
        return undefined;
        
    }
}
