import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ColumnField } from 'src/common/column-field.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { OneToManyField } from 'src/common/one-to-many-field.decorator';
import { Domain0006 } from 'src/domain-0006/domain-0006.entity';
import { Entity } from 'typeorm';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain0005 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain0005001' })
  domain0005001?: Maybe<number>;

  @OneToManyField(() => Domain0006, (item) => item.domain0005, {
    comment: 'OneToMany',
    nullable: true,
  })
  domain0006s?: Domain0006[];
}
