import { Module } from '@nestjs/common';
import { ContestantController } from './contestant.controller';
import { ContestantService } from './contestant.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContestantEntity} from "./contestant.entity";
import {AccessCodeService} from "../access-code/access-code.service";
import {SchoolEntity} from "../school/school.entity";
import {AccessCodeEntity} from "../access-code/access-code.entity";
import {OlympiadRoundEntity} from "../olympiad-round/olympiad-round.entity";
import {OlympiadYearEntity} from "../olympiad-year/olympiad-year.entity";
import {AccessCodeModule} from "../access-code/access-code.module";

@Module({
  controllers: [ContestantController],
  providers: [ContestantService],
  imports: [TypeOrmModule.forFeature([ContestantEntity, SchoolEntity, OlympiadRoundEntity, OlympiadYearEntity]), AccessCodeModule],
  exports: [ContestantService]
})
export class ContestantModule {}
