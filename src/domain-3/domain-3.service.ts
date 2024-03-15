import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { EntityManager, Repository } from 'typeorm';

import { Domain3 } from './domain-3.entity';
import { CreateDomain3Input } from './mutation/create-domain-3.input';
import { UpdateDomain3Input } from './mutation/update-domain-3.input';
import { Domain3PageArgs } from './query/domain-3-page.args';

@Injectable()
export class Domain3Service extends BaseService<Domain3> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(Domain3)
    readonly repo: Repository<Domain3>,
  ) {
    super(repo);
  }

  async createOne(
    input: CreateDomain3Input | Domain3,
    options: ServiceOptions,
  ): Promise<Domain3> {
    const transaction = async (manager: EntityManager) => {
      return this.save(input, { manager, user: options.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: Domain3PageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async updateOne(input: UpdateDomain3Input, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const existDomain3 = await this.findOneOrFail(
        {
          where: { id: input.id },
        },
        { manager },
      );

      return this.save(
        {
          ...existDomain3,
          ...input,
        },
        { manager, user: options.user },
      );
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  async removeOne(id: string, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const domain3 = await this.findOneByOrFail({ id });

      return this.softRemove(domain3, { manager, user: options?.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
