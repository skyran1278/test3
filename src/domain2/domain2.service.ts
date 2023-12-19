import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceMetadata } from 'src/common/interface/service-metadata.interface';
import { NodeIdNotFoundError } from 'src/common/node-id-not-found.error';
import { EntityManager, FindOneOptions, Repository } from 'typeorm';

import { Domain2 } from './domain2.entity';
import { CreateDomain2Input } from './mutation/create-domain2.input';
import { UpdateDomain2Input } from './mutation/update-domain2.input';
import { Domain2PageArgs } from './query/domain2-page.args';

@Injectable()
export class Domain2Service extends BaseService<Domain2> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(Domain2)
    private readonly repo: Repository<Domain2>,
  ) {
    super(repo);
  }

  async createOne(
    input: CreateDomain2Input | Domain2,
    metadata?: ServiceMetadata,
  ): Promise<Domain2> {
    const create = async (manager: EntityManager) => {
      return this.save(input, { manager });
    };

    if (metadata?.manager) {
      return create(metadata.manager);
    }

    return this.manager.transaction('READ COMMITTED', create);
  }

  findOne(
    options: FindOneOptions<Domain2>,
    metadata?: ServiceMetadata,
  ): Promise<Domain2 | null> {
    const domain2Repo = metadata?.manager
      ? metadata.manager.getRepository(Domain2)
      : this.repo;
    return domain2Repo.findOne(options);
  }

  findPage(args: Domain2PageArgs, metadata?: ServiceMetadata) {
    return this.findNodePage(args, metadata);
  }

  async updateOne(input: UpdateDomain2Input, metadata: ServiceMetadata) {
    const update = async (manager: EntityManager) => {
      const domain2Repo = manager.getRepository(Domain2);
      const existDomain2 = await domain2Repo.findOne({
        where: { id: input.id },
      });
      if (!existDomain2) {
        throw new NodeIdNotFoundError(Domain2, input.id);
      }

      return this.save(
        {
          ...existDomain2,
          ...input,
          updateUserId: metadata?.user?.id,
        },
        { manager },
      );
    };

    if (metadata?.manager) {
      return update(metadata.manager);
    }

    return this.manager.transaction('READ COMMITTED', update);
  }

  async removeOne(id: string, metadata: ServiceMetadata) {
    const remove = async (manager: EntityManager) => {
      const domain2Repo = manager.getRepository(Domain2);

      const domain2 = await domain2Repo.findOneBy({ id });
      if (!domain2) {
        throw new NodeIdNotFoundError(Domain2, id);
      }

      return domain2Repo.softRemove(domain2);
    };

    if (metadata?.manager) {
      return remove(metadata.manager);
    }

    return this.manager.transaction('READ COMMITTED', remove);
  }
}
