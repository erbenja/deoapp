import { Test, TestingModule } from '@nestjs/testing';
import { OlympiadYearService } from '../olympiad-year.service';

describe('OlympiadYearService', () => {
  let service: OlympiadYearService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OlympiadYearService],
    }).compile();

    service = module.get<OlympiadYearService>(OlympiadYearService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
