import { Test, TestingModule } from '@nestjs/testing';
import { AnsweredQuestionService } from '../answered-question.service';

describe('AnsweredQuestionService', () => {
  let service: AnsweredQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnsweredQuestionService],
    }).compile();

    service = module.get<AnsweredQuestionService>(AnsweredQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
