import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ColumnField } from 'src/common/column-field.decorator';
import { ManyToOneField } from 'src/common/many-to-one-field.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { OneToManyField } from 'src/common/one-to-many-field.decorator';
import { Domain0005 } from 'src/domain-0005/domain-0005.entity';
import { Domain0007 } from 'src/domain-0007/domain-0007.entity';
import { Entity } from 'typeorm';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain0006 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain0006001' })
  domain0006001?: Maybe<number>;

  @ColumnField({ type: 'uuid', comment: 'domain0005Id' })
  domain0005Id!: string;
  @ManyToOneField(() => Domain0005, {
    comment: 'ManyToOne',
    orphanedRowAction: 'delete',
  })
  domain0005?: Domain0005;

  @OneToManyField(() => Domain0007, (item) => item.domain0006, {
    comment: 'OneToMany',
    nullable: true,
  })
  domain0007s?: Domain0007[];
}
