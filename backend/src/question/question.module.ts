import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TestEntity} from "../test/test.entity";
import {QuestionEntity} from "./question.entity";
import {QuestionTypeEntity} from "../question-type/question-type.entity";
import {QuestionOptionEntity} from "../question-option/question-option.entity";
import {QuestionOptionModule} from "../question-option/question-option.module";
import {AnsweredQuestionModule} from "../answered-question/answered-question.module";
import {AnsweredQuestionEntity} from "../answered-question/answered-question.entity";

@Module({
  providers: [QuestionService],
  controllers: [QuestionController],
  imports: [TypeOrmModule.forFeature([QuestionEntity, TestEntity, QuestionTypeEntity, QuestionOptionEntity, AnsweredQuestionEntity]), QuestionOptionModule, AnsweredQuestionModule],
  exports: [TypeOrmModule.forFeature([QuestionEntity]), QuestionService],
})
export class QuestionModule {}
