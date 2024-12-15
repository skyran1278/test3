import { Test, TestingModule } from '@nestjs/testing';

import { Domain22Repository } from './domain-22.repository';

describe('Domain22Service', () => {
  let repo: Domain22Repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain22Repository],
    })
      .useMocker(() => ({
        findBy: jest.fn(),
        save: jest.fn(),
        findOneBy: jest.fn(),
      }))
      .compile();

    repo = module.get<Domain22Repository>(Domain22Repository);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  // it('should save', async () => {
  //   const entity = { id: '1', parentId: '2', parent: null };
  //   const parent = { id: '2' };

  //   repo.findBy = jest.fn().mockResolvedValue([parent]);
  //   repo.findOneBy = jest.fn().mockResolvedValue(parent);

  //   await repo.save(entity);

  //   expect(entity.parent).toBe(parent);
  // });
});
