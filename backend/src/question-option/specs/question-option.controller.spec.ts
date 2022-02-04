import { Test, TestingModule } from '@nestjs/testing';
import { QuestionOptionController } from '../question-option.controller';
import { QuestionOptionService } from '../question-option.service';

describe('QuestionOption Controller', () => {
  let controller: QuestionOptionController;

  const mockQuestionOptionService = {

  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionOptionController],
      providers: [QuestionOptionService]
    }).overrideProvider(QuestionOptionService).useValue(mockQuestionOptionService).compile();

    controller = module.get<QuestionOptionController>(QuestionOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
