import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { EntityManager, Repository } from 'typeorm';

import { Domain4 } from './domain-4.entity';
import { CreateDomain4Input } from './mutation/create-domain-4.input';
import { UpdateDomain4Input } from './mutation/update-domain-4.input';
import { Domain4PageArgs } from './query/domain-4-page.args';

@Injectable()
export class Domain4Service extends BaseService<Domain4> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(Domain4)
    readonly repo: Repository<Domain4>,
  ) {
    super(repo);
  }

  async createOne(
    input: CreateDomain4Input | Domain4,
    options: ServiceOptions,
  ): Promise<Domain4> {
    const transaction = async (manager: EntityManager) => {
      return this.save(input, { manager, user: options.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: Domain4PageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async updateOne(input: UpdateDomain4Input, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const existDomain4 = await this.findOneOrFail(
        {
          where: { id: input.id },
        },
        { manager },
      );

      return this.save(
        {
          ...existDomain4,
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
      const domain4 = await this.findOneByOrFail({ id });

      return this.softRemove(domain4, { manager, user: options?.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
