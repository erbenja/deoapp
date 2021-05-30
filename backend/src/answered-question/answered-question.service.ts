import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {QuestionEntity} from "../question/question.entity";
import {Repository} from "typeorm";
import {QuestionTypeEntity} from "../question-type/question-type.entity";
import {TestEntity} from "../test/test.entity";
import {BaseService} from "../shared/base-service";
import {AnsweredQuestionEntity} from "./answered-question.entity";
import {AnsweredQuestionDTO, AnsweredQuestionRO} from "./answered-question.dto";
import {QuestionRO} from "../question/question.dto";
import {AccessCodeEntity} from "../access-code/access-code.entity";
import {ROargs} from "../shared/base-ro";

@Injectable()
export class AnsweredQuestionService extends BaseService<AnsweredQuestionEntity, AnsweredQuestionRO, AnsweredQuestionDTO> {
    constructor(@InjectRepository(AnsweredQuestionEntity) private answersRepository: Repository<AnsweredQuestionEntity>,
                @InjectRepository(AccessCodeEntity) private codesRepository: Repository<AccessCodeEntity>,
                @InjectRepository(QuestionEntity) private questionsRepository: Repository<QuestionEntity>) {
        super(answersRepository);
    }

    async create(createDTO: AnsweredQuestionDTO): Promise<AnsweredQuestionRO> {
        const {answer, questionId, accessCodeId} = createDTO;
        const newAnswer = this.answersRepository.create();
        newAnswer.answer = answer;
        newAnswer.created = new Date();
        newAnswer.lastModified = new Date();

        const foundQuestion = await this.questionsRepository.findOne({where: {id: questionId}});
        if (foundQuestion != undefined) {
            newAnswer.question = foundQuestion;
        } else {
            throw new HttpException(
                `Question with id ${questionId} doesnt exist`,
                HttpStatus.NO_CONTENT,
            );
        }

        const foundAccessCode = await this.codesRepository.findOne({
            where: {id: accessCodeId},
            relations: ['answeredQuestions', 'answeredQuestions.question']
        });
        if (foundAccessCode != undefined) {
            const answeredIds = foundAccessCode.answeredQuestions.map(a => a.question.id);

            console.log(answeredIds);

            if (!answeredIds.includes(questionId)) {
                newAnswer.accessCode = foundAccessCode;
            } else {
                throw new HttpException(
                    `Access code with id ${accessCodeId} already answered question with id ${questionId}`,
                    HttpStatus.NOT_ACCEPTABLE,
                );
            }
        } else {
            throw new HttpException(
                `Access code with id ${accessCodeId} doesnt exist`,
                HttpStatus.NO_CONTENT,
            );
        }

        await this.answersRepository.save(newAnswer);
        const result = await this.answersRepository.findOne({where: {id: newAnswer.id}});

        return result.toResponseObject();
    }

    async update(updateDTO: AnsweredQuestionDTO): Promise<AnsweredQuestionRO> {
        // const relations = ['accessCode'];
        const toBeUpdated = await this.answersRepository.findOne({where: {id: updateDTO.id}});

        updateDTO.lastModified = new Date();

        if (toBeUpdated != undefined) {
            const merged = this.answersRepository.merge(toBeUpdated, updateDTO);
            await this.answersRepository.update(merged.id, merged);

            const result = await this.answersRepository.findOne({where: {id: merged.id}});

            return result.toResponseObject();
        } else {
            throw new HttpException(
                `Answer with id ${updateDTO.id} doesnt exist`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async getAllByQuestionId(id: number): Promise<QuestionRO[]> {
        const propertyName = 'answeredQuestions';
        const foundTest = await this.questionsRepository.findOne({where: {id: id}, relations: [propertyName]});

        return this.transformPropertyToRO(id, foundTest, propertyName, 'question');
    }

    async getAllByAccessCodeId(id: number, args?: ROargs): Promise<AnsweredQuestionRO[]> {
        const foundAnswers = await this.answersRepository
            .createQueryBuilder('answers')
            .leftJoinAndSelect('answers.accessCode', 'code')
            .leftJoinAndSelect('answers.question', 'question')
            .leftJoinAndSelect('question.options', 'options')
            .leftJoinAndSelect('answers.evaluation', 'evaluation')
            .leftJoinAndSelect('question.type', 'type')
            .where('code.id = :id', {id})
            .getMany();

        return foundAnswers.map(a => a.toResponseObject(args));
    }
}
