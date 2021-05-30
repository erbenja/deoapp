import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {PostController} from "./post/post.controller";

@Controller('help')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
