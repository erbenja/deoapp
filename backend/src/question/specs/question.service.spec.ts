import { Test, TestingModule } from '@nestjs/testing';
import { QuestionTypeEntity } from '../../question-type/question-type.entity';
import { MockType, repositoryMockFactory } from '../../shared/mocks';
import { TestEntity } from '../../test/test.entity';
import { QuestionEntity } from '../question.entity';
import { QuestionService } from '../question.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('QuestionService', () => {
  let service: QuestionService;
  let questionRepositoryMock: MockType<Repository<QuestionEntity>>;
  let questionTypeRepositoryMock: MockType<Repository<QuestionTypeEntity>>;
  let testRepositoryMock: MockType<Repository<TestEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        { provide: getRepositoryToken(QuestionEntity), useFactory: repositoryMockFactory },
        { provide: getRepositoryToken(QuestionTypeEntity), useFactory: repositoryMockFactory },
        { provide: getRepositoryToken(TestEntity), useFactory: repositoryMockFactory },
      ]
    }).compile();

    service = module.get<QuestionService>(QuestionService);
    questionRepositoryMock = module.get(getRepositoryToken(QuestionEntity));
    questionTypeRepositoryMock = module.get(getRepositoryToken(QuestionTypeEntity));
    testRepositoryMock = module.get(getRepositoryToken(TestEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});