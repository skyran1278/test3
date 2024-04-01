import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { EntityManager, Repository } from 'typeorm';

import { Domain0001 } from './domain-0001.entity';
import { CreateDomain0001Input } from './mutation/create-domain-0001.input';
import { UpdateDomain0001Input } from './mutation/update-domain-0001.input';
import { Domain0001PageArgs } from './query/domain-0001-page.args';

@Injectable()
export class Domain0001Service extends BaseService<Domain0001> {
  constructor(
    @InjectRepository(Domain0001)
    readonly repo: Repository<Domain0001>,
    private readonly manager: EntityManager,
  ) {
    super(repo);
  }

  async saveOne(
    input: CreateDomain0001Input | UpdateDomain0001Input,
    options: ServiceOptions,
  ): Promise<Domain0001> {
    const transaction = async (manager: EntityManager) => {
      const domain0001 = await this.save(input, { manager, user: options.user });

      return domain0001;
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: Domain0001PageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async removeOne(id: string, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const domain0001 = await this.findOneByOrFail({ id });

      return this.softRemove(domain0001, { manager, user: options?.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
