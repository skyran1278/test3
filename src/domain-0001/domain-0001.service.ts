import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { Domain0001 } from './domain-0001.entity';
import { CreateDomain0001Input } from './dto/create-domain-0001.input';
import { Domain0001PageArgs } from './dto/domain-0001-page.args';
import { UpdateDomain0001Input } from './dto/update-domain-0001.input';

@Injectable()
export class Domain0001Service extends BaseService<Domain0001> {
  constructor(
    @InjectRepository(Domain0001)
    readonly repo: Repository<Domain0001>,
  ) {
    super(repo);
  }

  @Transactional()
  async saveOne(
    input: CreateDomain0001Input | UpdateDomain0001Input,
  ): Promise<Domain0001> {
    const domain0001 = await this.save(input);

    return domain0001;
  }

  @Transactional()
  findPage(args: Domain0001PageArgs) {
    return this.findNodePage(args);
  }

  @Transactional()
  async removeOne(id: string) {
    const domain0001 = await this.findOneByOrFail({ id });

    return this.softRemove(domain0001);
  }
}
