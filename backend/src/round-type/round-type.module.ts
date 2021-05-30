import { Module } from '@nestjs/common';
import { RoundTypeController } from './round-type.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RoundTypeEntity} from "./round-type.entity";
import {RoundTypeService} from "./round-type.service";

@Module({
  providers: [RoundTypeService],
  controllers: [RoundTypeController],
  imports: [TypeOrmModule.forFeature([RoundTypeEntity])]
})
export class RoundTypeModule {}
