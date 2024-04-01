import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { EntityManager, Repository } from 'typeorm';

import { Domain0009 } from './domain-0009.entity';
import { CreateDomain0009Input } from './mutation/create-domain-0009.input';
import { UpdateDomain0009Input } from './mutation/update-domain-0009.input';
import { UpdateDomain0009sInput } from './mutation/update-domain-0009s.input';
import { Domain0009PageArgs } from './query/domain-0009-page.args';

@Injectable()
export class Domain0009Service extends BaseService<Domain0009> {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(Domain0009)
    readonly repo: Repository<Domain0009>,
  ) {
    super(repo);
  }

  async createOne(
    input: CreateDomain0009Input | Domain0009,
    options: ServiceOptions,
  ): Promise<Domain0009> {
    const transaction = async (manager: EntityManager) => {
      return this.save(input, { manager, user: options.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: Domain0009PageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async updateOne(input: UpdateDomain0009Input, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const existDomain0009 = await this.findOneOrFail(
        {
          where: { id: input.id },
        },
        { manager },
      );

      return this.save(
        {
          ...existDomain0009,
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
    input: UpdateDomain0009sInput,
    options: ServiceOptions,
  ): Promise<Domain0009[]> {
    const transaction = async (manager: EntityManager) => {
      return this.save(input.domain0009s, { manager, user: options.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  async removeOne(id: string, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const domain0009 = await this.findOneByOrFail({ id });

      return this.softRemove(domain0009, { manager, user: options?.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
