import { Test, TestingModule } from '@nestjs/testing';
import { AccessCodeService } from '../access-code.service';
import { AccessCodeEntity } from '../access-code.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType, repositoryMockFactory } from '../../shared/mocks';
import { Repository } from 'typeorm';
import { EvaluatedQuestionEntity } from '../../evaluated-question/evaluated-question.entity';
import { AnsweredQuestionEntity } from '../../answered-question/answered-question.entity';
import { QuestionOptionEntity } from '../../question-option/question-option.entity';
import { QuestionTypeEntity } from '../../question-type/question-type.entity';
import { questionTypes } from 'src/question-type/question-type.dto';
import { transformAnswerData, data } from './question.test.data';


describe('AccessCodeService', () => {
  let service: AccessCodeService;
  let accessCodeRepositoryMock: MockType<Repository<AccessCodeEntity>>;
  let evalQuestionRepositoryMock: MockType<Repository<EvaluatedQuestionEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccessCodeService,
        { provide: getRepositoryToken(AccessCodeEntity), useFactory: repositoryMockFactory },
        { provide: getRepositoryToken(EvaluatedQuestionEntity), useFactory: repositoryMockFactory },
      ],
    }).compile();

    service = module.get<AccessCodeService>(AccessCodeService);
    let accessCodeRepositoryMock = module.get(getRepositoryToken(AccessCodeEntity));
    let evalQuestionRepositoryMock = module.get(getRepositoryToken(EvaluatedQuestionEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should evaluate question', async () => {
    expect(service).toBeDefined();
    const answer = transformAnswerData(data);
    const evaluation = await service.evaluateQuestion(answer);
    expect(evaluation.points).toEqual(data.question.points);
  });


});
