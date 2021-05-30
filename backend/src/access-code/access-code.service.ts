import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BaseService} from "../shared/base-service";
import {AccessCodeEntity} from "./access-code.entity";
import {AccessCodeDTO, AccessCodeRO} from "./access-code.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {QuestionEntity} from "../question/question.entity";
import {AccountDTO, AccountRO} from "../account/account.dto";
import {AnsweredQuestionEntity} from "../answered-question/answered-question.entity";
import {EvaluatedQuestionEntity} from "../evaluated-question/evaluated-question.entity";
import {ROargs} from "../shared/base-ro";

@Injectable()
export class AccessCodeService extends BaseService<AccessCodeEntity, AccessCodeRO, AccessCodeDTO> {
    constructor(@InjectRepository(AccessCodeEntity) private codesRepository: Repository<AccessCodeEntity>,
                @InjectRepository(QuestionEntity) private questionsRepository: Repository<QuestionEntity>,
                @InjectRepository(EvaluatedQuestionEntity) private evaluatedQuestionsRepository: Repository<EvaluatedQuestionEntity>) {
        super(codesRepository);
    }


    async create(createDTO: AccessCodeDTO): Promise<AccessCodeRO> {
        throw new HttpException(
            'NO IMPLEMENTATION PLANNED',
            HttpStatus.NOT_IMPLEMENTED
        )
        return undefined;
    }

    async update(updateDTO: AccessCodeDTO): Promise<AccessCodeRO> {
        const toBeUpdated = await this.codesRepository.findOne({where: {id: updateDTO.id}});

        if (toBeUpdated != undefined) {
            const merged = await this.codesRepository.merge(toBeUpdated, updateDTO);
            await this.codesRepository.update(merged.id, merged);
            const result = await this.codesRepository.findOne({where: {id: merged.id}});

            return result.toResponseObject();
        } else {
            throw new HttpException(
                `AccessCode with id ${updateDTO.id} doesnt exist`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async getCodeByContestantIdAndRoundId(cid: number, rid: number): Promise<AccessCodeRO> {
        const foundCode = await this.codesRepository
            .createQueryBuilder("code")
            .innerJoin("code.round", "round")
            .innerJoin("code.contestant", "contestant")
            .where("contestant.id = :cid AND round.id = :rid", {cid: cid, rid: rid})
            .getOne();

        return foundCode.toResponseObject()
    }


    async getAllForEvaluation(): Promise<AccessCodeRO[]> {
        const foundCodes = await this.codesRepository
        // .find({where: {activated !== null && testStart !== null}})
            .createQueryBuilder("code")
            .where('code.activated IS NOT null')
            .andWhere('code.testStart IS NOT null')
            .andWhere('code.evaluated IS null')
            .getMany();

        return foundCodes.map(a => a.toResponseObject())
    }

    async startTest(id: number): Promise<AccessCodeRO> {
        const updateDTO = {
            id,
            testStart: new Date()
        };

        return await this.update(updateDTO);
    }

    async closeEvaluation(id: number): Promise<any> {
        const relations = ['answeredQuestions', 'answeredQuestions.question', 'answeredQuestions.question.type', 'answeredQuestions.question.options']
        const foundCode = await this.codesRepository.findOne({where: {id: id}, relations});

        if (foundCode !== undefined) {
            if(foundCode.evaluated === null) {
                const answers = foundCode.answeredQuestions;
                for (const a of answers) {
                    if (!a.evaluation && a.question.type.serverEvaluation) {
                        await this.evaluateQuestion(a);
                    }
                }
            } else {
                throw new HttpException(
                    `AccessCode with id ${id} is already evaluated`,
                    HttpStatus.NOT_ACCEPTABLE,
                );
            }
        } else {
            throw new HttpException(
                `AccessCode with id ${id} doesnt exist`,
                HttpStatus.NOT_ACCEPTABLE,
            );
        }

        const updateDTO = {
            id,
            evaluated: new Date()
        };

        const result = await this.update(updateDTO);
        return result;
    }

    //TODO REFACTOR to appropriate files (temporary solution)

    async evaluateQuestion(answer: AnsweredQuestionEntity): Promise<any> {
        const newEvaluation = await this.evaluatedQuestionsRepository.create();
        newEvaluation.created = new Date();
        newEvaluation.lastModified = new Date();
        newEvaluation.answeredQuestion = answer;

        let success = 0;

        switch (answer.question.type.type) {
            case 'singleChoice': {
                success = answer.question.options.find(a => a.id === answer.answer.id).correct;
                break;
            }
            case 'yesNo': {
                let correct = 0;
                const total = answer.question.options.length;
                answer.question.options.forEach(a => {
                    if (a.correct) {
                        correct += answer.answer.ids[a.id] === 'yes' ? 1 : 0;
                    } else {
                        correct += answer.answer.ids[a.id] === 'no' ? 1 : 0;
                    }
                    success = correct / total;

                });
                break;
            }
            case 'multipleChoice': {
                let correct = 0;
                const total = answer.question.options.length;
                answer.question.options.forEach(a => {
                    if (a.correct) {
                        correct += answer.answer.ids.includes(a.id) ? 1 : 0;
                    } else {
                        correct += (!answer.answer.ids.includes(a.id)) ? 1 : 0;
                    }
                    success = correct / total;
                });
                break;
            }
        }

        const points = answer.question.points;
        newEvaluation.points = Math.round((points * success));

        return await this.evaluatedQuestionsRepository.save(newEvaluation);
    }

    async getAllEvaluated(): Promise<AccessCodeRO[]> {
        const foundCodes = await this.codesRepository
        // .find({where: {activated !== null && testStart !== null}})
            .createQueryBuilder("code")
            .leftJoinAndSelect("code.contestant", "contestant")
            .leftJoinAndSelect("code.round", "round")
            .leftJoinAndSelect("round.year", "year")
            .leftJoinAndSelect("contestant.school", "school")
            .leftJoinAndSelect("code.answeredQuestions", "answeredQuestions")
            .leftJoinAndSelect("answeredQuestions.question", "question")
            .leftJoinAndSelect("answeredQuestions.evaluation", "evaluation")
            .leftJoinAndSelect("question.test", "test")
            .leftJoinAndSelect("test.category", "category")
            .where('code.activated IS NOT null')
            .andWhere('code.testStart IS NOT null')
            .andWhere('code.evaluated IS NOT null')
            .getMany();

        const args: ROargs = {
            testNoQuestions: true,
        }

        return foundCodes.map(a => a.toResponseObject(args))
    }

}
