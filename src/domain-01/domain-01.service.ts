import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { Domain01 } from './domain-01.entity';
import { Domain01Repository } from './domain-01.repository';
import { CreateDomain01Input } from './mutation/create-domain-01.input';
import { UpdateDomain01Input } from './mutation/update-domain-01.input';
import { Domain01PageArgs } from './query/domain-01-page.args';

@Injectable()
export class Domain01Service {
  constructor(private readonly repo: Domain01Repository) {}

  @Transactional()
  async saveOne(
    input: CreateDomain01Input | UpdateDomain01Input,
  ): Promise<Domain01> {
    const domain01 = this.repo.create(input);
    await this.repo.save(domain01);

    return domain01;
  }

  @Transactional()
  findPage(args: Domain01PageArgs) {
    return this.repo.findNodePage({
      ...args,
      where: args.where.map((item) => item.toFindOptionsWhere()),
    });
  }

  @Transactional()
  async removeOne(id: string) {
    const domain01 = await this.repo.findOneByOrFail({ id });

    return this.repo.softRemove(domain01);
  }
}
