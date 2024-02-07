import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { IServiceMetadata } from 'src/common/interface/service-metadata.interface';
import { NodeIdNotFoundError } from 'src/common/node-id-not-found.error';
import { EntityManager, Repository } from 'typeorm';

import { Domain1 } from './domain1.entity';
import { CreateDomain1Input } from './mutation/create-domain1.input';
import { UpdateDomain1Input } from './mutation/update-domain1.input';
import { Domain1PageArgs } from './query/domain1-page.args';

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
    metadata?: IServiceMetadata,
  ): Promise<Domain1> {
    const transaction = async (manager: EntityManager) => {
      const dao = input instanceof Domain1 ? input : this.create(input);
      if (metadata?.user) {
        dao.createUserId = metadata.user.id;
        dao.updateUserId = metadata.user.id;
      }
      return this.save(dao, { manager });
    };

    return metadata?.manager
      ? transaction(metadata.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: Domain1PageArgs, metadata?: IServiceMetadata) {
    return this.findNodePage(args, metadata);
  }

  async updateOne(input: UpdateDomain1Input, metadata: IServiceMetadata) {
    const transaction = async (manager: EntityManager) => {
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

    return metadata?.manager
      ? transaction(metadata.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  async removeOne(id: string, metadata: IServiceMetadata) {
    const transaction = async (manager: EntityManager) => {
      const domain1Repo = manager.getRepository(Domain1);

      const domain1 = await domain1Repo.findOneBy({ id });
      if (!domain1) {
        throw new NodeIdNotFoundError(Domain1, id);
      }

      return domain1Repo.softRemove(domain1);
    };

    return metadata?.manager
      ? transaction(metadata.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
