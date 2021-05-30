
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AccountEntity} from "../account/account.entity";
import {ExampleService} from "../mail/mail.service";
import {MulterModule} from "@nestjs/platform-express";
import {editFileName, imageFileFilter} from "../file-upload.utils";
import {FileController} from "./file.controller";

@Module({
    controllers: [FileController],
    imports: [
        MulterModule.register({
            dest: './files',
        })
    ]
})

export class FileModule {
}
