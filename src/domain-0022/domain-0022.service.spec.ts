import { Test, TestingModule } from '@nestjs/testing';

import { Domain0022Service } from './domain-0022.service';

describe('Domain0022Service', () => {
  let service: Domain0022Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain0022Service],
    })
      .useMocker(() => ({}))
      .compile();

    service = module.get<Domain0022Service>(Domain0022Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
