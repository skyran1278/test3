import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cloneDeep } from 'lodash';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { BaseService } from '../common/base.service';
import { Domain0006Service } from '../domain-0006/domain-0006.service';
import { Domain0005 } from './domain-0005.entity';
import { CreateDomain0005Input } from './dto/create-domain-0005.input';
import { Domain0005PageArgs } from './dto/domain-0005-page.args';
import { UpdateDomain0005Input } from './dto/update-domain-0005.input';

@Injectable()
export class Domain0005Service extends BaseService<Domain0005> {
  constructor(
    @InjectRepository(Domain0005)
    readonly repo: Repository<Domain0005>,
    private readonly domain0006Service: Domain0006Service,
    // private readonly domain0007Service: Domain0007Service,
  ) {
    super(repo);
  }

  @Transactional()
  async saveOne(
    input: CreateDomain0005Input | UpdateDomain0005Input,
  ): Promise<Domain0005> {
    const domain0005 = await this.save(input);

    if (domain0005.domain0006s) {
      await this.domain0006Service.save(
        domain0005.domain0006s.map((domain0006) => {
          domain0006.domain0005Id = domain0005.id;
          return domain0006;
        }),
      );

      // const domain0007s = domain0005.domain0006s.flatMap((domain0006) => {
      //   if (!domain0006.domain0007s) return [];
      //   return domain0006.domain0007s.map((domain0007) => {
      //     domain0007.domain0006Id = domain0006.id;
      //     return domain0007;
      //   });
      // });

      // await this.domain0007Service.save(domain0007s, {
      //  manager: this.manager,
      //   user: options.user,
      // });
    }

    return domain0005;
  }

  @Transactional()
  findPage(args: Domain0005PageArgs) {
    return this.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain0005 = await this.findOneOrFail({
      where: { id },
      relations: {
        domain0006s: true,
      },
    });

    // because remove will let id to be undefined, so we need to clone it first
    const removedDomain0005 = cloneDeep(domain0005);

    if (domain0005.domain0006s) {
      await this.domain0006Service.remove(domain0005.domain0006s);
    }

    await this.remove(domain0005);

    return removedDomain0005;
  }

  @Transactional()
  async softRemoveOne(id: string) {
    const domain0005 = await this.findOneOrFail({
      where: { id },
      relations: { domain0006s: true },
    });

    // unlike remove, softRemove should remove head first to prevent redundant update bodies
    await this.softRemove(domain0005);

    if (domain0005.domain0006s) {
      await this.domain0006Service.softRemove(domain0005.domain0006s);
    }

    return domain0005;
  }
}
