import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import {AppModule} from './app.module';
import {join} from 'path';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // app.useStaticAssets(join(__dirname, '..', 'public'));
    // app.setBaseViewsDir(join(__dirname, '..', 'views'));
    // app.setViewEngine('hbs');
    const options = new DocumentBuilder()
        .setTitle('DeoApp Api')
        .setDescription('REST-like api for web backend apliacation of DeoAPP')
        .setVersion('1.0')
        .addTag('DeoApp')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    app.enableCors();
    await app.listen(process.env.PORT || 3000);
}

bootstrap();
