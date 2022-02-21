import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PostModule} from './post/post.module';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';
import { PostTagModule } from './post-tag/post-tag.module';
import { AccessCodeModule } from './access-code/access-code.module';
import { AccountModule } from './account/account.module';
import { OlympiadYearModule } from './olympiad-year/olympiad-year.module';
import { OlympiadRoundModule } from './olympiad-round/olympiad-round.module';
import {RoundTypeModule} from "./round-type/round-type.module";
import { SchoolModule } from './school/school.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { ContactPersonModule } from './contact-person/contact-person.module';
import { TestModule } from './test/test.module';
import { CategoryModule } from './category/category.module';
import { QuestionTypeModule } from './question-type/question-type.module';
import { QuestionModule } from './question/question.module';
import { QuestionOptionModule } from './question-option/question-option.module';
import { AnsweredQuestionModule } from './answered-question/answered-question.module';
import { EvaluatedQuestionModule } from './evaluated-question/evaluated-question.module';
import { ContestantModule } from './contestant/contestant.module';
import { GuaranteeModule } from './guarantee/guarantee.module';
import {AuthModule} from "./auth/auth.module";
import {PermissionModule} from "./permission/permission.module";
import {PermissionTypeModule} from "./permission-type/permission-type.module";
import {MailerModule} from "@nestjs-modules/mailer";
// import {ExampleModule} from "./mail/mail.module";
import {PugAdapter} from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import { MulterModule } from '@nestjs/platform-express';
import {FileModule} from "./file/file.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        AccessCodeModule,
        AccountModule,
        AnsweredQuestionModule,
        FileModule,
        AuthModule,
        CategoryModule,
        ContactPersonModule,
        ContestantModule,
        DistrictModule,
        EvaluatedQuestionModule,
        GuaranteeModule,
        OlympiadRoundModule,
        OlympiadYearModule,
        PermissionModule,
        PermissionTypeModule,
        PostModule,
        PostTagModule,
        QuestionModule,
        QuestionOptionModule,
        QuestionTypeModule,
        RegionModule,
        RoundTypeModule,
        SchoolModule,
        TestModule,
        MailerModule.forRoot({
            transport: 'smtps://test@seznam.cz:password@smtp.seznam.cz',
            defaults: {
                from: '"nest-modules" <modules@nestjs.com>',
            },
            template: {
                dir: __dirname + '/templates',
                adapter: new PugAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
        // ServeStaticModule.forRoot({
        //     rootPath: join(__dirname, '..', 'client'),
        // })
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {
}
