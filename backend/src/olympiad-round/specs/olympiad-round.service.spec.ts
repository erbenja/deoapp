import { Test, TestingModule } from '@nestjs/testing';
import { OlympiadRoundService } from '../olympiad-round.service';

describe('OlympiadRoundService', () => {
  let service: OlympiadRoundService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OlympiadRoundService],
    }).compile();

    service = module.get<OlympiadRoundService>(OlympiadRoundService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
