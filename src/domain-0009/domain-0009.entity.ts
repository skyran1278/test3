import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ColumnField } from 'src/common/column-field.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { OneToManyField } from 'src/common/one-to-many-field.decorator';
import { Domain0010 } from 'src/domain-0010/domain-0010.entity';
import { Entity } from 'typeorm';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain0009 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain0009001' })
  domain0009001?: Maybe<number>;

  @OneToManyField(() => Domain0010, (item) => item.domain0009, {
    cascade: true,
    comment: 'OneToMany',
    nullable: true,
  })
  domain0010s?: Domain0010[];
}
