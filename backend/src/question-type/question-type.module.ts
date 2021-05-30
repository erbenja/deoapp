import { Module } from '@nestjs/common';
import { QuestionTypeService } from './question-type.service';
import { QuestionTypeController } from './question-type.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {QuestionTypeEntity} from "./question-type.entity";

@Module({
  providers: [QuestionTypeService],
  controllers: [QuestionTypeController],
  imports: [TypeOrmModule.forFeature([QuestionTypeEntity])]
})
export class QuestionTypeModule {}
