import { Module } from '@nestjs/common';
import { PostTagService } from './post-tag.service';
import { PostTagController } from './post-tag.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PostTagEntity} from "./post-tag.entity";

@Module({
  providers: [PostTagService],
  controllers: [PostTagController],
  imports: [TypeOrmModule.forFeature([PostTagEntity])]
})
export class PostTagModule {}
