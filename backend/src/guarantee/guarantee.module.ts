import { Module } from '@nestjs/common';
import { GuaranteeController } from './guarantee.controller';
import { GuaranteeService } from './guarantee.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {GuaranteeEntity} from "./guarantee.entity";
import {ContestantModule} from "../contestant/contestant.module";
import {AccountEntity} from "../account/account.entity";
import {RegionEntity} from "../region/region.entity";
import {DistrictEntity} from "../district/district.entity";
import {SchoolEntity} from "../school/school.entity";
import {RoundTypeEntity} from "../round-type/round-type.entity";
import {OlympiadRoundEntity} from "../olympiad-round/olympiad-round.entity";

@Module({
  controllers: [GuaranteeController],
  providers: [GuaranteeService],
  imports: [TypeOrmModule.forFeature([GuaranteeEntity,AccountEntity,RegionEntity,DistrictEntity,SchoolEntity,RoundTypeEntity,OlympiadRoundEntity]), ContestantModule],
  exports: [TypeOrmModule.forFeature([GuaranteeEntity]), GuaranteeService]
})
export class GuaranteeModule {}
