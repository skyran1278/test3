import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { EntityManager, Repository } from 'typeorm';

import { Domain0010 } from './domain-0010.entity';
import { CreateDomain0010Input } from './mutation/create-domain-0010.input';
import { UpdateDomain0010Input } from './mutation/update-domain-0010.input';
import { Domain0010PageArgs } from './query/domain-0010-page.args';

@Injectable()
export class Domain0010Service extends BaseService<Domain0010> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(Domain0010)
    readonly repo: Repository<Domain0010>,
  ) {
    super(repo);
  }

  async createOne(
    input: CreateDomain0010Input | Domain0010,
    options: ServiceOptions,
  ): Promise<Domain0010> {
    const transaction = async (manager: EntityManager) => {
      return this.save(input, { manager, user: options.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: Domain0010PageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async updateOne(input: UpdateDomain0010Input, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const existDomain0010 = await this.findOneOrFail(
        {
          where: { id: input.id },
        },
        { manager },
      );

      return this.save(
        {
          ...existDomain0010,
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
      const domain0010 = await this.findOneByOrFail({ id });

      return this.softRemove(domain0010, { manager, user: options?.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
