import { Test, TestingModule } from '@nestjs/testing';
import { OlympiadYearController } from '../olympiad-year.controller';

describe('OlympiadYear Controller', () => {
  let controller: OlympiadYearController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OlympiadYearController],
    }).compile();

    controller = module.get<OlympiadYearController>(OlympiadYearController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
