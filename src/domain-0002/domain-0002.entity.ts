import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ColumnField } from 'src/common/column-field.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { OneToManyField } from 'src/common/one-to-many-field.decorator';
import { Domain0003 } from 'src/domain-0003/domain-0003.entity';
import { Entity } from 'typeorm';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain0002 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain0002001' })
  domain0002001?: Maybe<number>;

  @OneToManyField(() => Domain0003, (item) => item.domain0002, {
    cascade: true,
    comment: 'OneToMany',
    nullable: true,
  })
  domain0003s?: Domain0003[];
}
