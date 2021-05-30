import { Test, TestingModule } from '@nestjs/testing';
import { EvaluatedQuestionService } from '../evaluated-question.service';

describe('EvaluatedQuestionService', () => {
  let service: EvaluatedQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluatedQuestionService],
    }).compile();

    service = module.get<EvaluatedQuestionService>(EvaluatedQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
