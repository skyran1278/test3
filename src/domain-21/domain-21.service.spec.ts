import { Test, TestingModule } from '@nestjs/testing';

import { Domain21Service } from './domain-21.service';

describe('Domain21Service', () => {
  let service: Domain21Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain21Service],
    })
      .useMocker(() => ({}))
      .compile();

    service = module.get<Domain21Service>(Domain21Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
