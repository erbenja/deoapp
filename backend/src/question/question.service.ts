import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BaseService} from "../shared/base-service";
import {QuestionEntity} from "./question.entity";
import {QuestionDTO, QuestionOrderDTO, QuestionRO} from "./question.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {QuestionTypeEntity} from "../question-type/question-type.entity";
import {TestEntity} from "../test/test.entity";
import {TestRO} from "../test/test.dto";

@Injectable()
export class QuestionService extends BaseService<QuestionEntity, QuestionRO, QuestionDTO> {
    constructor(@InjectRepository(QuestionEntity) private questionsRepository: Repository<QuestionEntity>,
                @InjectRepository(QuestionTypeEntity) private typesRepository: Repository<QuestionTypeEntity>,
                @InjectRepository(TestEntity) private testsRepository: Repository<TestEntity>) {
        super(questionsRepository);
    }


    async create(createDTO: QuestionDTO): Promise<QuestionRO> {
        const {task, points, img, orderNum, typeId, testId} = createDTO;
        const newQuestion = this.questionsRepository.create();
        newQuestion.task = task;
        newQuestion.points = points;
        newQuestion.orderNum = orderNum;
        newQuestion.img = img;
        newQuestion.created = new Date();
        newQuestion.lastModified = new Date();

        const foundType = await this.typesRepository.findOne({where: {id: typeId}});
        if(foundType != undefined) {
            newQuestion.type = foundType;
        } else {
            throw new HttpException(
                `Question type with id ${typeId} doesnt exist`,
                HttpStatus.NOT_ACCEPTABLE,
            );
        }

        const foundTest = await this.testsRepository.findOne({where: {id: testId}});
        if(foundTest != undefined) {
            newQuestion.test = foundTest;
        } else {
            throw new HttpException(
                `Test with id ${testId} doesnt exist`,
                HttpStatus.NOT_ACCEPTABLE,
            );
        }

        await this.questionsRepository.save(newQuestion);
        const result = await this.questionsRepository.findOne({where: {id: newQuestion.id}});

        return result.toResponseObject();
        // return {status: 0, ...result};
    }

    async update(updateDTO: QuestionDTO): Promise<QuestionRO> {
        const toBeUpdated = await this.questionsRepository.findOne(updateDTO.id);

        updateDTO.lastModified = new Date();

        if (toBeUpdated != undefined) {
            const merged = this.questionsRepository.merge(toBeUpdated, updateDTO);

            // return merged;
            const id = merged.id;
            await this.questionsRepository.save(merged);

            const result = await this.questionsRepository.findOne({where: {id: merged.id}, relations:['options']});

            // console.log("---GOT HERE---");

            return {status: 0, ...result.toResponseObject(), updatedId: id};
        } else {
            throw new HttpException(
                `Question with id ${updateDTO.id} doesnt exist`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async getQuestionsByTestId(id: number): Promise<QuestionRO[]>{
        const foundTest = await this.testsRepository.findOne({where: {id: id}});

        return this.transformPropertyToRO(id, foundTest, 'questions', 'test');
    }
}
