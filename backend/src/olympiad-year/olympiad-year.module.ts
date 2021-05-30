import { Module } from '@nestjs/common';
import { OlympiadYearController } from './olympiad-year.controller';
import { OlympiadYearService } from './olympiad-year.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {OlympiadYearEntity} from "./olympiad-year.entity";
import {OlympiadRoundModule} from "../olympiad-round/olympiad-round.module";
import {OlympiadRoundEntity} from "../olympiad-round/olympiad-round.entity";
import {ContestantModule} from "../contestant/contestant.module";

@Module({
  controllers: [OlympiadYearController],
  providers: [OlympiadYearService],
  imports: [TypeOrmModule.forFeature([OlympiadYearEntity, OlympiadRoundEntity]),
    OlympiadRoundModule, ContestantModule],
  exports: [TypeOrmModule.forFeature([OlympiadYearEntity]), OlympiadYearService]
})
export class OlympiadYearModule {}
