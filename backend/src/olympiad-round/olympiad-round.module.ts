import { Module } from '@nestjs/common';
import { OlympiadRoundController } from './olympiad-round.controller';
import { OlympiadRoundService } from './olympiad-round.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {OlympiadRoundEntity} from "./olympiad-round.entity";
import {OlympiadYearEntity} from "../olympiad-year/olympiad-year.entity";
import {RoundTypeEntity} from "../round-type/round-type.entity";
import {TestModule} from "../test/test.module";
import {TestEntity} from "../test/test.entity";
import {CategoryEntity} from "../category/category.entity";
import {ContestantModule} from "../contestant/contestant.module";
import {ContestantEntity} from "../contestant/contestant.entity";

@Module({
  controllers: [OlympiadRoundController],
  providers: [OlympiadRoundService],
  imports: [TypeOrmModule.forFeature([OlympiadRoundEntity,OlympiadYearEntity,RoundTypeEntity, TestEntity, CategoryEntity]),
    TestModule, ContestantModule],
  exports: [OlympiadRoundService]
})
export class OlympiadRoundModule {}
