import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { EntityManager, Repository } from 'typeorm';

import { Domain0005Service } from 'src/domain-0005/domain-0005.service';
import { Domain0004 } from './domain-0004.entity';
import { CreateDomain0004Input } from './mutation/create-domain-0004.input';
import { UpdateDomain0004Input } from './mutation/update-domain-0004.input';
import { Domain0004PageArgs } from './query/domain-0004-page.args';

@Injectable()
export class Domain0004Service extends BaseService<Domain0004> {
  constructor(
    @InjectRepository(Domain0004)
    readonly repo: Repository<Domain0004>,
    private readonly manager: EntityManager,
    private readonly domain0005Service: Domain0005Service,
  ) {
    super(repo);
  }

  async createOne(
    input: CreateDomain0004Input,
    options: ServiceOptions,
  ): Promise<Domain0004> {
    const transaction = async (manager: EntityManager) => {
      const domain0004 = await this.save(input, { manager, user: options.user });

      domain0004.domain0005s = await this.domain0005Service.save(
        input.domain0005s.map((domain0005) => ({ ...domain0005, domain0004 })),
        {
          manager,
          user: options.user,
        },
      );
      return domain0004;
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: Domain0004PageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async updateOne(input: UpdateDomain0004Input, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const domain0004 = await this.save(input, { manager, user: options.user });

      domain0004.domain0005s = await this.domain0005Service.save(
        input.domain0005s.map((domain0005) => ({
          ...domain0005,
          domain0004Id: domain0004.id,
        })),
        {
          manager,
          user: options.user,
        },
      );

      return domain0004;
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  async removeOne(id: string, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const domain0004 = await this.findOneByOrFail({ id });

      return this.softRemove(domain0004, { manager, user: options?.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
