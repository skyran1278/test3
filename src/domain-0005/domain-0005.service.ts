import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { EntityManager, Repository } from 'typeorm';

import { Domain0005 } from './domain-0005.entity';
import { CreateDomain0005Input } from './mutation/create-domain-0005.input';
import { UpdateDomain0005Input } from './mutation/update-domain-0005.input';
import { Domain0005PageArgs } from './query/domain-0005-page.args';

@Injectable()
export class Domain0005Service extends BaseService<Domain0005> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(Domain0005)
    readonly repo: Repository<Domain0005>,
  ) {
    super(repo);
  }

  async createOne(
    input: CreateDomain0005Input | Domain0005,
    options: ServiceOptions,
  ): Promise<Domain0005> {
    const transaction = async (manager: EntityManager) => {
      return this.save(input, { manager, user: options.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: Domain0005PageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async updateOne(input: UpdateDomain0005Input, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const existDomain0005 = await this.findOneOrFail(
        {
          where: { id: input.id },
        },
        { manager },
      );

      return this.save(
        {
          ...existDomain0005,
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
      const domain0005 = await this.findOneByOrFail({ id });

      return this.softRemove(domain0005, { manager, user: options?.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
