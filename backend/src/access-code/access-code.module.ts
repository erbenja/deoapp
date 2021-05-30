import { Module } from '@nestjs/common';
import { AccessCodeController } from './access-code.controller';
import { AccessCodeService } from './access-code.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {QuestionEntity} from "../question/question.entity";
import {AccessCodeEntity} from "./access-code.entity";
import {AnsweredQuestionService} from "../answered-question/answered-question.service";
import {AnsweredQuestionModule} from "../answered-question/answered-question.module";
import {TestModule} from "../test/test.module";
import {EvaluatedQuestionModule} from "../evaluated-question/evaluated-question.module";

@Module({
  controllers: [AccessCodeController],
  providers: [AccessCodeService],
  imports: [TypeOrmModule.forFeature([AccessCodeEntity, QuestionEntity]), AnsweredQuestionModule, TestModule, EvaluatedQuestionModule],
  exports: [TypeOrmModule.forFeature([AccessCodeEntity, QuestionEntity]), AccessCodeService]
})
export class AccessCodeModule {}
