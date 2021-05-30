import { Test, TestingModule } from '@nestjs/testing';
import { EvaluatedQuestionController } from '../evaluated-question.controller';

describe('EvaluatedQuestion Controller', () => {
  let controller: EvaluatedQuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvaluatedQuestionController],
    }).compile();

    controller = module.get<EvaluatedQuestionController>(EvaluatedQuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
