import { Test, TestingModule } from '@nestjs/testing';
import { QuestionOptionController } from '../question-option.controller';

describe('QuestionOption Controller', () => {
  let controller: QuestionOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionOptionController],
    }).compile();

    controller = module.get<QuestionOptionController>(QuestionOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
