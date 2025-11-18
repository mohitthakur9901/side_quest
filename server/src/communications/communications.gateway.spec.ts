import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationsGateway } from './communications.gateway';
import { CommunicationsService } from './communications.service';

describe('CommunicationsGateway', () => {
  let gateway: CommunicationsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunicationsGateway, CommunicationsService],
    }).compile();

    gateway = module.get<CommunicationsGateway>(CommunicationsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
