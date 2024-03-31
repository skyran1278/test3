import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { EntityManager, Repository } from 'typeorm';

import { Domain1 } from './domain-1.entity';
import { CreateDomain1Input } from './mutation/create-domain-1.input';
import { UpdateDomain1Input } from './mutation/update-domain-1.input';
import { Domain1PageArgs } from './query/domain-1-page.args';

@Injectable()
export class Domain1Service extends BaseService<Domain1> {
  constructor(
    @InjectRepository(Domain1)
    readonly repo: Repository<Domain1>,
    private readonly manager: EntityManager,
  ) {
    super(repo);
  }

  async createOne(
    input: CreateDomain1Input | Domain1,
    options: ServiceOptions,
  ): Promise<Domain1> {
    const transaction = async (manager: EntityManager) => {
      const domain1 = await this.save(input, { manager, user: options.user });

      return domain1;
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: Domain1PageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async updateOne(input: UpdateDomain1Input, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const existDomain1 = await this.findOneOrFail(
        {
          where: { id: input.id },
        },
        { manager },
      );

      return this.save(
        {
          ...existDomain1,
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
      const domain1 = await this.findOneByOrFail({ id });

      return this.softRemove(domain1, { manager, user: options?.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
