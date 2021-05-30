import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BaseService} from "../shared/base-service";
import {EvaluatedQuestionEntity} from "./evaluated-question.entity";
import {EvaluatedQuestionDTO, EvaluatedQuestionRO} from "./evaluated-question.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {QuestionEntity} from "../question/question.entity";
import {AccountEntity} from "../account/account.entity";
import {AnsweredQuestionEntity} from "../answered-question/answered-question.entity";
import {AccessCodeEntity} from "../access-code/access-code.entity";

@Injectable()
export class EvaluatedQuestionService extends BaseService<EvaluatedQuestionEntity, EvaluatedQuestionRO, EvaluatedQuestionDTO> {
    constructor(@InjectRepository(EvaluatedQuestionEntity) private evaluationsRepository: Repository<EvaluatedQuestionEntity>,
                @InjectRepository(AnsweredQuestionEntity) private answersRepository: Repository<AnsweredQuestionEntity>,
                @InjectRepository(AccountEntity) private accountsRepository: Repository<AccountEntity>,
                @InjectRepository(AccessCodeEntity) private codesRepository: Repository<AccessCodeEntity>) {
        super(evaluationsRepository);
    }

    async create(createDTO: EvaluatedQuestionDTO): Promise<EvaluatedQuestionRO> {
        const {points, note, closed, evaluatorId, answerId} = createDTO;
        const newEvaluation = this.evaluationsRepository.create();
        newEvaluation.points = points || 0;
        newEvaluation.note = note;
        newEvaluation.closed = closed;
        newEvaluation.created = new Date();
        newEvaluation.lastModified = new Date();

        const foundAnswer = await this.answersRepository.findOne({where: {id: answerId}, relations: ['evaluation']});
        if (foundAnswer !== undefined) {
            console.log(foundAnswer);
            if (foundAnswer.evaluation === null) {
                newEvaluation.answeredQuestion = foundAnswer;
            } else {
                throw new HttpException(
                    `Answer with id ${answerId} already has evaluation`,
                    HttpStatus.CONFLICT,
                );
            }
        } else {
            throw new HttpException(
                `Answer with id ${answerId} doesnt exist`,
                HttpStatus.NOT_ACCEPTABLE,
            );
        }

        //TODO get from passport
        const foundAccount = await this.accountsRepository.findOne({where: {id: evaluatorId}});
        if (foundAccount != undefined) {
            newEvaluation.evaluator = foundAccount;
        } else {
            throw new HttpException(
                `Evaluator with id ${evaluatorId} doesnt exist`,
                HttpStatus.NOT_ACCEPTABLE,
            );
        }

        console.log(newEvaluation);

        await this.evaluationsRepository.save(newEvaluation);
        const result = await this.evaluationsRepository.findOne({where: {id: newEvaluation.id}});

        return result.toResponseObject();
    }

    async update(updateDTO: EvaluatedQuestionDTO): Promise<EvaluatedQuestionRO> {
        const toBeUpdated = await this.evaluationsRepository.findOne(updateDTO.id);

        updateDTO.lastModified = new Date();

        if (toBeUpdated != undefined) {
            const merged = this.evaluationsRepository.merge(toBeUpdated, updateDTO);
            await this.evaluationsRepository.update(merged.id, merged);

            const result = await this.evaluationsRepository.findOne({where: {id: merged.id}});

            return result.toResponseObject();
        } else {
            throw new HttpException(
                `Answer with id ${updateDTO.id} doesnt exist`,
                HttpStatus.NOT_FOUND,
            );
        }
    }
}
