import { Test, TestingModule } from '@nestjs/testing';
import { RoundTypeController } from '../round-type.controller';

describe('RoundType Controller', () => {
  let controller: RoundTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoundTypeController],
    }).compile();

    controller = module.get<RoundTypeController>(RoundTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
