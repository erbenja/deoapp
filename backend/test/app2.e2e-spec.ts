import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Connection } from 'typeorm';
import { getConnectionToken } from '@nestjs/typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    connection = await moduleFixture.get(getConnectionToken());
  });

  afterEach(async () => {
    await connection.close()  // <-- important
  });

  it('/ (GET3)', () => {
    return request(app.getHttpServer())
      .get('/help')
      .expect(200)
      .expect('Hello World!');
  });


  
  it('/ (GET4)', () => {
    return request(app.getHttpServer())
      .get('/help')
      .expect(200)
      .expect('Hello World!');
  });
});
