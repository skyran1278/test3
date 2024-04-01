import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { EntityManager, Repository } from 'typeorm';

import { Domain0012 } from './domain-0012.entity';
import { CreateDomain0012Input } from './mutation/create-domain-0012.input';
import { UpdateDomain0012Input } from './mutation/update-domain-0012.input';
import { Domain0012PageArgs } from './query/domain-0012-page.args';

@Injectable()
export class Domain0012Service extends BaseService<Domain0012> {
  constructor(
    @InjectRepository(Domain0012)
    readonly repo: Repository<Domain0012>,
    private readonly manager: EntityManager,
  ) {
    super(repo);
  }

  async saveOne(
    input: CreateDomain0012Input | UpdateDomain0012Input,
    options: ServiceOptions,
  ): Promise<Domain0012> {
    const transaction = async (manager: EntityManager) => {
      const domain0012 = await this.save(input, { manager, user: options.user });

      return domain0012;
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: Domain0012PageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async removeOne(id: string, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const domain0012 = await this.findOneByOrFail({ id });

      return this.softRemove(domain0012, { manager, user: options?.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
