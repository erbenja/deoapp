import { Test, TestingModule } from '@nestjs/testing';
import { AnsweredQuestionController } from '../answered-question.controller';

describe('AnsweredQuestion Controller', () => {
  let controller: AnsweredQuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnsweredQuestionController],
    }).compile();

    controller = module.get<AnsweredQuestionController>(AnsweredQuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
