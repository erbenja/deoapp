import { Injectable } from '@nestjs/common';
import {BaseService} from "../shared/base-service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RoundTypeEntity} from "./round-type.entity";
import {PostTagRO} from "../post-tag/post-tag.dto";

class RoundTypeDto {
}

@Injectable()
export class RoundTypeService extends BaseService<RoundTypeEntity, PostTagRO, RoundTypeDto>{

    constructor(@InjectRepository(RoundTypeEntity) roundTypesRepository: Repository<RoundTypeEntity>){
        super(roundTypesRepository);
    }

    async create(createDTO: RoundTypeDto): Promise<PostTagRO> {
        //TODO most likely will not be implemented
        return undefined;
    }

    async update(updateDTO: RoundTypeDto): Promise<PostTagRO> {
        //TODO most likely will not be implemented
        return undefined;
    }
}
