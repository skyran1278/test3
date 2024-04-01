import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ColumnField } from 'src/common/column-field.decorator';
import { ManyToOneField } from 'src/common/many-to-one-field.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { Domain0004 } from 'src/domain-0004/domain-0004.entity';
import { Entity } from 'typeorm';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain0005 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain0005001' })
  domain0005001?: Maybe<number>;

  @ColumnField({ type: 'uuid', comment: 'domain0004Id' })
  domain0004Id!: string;
  @ManyToOneField(() => Domain0004, {
    comment: 'ManyToOne',
    orphanedRowAction: 'delete',
  })
  domain0004?: Domain0004;
}
