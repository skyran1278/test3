import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceMetadata } from 'src/common/service-metadata.interface';
import { EntityManager, Repository } from 'typeorm';

import { Domain1 } from './domain-1.entity';
import { CreateDomain1Input } from './mutation/create-domain-1.input';
import { UpdateDomain1Input } from './mutation/update-domain-1.input';
import { Domain1PageArgs } from './query/domain-1-page.args';

@Injectable()
export class Domain1Service extends BaseService<Domain1> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(Domain1)
    readonly repo: Repository<Domain1>,
  ) {
    super(repo);
  }

  async createOne(
    input: CreateDomain1Input | Domain1,
    metadata: ServiceMetadata,
  ): Promise<Domain1> {
    const transaction = async (manager: EntityManager) => {
      const dao = input instanceof Domain1 ? input : this.create(input);
      if (metadata?.user) {
        dao.createdUserId = metadata.user.id;
        dao.updatedUserId = metadata.user.id;
      }
      return this.save(dao, { manager, user: metadata.user });
    };

    return metadata?.manager
      ? transaction(metadata.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: Domain1PageArgs, metadata?: ServiceMetadata) {
    return this.findNodePage(args, metadata);
  }

  async updateOne(input: UpdateDomain1Input, metadata: ServiceMetadata) {
    const transaction = async (manager: EntityManager) => {
      const domain1Repo = manager.getRepository(Domain1);
      const existDomain1 = await domain1Repo.findOneOrFail({
        where: { id: input.id },
      });

      return this.save(
        {
          ...existDomain1,
          ...input,
        },
        { manager, user: metadata?.user },
      );
    };

    return metadata?.manager
      ? transaction(metadata.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  async removeOne(id: string, metadata: ServiceMetadata) {
    const transaction = async (manager: EntityManager) => {
      const domain1 = await this.findOneByOrFail({ id });

      return this.softRemove(domain1, { manager, user: metadata?.user });
    };

    return metadata?.manager
      ? transaction(metadata.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
