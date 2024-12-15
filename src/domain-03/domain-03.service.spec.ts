import { Test, TestingModule } from '@nestjs/testing';

import { Domain03Service } from './domain-03.service';

describe('Domain03Service', () => {
  let service: Domain03Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain03Service],
    })
      .useMocker(() => ({}))
      .compile();

    service = module.get<Domain03Service>(Domain03Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
