import { Test, TestingModule } from '@nestjs/testing';
import { GuaranteeController } from '../guarantee.controller';

describe('Guarantee Controller', () => {
  let controller: GuaranteeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuaranteeController],
    }).compile();

    controller = module.get<GuaranteeController>(GuaranteeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
