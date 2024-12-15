import { Test, TestingModule } from '@nestjs/testing';

import { Domain15Service } from './domain-15.service';

describe('Domain15Service', () => {
  let service: Domain15Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain15Service],
    })
      .useMocker(() => ({}))
      .compile();

    service = module.get<Domain15Service>(Domain15Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
