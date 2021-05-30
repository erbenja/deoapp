import { Module } from '@nestjs/common';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SchoolEntity} from "../school/school.entity";
import {DistrictEntity} from "./district.entity";
import {SchoolModule} from "../school/school.module";
import {ContactPersonEntity} from "../contact-person/contact-person.entity";
import {ContactPersonModule} from "../contact-person/contact-person.module";

@Module({
  controllers: [DistrictController],
  providers: [DistrictService],
  imports: [TypeOrmModule.forFeature([DistrictEntity, SchoolEntity]), SchoolModule, ContactPersonModule],
  exports: [DistrictService]
})
export class DistrictModule {}
