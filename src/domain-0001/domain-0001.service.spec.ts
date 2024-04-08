import { Test, TestingModule } from '@nestjs/testing';

import { Domain0001Service } from './domain-0001.service';

describe('Domain0001Service', () => {
  let service: Domain0001Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain0001Service],
    }).compile();

    service = module.get<Domain0001Service>(Domain0001Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
