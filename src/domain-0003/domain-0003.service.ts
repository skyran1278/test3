import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { EntityManager, Repository } from 'typeorm';

import { Domain0003 } from './domain-0003.entity';
import { CreateDomain0003Input } from './mutation/create-domain-0003.input';
import { UpdateDomain0003Input } from './mutation/update-domain-0003.input';
import { Domain0003PageArgs } from './query/domain-0003-page.args';

@Injectable()
export class Domain0003Service extends BaseService<Domain0003> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(Domain0003)
    readonly repo: Repository<Domain0003>,
  ) {
    super(repo);
  }

  async createOne(
    input: CreateDomain0003Input | Domain0003,
    options: ServiceOptions,
  ): Promise<Domain0003> {
    const transaction = async (manager: EntityManager) => {
      return this.save(input, { manager, user: options.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: Domain0003PageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async updateOne(input: UpdateDomain0003Input, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const existDomain0003 = await this.findOneOrFail(
        {
          where: { id: input.id },
        },
        { manager },
      );

      return this.save(
        {
          ...existDomain0003,
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
      const domain0003 = await this.findOneByOrFail({ id });

      return this.softRemove(domain0003, { manager, user: options?.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
