import { Injectable } from '@nestjs/common';
import {QuestionTypeEntity} from "./question-type.entity";
import {QuestionTypeDTO, QuestionTypeRO} from "./question-type.dto";
import {BaseService} from "../shared/base-service";
import {InjectRepository} from "@nestjs/typeorm";
import {QuestionOptionEntity} from "../question-option/question-option.entity";
import {Repository} from "typeorm";
import {QuestionEntity} from "../question/question.entity";

@Injectable()
export class QuestionTypeService extends BaseService<QuestionTypeEntity, QuestionTypeRO, QuestionTypeDTO>{
    constructor(@InjectRepository(QuestionTypeEntity) private typesRepository: Repository<QuestionTypeEntity>) {
        super(typesRepository);
    }

    // async getAll(){
    //     const result = this.typesRepository.find();
    //     return result;
    // }

    async create(createDTO: QuestionTypeDTO): Promise<QuestionTypeRO> {
        return undefined;
    }

    async update(updateDTO: QuestionTypeDTO): Promise<QuestionTypeRO> {
        return undefined;
    }
}
