import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TestEntity} from "./test.entity";
import {OlympiadRoundEntity} from "../olympiad-round/olympiad-round.entity";
import {QuestionModule} from "../question/question.module";
import {QuestionEntity} from "../question/question.entity";

@Module({
  controllers: [TestController],
  providers: [TestService],
  imports: [TypeOrmModule.forFeature([TestEntity, OlympiadRoundEntity, QuestionEntity]), QuestionModule],
  exports: [TestService]
})
export class TestModule {}
