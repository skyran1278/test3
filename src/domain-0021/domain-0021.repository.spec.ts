import { Test, TestingModule } from '@nestjs/testing';

import { Domain0021Repository } from './domain-0021.repository';

describe('Domain0021Service', () => {
  let repo: Domain0021Repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Domain0021Repository],
    })
      .useMocker(() => ({
        findBy: jest.fn(),
        save: jest.fn(),
        findOneBy: jest.fn(),
      }))
      .compile();

    repo = module.get<Domain0021Repository>(Domain0021Repository);
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
