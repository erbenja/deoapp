import { Module } from '@nestjs/common';
import { ContactPersonService } from './contact-person.service';
import { ContactPersonController } from './contact-person.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContactPersonEntity} from "./contact-person.entity";
import {RegionEntity} from "../region/region.entity";
import {DistrictEntity} from "../district/district.entity";
import {SchoolEntity} from "../school/school.entity";

@Module({
  providers: [ContactPersonService],
  controllers: [ContactPersonController],
  imports: [TypeOrmModule.forFeature([ContactPersonEntity, RegionEntity, DistrictEntity, SchoolEntity])],
  exports: [ContactPersonService]
})
export class ContactPersonModule {}
