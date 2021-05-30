import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ExampleService {
    constructor(private readonly mailerService: MailerService) {}

    example(): void {
        console.log('Sending Mail');
        this
            .mailerService
            .sendMail({
                to: 'j-erben@seznam.cz', // list of receivers
                from: 'kulisek97@seznam.cz', // sender address
                subject: 'Testing Nest MailerModule ✔', // Subject line
                text: 'welcome', // plaintext body
                html: '<b>welcome</b>', // HTML body content
            })
            .then(() => {console.log('success!!')})
            .catch((e) => {console.log('nope!!'); console.log(e)});
    }
}
