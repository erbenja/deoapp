import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BaseService} from "../shared/base-service";
import {QuestionOptionEntity} from "./question-option.entity";
import {QuestionOptionDTO, QuestionOptionRO} from "./question-option.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {QuestionEntity} from "../question/question.entity";
import {Repository} from "typeorm";
import {QuestionTypeEntity} from "../question-type/question-type.entity";
import {TestEntity} from "../test/test.entity";

@Injectable()
export class QuestionOptionService extends BaseService<QuestionOptionEntity, QuestionOptionRO, QuestionOptionDTO>{
    constructor(@InjectRepository(QuestionOptionEntity) private optionsRepository: Repository<QuestionOptionEntity>,
                @InjectRepository(QuestionEntity) private questionsRepository: Repository<QuestionEntity>) {
        super(optionsRepository);
    }

    async create(createDTO: QuestionOptionDTO): Promise<QuestionOptionRO> {
        const {content, correct, questionId} = createDTO;
        const newOption = this.optionsRepository.create();
        newOption.content = content;
        newOption.correct = correct;
        // newOption.created = new Date();
        // newOption.lastModified = new Date();

        const foundQuestion = await this.questionsRepository.findOne({where: {id: questionId}});

        if(foundQuestion != undefined) {
            newOption.question = foundQuestion;
        } else {
            throw new HttpException(
                `Question with id ${questionId} doesnt exist`,
                HttpStatus.NO_CONTENT,
            );
        }

        await this.optionsRepository.save(newOption);
        const result = await this.optionsRepository.findOne({where: {id: newOption.id}});

        return result;
        //TODO old return with status
        // return {status: 0, ...result};
    }

    async update(updateDTO: QuestionOptionDTO): Promise<QuestionOptionRO> {
        const toBeUpdated = await this.optionsRepository.findOne({where: {id: updateDTO.id}});

        // updateDTO.lastModified = new Date();

        if (toBeUpdated != undefined) {
            const merged = this.optionsRepository.merge(toBeUpdated, updateDTO);
            await this.optionsRepository.save(merged);
            const result = await this.optionsRepository.findOne(merged.id);

            return result;
            //TODO old return with status
            // return {status: 0, ...result.toResponseObject()};
        } else {
            throw new HttpException(
                `Question Option with id ${updateDTO.id} doesnt exist`,
                HttpStatus.NOT_FOUND,
            );
        }
        // return undefined;
    }

    async getAllByQuestionId(id: number): Promise<QuestionOptionRO[]>{
        const propertyName = 'options';
        const foundQuestion = await this.questionsRepository.findOne({where: {id:id}, relations:[propertyName]});

        const returnList = this.transformPropertyToRO(id, foundQuestion, propertyName, 'question');
        returnList.forEach(i => i.questionId = id);

        return returnList
    }
}
