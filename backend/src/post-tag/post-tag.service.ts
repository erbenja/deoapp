import { Injectable } from '@nestjs/common';
import {BaseService} from "../shared/base-service";
import {PostTagEntity} from "./post-tag.entity";
import {PostTagDTO, PostTagRO} from "./post-tag.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class PostTagService extends BaseService<PostTagEntity, PostTagRO, PostTagDTO>{

    constructor(@InjectRepository(PostTagEntity) postTagsRepository: Repository<PostTagEntity>){
        super(postTagsRepository);
    }

    async create(createDTO: PostTagDTO): Promise<PostTagRO> {
        //TODO most likely will not be implemented
        return undefined;
    }

    async update(updateDTO: PostTagDTO): Promise<PostTagRO> {
        //TODO most likely will not be implemented
        return undefined;
    }
}
