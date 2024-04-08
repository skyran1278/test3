import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { Domain0003 } from './domain-0003.entity';
import { CreateDomain0003Input } from './dto/create-domain-0003.input';
import { Domain0003PageArgs } from './dto/domain-0003-page.args';
import { UpdateDomain0003Input } from './dto/update-domain-0003.input';

@Injectable()
export class Domain0003Service extends BaseService<Domain0003> {
  constructor(
    @InjectRepository(Domain0003)
    readonly repo: Repository<Domain0003>,
  ) {
    super(repo);
  }

  @Transactional()
  async saveOne(
    input: CreateDomain0003Input | UpdateDomain0003Input,
  ): Promise<Domain0003> {
    const domain0003 = await this.save(input);

    return domain0003;
  }

  @Transactional()
  findPage(args: Domain0003PageArgs) {
    return this.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain0003 = await this.findOneByOrFail({ id });

    return this.softRemove(domain0003);
  }
}
