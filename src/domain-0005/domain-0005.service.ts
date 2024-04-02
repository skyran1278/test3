import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ServiceOptions } from 'src/common/service-options.interface';
import { Domain0006Service } from 'src/domain-0006/domain-0006.service';
import { Domain0007Service } from 'src/domain-0007/domain-0007.service';
import { EntityManager, Repository } from 'typeorm';

import { Domain0005 } from './domain-0005.entity';
import { CreateDomain0005Input } from './mutation/create-domain-0005.input';
import { UpdateDomain0005Input } from './mutation/update-domain-0005.input';
import { Domain0005PageArgs } from './query/domain-0005-page.args';

@Injectable()
export class Domain0005Service extends BaseService<Domain0005> {
  constructor(
    @InjectRepository(Domain0005)
    readonly repo: Repository<Domain0005>,
    private readonly manager: EntityManager,
    private readonly domain0006Service: Domain0006Service,
    private readonly domain0007Service: Domain0007Service,
  ) {
    super(repo);
  }

  async saveOne(
    input: CreateDomain0005Input | UpdateDomain0005Input,
    options: ServiceOptions,
  ): Promise<Domain0005> {
    const transaction = async (manager: EntityManager) => {
      const domain0005 = await this.save(input, {
        manager,
        user: options.user,
      });

      if (domain0005.domain0006s) {
        await this.domain0006Service.save(
          domain0005.domain0006s.map((domain0006) => {
            domain0006.domain0005Id = domain0005.id;
            return domain0006;
          }),
          {
            manager,
            user: options.user,
          },
        );

        const domain0007s = domain0005.domain0006s.flatMap((domain0006) => {
          if (!domain0006.domain0007s) return [];
          return domain0006.domain0007s.map((domain0007) => {
            domain0007.domain0006Id = domain0006.id;
            return domain0007;
          });
        });

        await this.domain0007Service.save(domain0007s, {
          manager,
          user: options.user,
        });
      }

      return domain0005;
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  findPage(args: Domain0005PageArgs, options?: ServiceOptions) {
    return this.findNodePage(args, options);
  }

  async removeOne(id: string, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const domain0005 = await this.findOneByOrFail({ id });
      domain0005.domain0006s = [];

      await this.save(domain0005, { manager, user: options.user });
      await this.remove(domain0005, { manager });
      return domain0005;
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }

  async softRemoveOne(id: string, options: ServiceOptions) {
    const transaction = async (manager: EntityManager) => {
      const existDomain0005 = await this.findOneOrFail({ where: { id } });

      const domain0005 = await this.softRemove(existDomain0005, {
        manager,
        user: options?.user,
      });

      return domain0005;
    };

    return options.manager
      ? transaction(options.manager)
      : this.manager.transaction('READ COMMITTED', transaction);
  }
}
