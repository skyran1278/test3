import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { EntityManager, Repository } from 'typeorm';

import { Domain0007 } from './domain-0007.entity';
import { CreateDomain0007Input } from './mutation/create-domain-0007.input';
import { UpdateDomain0007Input } from './mutation/update-domain-0007.input';
import { Domain0007PageArgs } from './query/domain-0007-page.args';

@Injectable()
export class Domain0007Service extends BaseService<Domain0007> {
  constructor(
    @InjectRepository(Domain0007)
    readonly repo: Repository<Domain0007>,
    private readonly manager: EntityManager,
  ) {
    super(repo);
  }

  async saveOne(
    input: CreateDomain0007Input | UpdateDomain0007Input,
    options: ServiceOptions,
  ): Promise<Domain0007> {
    const transaction = async (manager: EntityManager) => {
      const domain0007 = await this.save(input, { manager, user: options.user });

      return domain0007;
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: Domain0007PageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async removeOne(id: string, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const domain0007 = await this.findOneByOrFail({ id });

      return this.softRemove(domain0007, { manager, user: options?.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
