import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { EntityManager, Repository } from 'typeorm';

import { Domain0006 } from './domain-0006.entity';
import { CreateDomain0006Input } from './mutation/create-domain-0006.input';
import { UpdateDomain0006Input } from './mutation/update-domain-0006.input';
import { Domain0006PageArgs } from './query/domain-0006-page.args';

@Injectable()
export class Domain0006Service extends BaseService<Domain0006> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(Domain0006)
    readonly repo: Repository<Domain0006>,
  ) {
    super(repo);
  }

  async createOne(
    input: CreateDomain0006Input | Domain0006,
    options: ServiceOptions,
  ): Promise<Domain0006> {
    const transaction = async (manager: EntityManager) => {
      return this.save(input, { manager, user: options.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: Domain0006PageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async updateOne(input: UpdateDomain0006Input, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const existDomain0006 = await this.findOneOrFail(
        {
          where: { id: input.id },
        },
        { manager },
      );

      return this.save(
        {
          ...existDomain0006,
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
      const domain0006 = await this.findOneByOrFail({ id });

      return this.softRemove(domain0006, { manager, user: options?.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
