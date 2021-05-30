import {PostService} from './post.service';
import {Module} from '@nestjs/common';
import {PostController} from './post.controller';
import {PostEntity} from './post.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AccountEntity} from "../account/account.entity";
import {ExampleService} from "../mail/mail.service";
import {MulterModule} from "@nestjs/platform-express";
import {editFileName, imageFileFilter} from "../file-upload.utils";

@Module({
    controllers: [PostController],
    providers: [PostService],
    imports: [
        TypeOrmModule.forFeature([PostEntity, AccountEntity])
    ]
})

export class PostModule {
}
