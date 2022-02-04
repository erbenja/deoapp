import { Test, TestingModule } from '@nestjs/testing';
import { AccessCodeService } from '../access-code.service';
import { AccessCodeEntity } from '../access-code.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType, repositoryMockFactory } from '../../shared/mocks';
import { Repository } from 'typeorm';
import { EvaluatedQuestionEntity } from '../../evaluated-question/evaluated-question.entity';

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
});
