import { Test, TestingModule } from '@nestjs/testing';
import { OlympiadRoundController } from '../olympiad-round.controller';

describe('OlympiadRound Controller', () => {
  let controller: OlympiadRoundController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OlympiadRoundController],
    }).compile();

    controller = module.get<OlympiadRoundController>(OlympiadRoundController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
