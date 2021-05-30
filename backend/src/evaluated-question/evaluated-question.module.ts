import { Module } from '@nestjs/common';
import { EvaluatedQuestionService } from './evaluated-question.service';
import { EvaluatedQuestionController } from './evaluated-question.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {EvaluatedQuestionEntity} from "./evaluated-question.entity";
import {AnsweredQuestionEntity} from "../answered-question/answered-question.entity";
import {AccountEntity} from "../account/account.entity";
import {AccessCodeEntity} from "../access-code/access-code.entity";

@Module({
  providers: [EvaluatedQuestionService],
  controllers: [EvaluatedQuestionController],
  imports: [TypeOrmModule.forFeature([EvaluatedQuestionEntity, AnsweredQuestionEntity, AccountEntity, AccessCodeEntity])],
  exports: [TypeOrmModule.forFeature([EvaluatedQuestionEntity]), EvaluatedQuestionService]
})
export class EvaluatedQuestionModule {}
