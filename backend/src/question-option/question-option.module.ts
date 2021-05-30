import { Module } from '@nestjs/common';
import { QuestionOptionService } from './question-option.service';
import { QuestionOptionController } from './question-option.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {QuestionOptionRO} from "./question-option.dto";
import {QuestionOptionEntity} from "./question-option.entity";
import {QuestionEntity} from "../question/question.entity";

@Module({
  providers: [QuestionOptionService],
  controllers: [QuestionOptionController],
  imports: [TypeOrmModule.forFeature([QuestionOptionEntity, QuestionEntity])],
  exports: [QuestionOptionService]
})
export class QuestionOptionModule {}
