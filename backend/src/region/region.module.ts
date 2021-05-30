import { Module } from '@nestjs/common';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RegionEntity} from "./region.entity";
import {SchoolEntity} from "../school/school.entity";
import {DistrictEntity} from "../district/district.entity";
import {DistrictModule} from "../district/district.module";
import {SchoolModule} from "../school/school.module";
import {ContactPersonModule} from "../contact-person/contact-person.module";

@Module({
  controllers: [RegionController],
  providers: [RegionService],
  imports: [TypeOrmModule.forFeature([RegionEntity, DistrictEntity]), DistrictModule, ContactPersonModule],
})
export class RegionModule {}
