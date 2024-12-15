import { Test, TestingModule } from '@nestjs/testing';

import { Domain21Repository } from './domain-21.repository';

describe('Domain21Service', () => {
  let repo: Domain21Repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain21Repository],
    })
      .useMocker(() => ({
        findBy: jest.fn(),
        save: jest.fn(),
        findOneBy: jest.fn(),
      }))
      .compile();

    repo = module.get<Domain21Repository>(Domain21Repository);
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
