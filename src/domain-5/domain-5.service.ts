import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { EntityManager, Repository } from 'typeorm';

import { Domain5 } from './domain-5.entity';
import { CreateDomain5Input } from './mutation/create-domain-5.input';
import { UpdateDomain5Input } from './mutation/update-domain-5.input';
import { Domain5PageArgs } from './query/domain-5-page.args';

@Injectable()
export class Domain5Service extends BaseService<Domain5> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(Domain5)
    readonly repo: Repository<Domain5>,
  ) {
    super(repo);
  }

  async createOne(
    input: CreateDomain5Input | Domain5,
    options: ServiceOptions,
  ): Promise<Domain5> {
    const transaction = async (manager: EntityManager) => {
      return this.save(input, { manager, user: options.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: Domain5PageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async updateOne(input: UpdateDomain5Input, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const existDomain5 = await this.findOneOrFail(
        {
          where: { id: input.id },
        },
        { manager },
      );

      return this.save(
        {
          ...existDomain5,
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
      const domain5 = await this.findOneByOrFail({ id });

      return this.softRemove(domain5, { manager, user: options?.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
