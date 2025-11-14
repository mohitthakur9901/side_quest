import { Test, TestingModule } from '@nestjs/testing';
import { PoolsGateway } from './pools.gateway';
import { PoolsService } from './pools.service';

describe('PoolsGateway', () => {
  let gateway: PoolsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoolsGateway, PoolsService],
    }).compile();

    gateway = module.get<PoolsGateway>(PoolsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
