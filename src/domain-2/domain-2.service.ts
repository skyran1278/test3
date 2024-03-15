import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { EntityManager, Repository } from 'typeorm';

import { Domain2 } from './domain-2.entity';
import { CreateDomain2Input } from './mutation/create-domain-2.input';
import { UpdateDomain2Input } from './mutation/update-domain-2.input';
import { Domain2PageArgs } from './query/domain-2-page.args';

@Injectable()
export class Domain2Service extends BaseService<Domain2> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(Domain2)
    readonly repo: Repository<Domain2>,
  ) {
    super(repo);
  }

  async createOne(
    input: CreateDomain2Input | Domain2,
    options: ServiceOptions,
  ): Promise<Domain2> {
    const transaction = async (manager: EntityManager) => {
      return this.save(input, { manager, user: options.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: Domain2PageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async updateOne(input: UpdateDomain2Input, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const existDomain2 = await this.findOneOrFail(
        {
          where: { id: input.id },
        },
        { manager },
      );

      return this.save(
        {
          ...existDomain2,
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
      const domain2 = await this.findOneByOrFail({ id });

      return this.softRemove(domain2, { manager, user: options?.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
