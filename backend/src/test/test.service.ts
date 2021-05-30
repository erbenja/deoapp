import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BaseService} from "../shared/base-service";
import {TestEntity} from "./test.entity";
import {TestDTO, TestRO} from "./test.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ContactPersonRO} from "../contact-person/contact-person.dto";
import {OlympiadRoundEntity} from "../olympiad-round/olympiad-round.entity";
import {QuestionOrderDTO} from "../question/question.dto";
import {QuestionEntity} from "../question/question.entity";

@Injectable()
export class TestService extends BaseService<TestEntity, TestRO, TestDTO> {
    constructor(@InjectRepository(TestEntity) private testsRepository: Repository<TestEntity>,
                @InjectRepository(OlympiadRoundEntity) private roundsRepository: Repository<OlympiadRoundEntity>,
                @InjectRepository(QuestionEntity) private questionsRepository: Repository<QuestionEntity>) {
        super(testsRepository);
    }

    async create(createDTO: TestDTO): Promise<TestRO> {
        //TODO
        throw new HttpException("TEST _ CREATE  == NOT IMPLEMENTED YET", HttpStatus.NOT_IMPLEMENTED);
        return undefined;
    }


    async update(updateDTO: TestDTO): Promise<TestRO> {
        const toBeUpdated = await this.testsRepository.findOne({where: {id: updateDTO.id}});

        updateDTO.lastModified = new Date();

        if (toBeUpdated != undefined) {
            const merged = this.testsRepository.merge(toBeUpdated, updateDTO);

            // return merged;
            const id = merged.id;
            await this.testsRepository.save(merged);
            const result = await this.testsRepository.findOne(merged.id);
            return result;
            //TODO old return with status
            // return {status: 0, ...result.toResponseObject(), updatedId: id};
        } else {
            throw new HttpException(
                `Test with id ${updateDTO.id} doesnt exist`,
                HttpStatus.NOT_FOUND,
            );
        }

    }

    async getByOlympiadRoundId(id: number): Promise<TestRO> {
        const foundRounds = await this.roundsRepository.findOne({where: {id: id}, relations: ['tests']});
        // return this.processListToRO(id, foundDistrict, "contactPerson", "Region");
        // return this.processContactPerson(id, foundDistrict, "Region")
        return this.transformPropertyToRO(id, foundRounds, "tests");
    }

    async orderQuestionInTest(orderDTO: QuestionOrderDTO): Promise<any>
    // Promise<TestRO[]>
    {
        const {testId, questionIds} = orderDTO;
        const relations = ['questions']
        const foundTest = await this.testsRepository.findOne({where: {id: testId}, relations});

        if (foundTest !== undefined) {
            const foundIds = foundTest.questions.map(a => a.id);
            if (this.arraysEqual(foundIds, questionIds)) {
                const foundQuestions = await this.questionsRepository.findByIds(questionIds);
                for (let i = 0; i < questionIds.length; i++) {
                    // const index = foundQuestions.findIndex(a => a.id === questionIds[i]);
                    // foundQuestions[index].orderNum = i + 1;
                    await this.questionsRepository.update(questionIds[i], {orderNum: i + 1});
                }

                // console.log('--------------------------');
                // console.log(foundQuestions);
                // console.log('--------------------------');

                // foundQuestions.forEach(async (a) => {
                //     await this.questionsRepository.update(a.id, a);
                // })

                // const result = await this.testsRepository.find({where: {id: testId}});
                return questionIds;
                // return {newIds: foundQuestions.map(a => a.id), oldIds: questionIds};
            } else {
                throw new HttpException(
                    `Not all test questions are in request`,
                    HttpStatus.NOT_ACCEPTABLE,
                );
            }
        } else {
            throw new HttpException(
                `Test with id ${testId} doesnt exist`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    arraysEqual(_arr1, _arr2) {
        if (!Array.isArray(_arr1) || !Array.isArray(_arr2) || _arr1.length !== _arr2.length)
            return false;
        const arr1 = _arr1.concat().sort();
        const arr2 = _arr2.concat().sort();
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i])
                return false;
        }
        return true;
    }
}
