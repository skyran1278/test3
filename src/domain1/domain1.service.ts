import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { IServiceMetadata } from 'src/common/interface/service-metadata.interface';
import { NodeIdNotFoundError } from 'src/common/node-id-not-found.error';
import { EntityManager, FindOneOptions, Repository } from 'typeorm';

import { Domain1 } from './domain1.entity';
import { CreateDomain1Input } from './mutation/create-domain1.input';
import { UpdateDomain1Input } from './mutation/update-domain1.input';
import { Domain1PageArgs } from './query/domain1-page.args';

@Injectable()
export class Domain1Service extends BaseService<Domain1> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(Domain1)
    private readonly repo: Repository<Domain1>,
  ) {
    super(repo);
  }

  async createOne(
    input: CreateDomain1Input | Domain1,
    metadata?: IServiceMetadata,
  ): Promise<Domain1> {
    const create = async (manager: EntityManager) => {
      const dao = input instanceof Domain1 ? input : this.create(input);
      if (metadata?.user) {
        dao.createUserId = metadata.user.id;
        dao.updateUserId = metadata.user.id;
      }
      return this.save(dao, { manager });
    };

    if (metadata?.manager) {
      return create(metadata.manager);
    }

    return this.manager.transaction('READ COMMITTED', create);
  }

  findOne(
    options: FindOneOptions<Domain1>,
    metadata?: IServiceMetadata,
  ): Promise<Domain1 | null> {
    const domain1Repo = metadata?.manager
      ? metadata.manager.getRepository(Domain1)
      : this.repo;
    return domain1Repo.findOne(options);
  }

  findPage(args: Domain1PageArgs, metadata?: IServiceMetadata) {
    return this.findNodePage(args, metadata);
  }

  async updateOne(input: UpdateDomain1Input, metadata: IServiceMetadata) {
    const update = async (manager: EntityManager) => {
      const domain1Repo = manager.getRepository(Domain1);
      const existDomain1 = await domain1Repo.findOne({
        where: { id: input.id },
      });
      if (!existDomain1) {
        throw new NodeIdNotFoundError(Domain1, input.id);
      }

      return this.save(
        {
          ...existDomain1,
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

  async removeOne(id: string, metadata: IServiceMetadata) {
    const remove = async (manager: EntityManager) => {
      const domain1Repo = manager.getRepository(Domain1);

      const domain1 = await domain1Repo.findOneBy({ id });
      if (!domain1) {
        throw new NodeIdNotFoundError(Domain1, id);
      }

      return domain1Repo.softRemove(domain1);
    };

    if (metadata?.manager) {
      return remove(metadata.manager);
    }

    return this.manager.transaction('READ COMMITTED', remove);
  }
}
