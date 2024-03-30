import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { EntityManager, Repository } from 'typeorm';

import { Domain6 } from './domain-6.entity';
import { CreateDomain6Input } from './mutation/create-domain-6.input';
import { UpdateDomain6Input } from './mutation/update-domain-6.input';
import { Domain6PageArgs } from './query/domain-6-page.args';

@Injectable()
export class Domain6Service extends BaseService<Domain6> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(Domain6)
    readonly repo: Repository<Domain6>,
  ) {
    super(repo);
  }

  async createOne(
    input: CreateDomain6Input | Domain6,
    options: ServiceOptions,
  ): Promise<Domain6> {
    const transaction = async (manager: EntityManager) => {
      return this.save(input, { manager, user: options.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: Domain6PageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async updateOne(input: UpdateDomain6Input, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const existDomain6 = await this.findOneOrFail(
        {
          where: { id: input.id },
        },
        { manager },
      );

      return this.save(
        {
          ...existDomain6,
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
      const domain6 = await this.findOneByOrFail({ id });

      return this.softRemove(domain6, { manager, user: options?.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
