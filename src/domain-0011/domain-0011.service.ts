import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { EntityManager, Repository } from 'typeorm';

import { Domain0011 } from './domain-0011.entity';
import { CreateDomain0011Input } from './mutation/create-domain-0011.input';
import { UpdateDomain0011Input } from './mutation/update-domain-0011.input';
import { Domain0011PageArgs } from './query/domain-0011-page.args';

@Injectable()
export class Domain0011Service extends BaseService<Domain0011> {
  constructor(
    @InjectRepository(Domain0011)
    readonly repo: Repository<Domain0011>,
    private readonly manager: EntityManager,
  ) {
    super(repo);
  }

  async saveOne(
    input: CreateDomain0011Input | UpdateDomain0011Input,
    options: ServiceOptions,
  ): Promise<Domain0011> {
    const transaction = async (manager: EntityManager) => {
      const domain0011 = await this.save(input, { manager, user: options.user });

      return domain0011;
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: Domain0011PageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async removeOne(id: string, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const domain0011 = await this.findOneByOrFail({ id });

      return this.softRemove(domain0011, { manager, user: options?.user });
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
