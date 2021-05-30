import { Module } from '@nestjs/common';
import { AnsweredQuestionService } from './answered-question.service';
import { AnsweredQuestionController } from './answered-question.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AnsweredQuestionEntity} from "./answered-question.entity";
import {QuestionEntity} from "../question/question.entity";
import {EvaluatedQuestionModule} from "../evaluated-question/evaluated-question.module";
import {AccessCodeEntity} from "../access-code/access-code.entity";

@Module({
  providers: [AnsweredQuestionService],
  controllers: [AnsweredQuestionController],
  imports: [TypeOrmModule.forFeature([AnsweredQuestionEntity, QuestionEntity, AccessCodeEntity]), EvaluatedQuestionModule],
  exports: [TypeOrmModule.forFeature([AnsweredQuestionEntity]), AnsweredQuestionService]
})
export class AnsweredQuestionModule {}
