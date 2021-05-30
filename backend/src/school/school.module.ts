import { Module } from '@nestjs/common';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SchoolEntity} from "./school.entity";
import {ContactPersonModule} from "../contact-person/contact-person.module";
import {DistrictEntity} from "../district/district.entity";
import {ContactPersonEntity} from "../contact-person/contact-person.entity";

@Module({
  controllers: [SchoolController],
  providers: [SchoolService],
  imports: [TypeOrmModule.forFeature([SchoolEntity, DistrictEntity, ContactPersonEntity]), ContactPersonModule],
  exports: [SchoolService]
})
export class SchoolModule {}
