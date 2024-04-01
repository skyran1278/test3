import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { EntityManager, Repository } from 'typeorm';

import { Domain0002 } from './domain-0002.entity';
import { CreateDomain0002Input } from './mutation/create-domain-0002.input';
import { UpdateDomain0002Input } from './mutation/update-domain-0002.input';
import { UpdateDomain0002sInput } from './mutation/update-domain-0002s.input';
import { Domain0002PageArgs } from './query/domain-0002-page.args';

@Injectable()
export class Domain0002Service extends BaseService<Domain0002> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(Domain0002)
    readonly repo: Repository<Domain0002>,
  ) {
    super(repo);
  }

  async createOne(
    input: CreateDomain0002Input | Domain0002,
    options: ServiceOptions,
  ): Promise<Domain0002> {
    const transaction = async (manager: EntityManager) => {
      return this.save(input, { manager, user: options.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: Domain0002PageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async updateOne(input: UpdateDomain0002Input, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const existDomain0002 = await this.findOneOrFail(
        {
          where: { id: input.id },
        },
        { manager },
      );

      return this.save(
        {
          ...existDomain0002,
          ...input,
        },
        { manager, user: options.user },
      );
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  async updateMany(
    input: UpdateDomain0002sInput,
    options: ServiceOptions,
  ): Promise<Domain0002[]> {
    const transaction = async (manager: EntityManager) => {
      return this.save(input.domain0002s, { manager, user: options.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  async removeOne(id: string, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const domain0002 = await this.findOneByOrFail({ id });

      return this.softRemove(domain0002, { manager, user: options?.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
