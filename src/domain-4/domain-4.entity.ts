import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ColumnField } from 'src/common/column-field.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { OneToManyField } from 'src/common/one-to-many-field.decorator';
import { Domain5 } from 'src/domain-5/domain-5.entity';
import { Entity } from 'typeorm';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain4 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain4001' })
  domain4001?: Maybe<number>;

  @OneToManyField(() => Domain5, (item) => item.domain4, {
    comment: 'OneToMany',
    nullable: true,
  })
  domain5s?: Domain5[];
}
