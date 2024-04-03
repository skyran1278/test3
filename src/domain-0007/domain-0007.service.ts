import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { Domain0007 } from './domain-0007.entity';
import { CreateDomain0007Input } from './mutation/create-domain-0007.input';
import { UpdateDomain0007Input } from './mutation/update-domain-0007.input';
import { Domain0007PageArgs } from './query/domain-0007-page.args';

@Injectable()
export class Domain0007Service extends BaseService<Domain0007> {
  constructor(
    @InjectRepository(Domain0007)
    readonly repo: Repository<Domain0007>,
  ) {
    super(repo);
  }

  @Transactional()
  async saveOne(
    input: CreateDomain0007Input | UpdateDomain0007Input,
  ): Promise<Domain0007> {
    const domain0007 = await this.save(input);

    return domain0007;
  }

  @Transactional()
  findPage(args: Domain0007PageArgs) {
    return this.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain0007 = await this.findOneByOrFail({ id });

    return this.softRemove(domain0007);
  }
}
