import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ColumnField } from 'src/common/column-field.decorator';
import { ManyToOneField } from 'src/common/many-to-one-field.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { Domain0006 } from 'src/domain-0006/domain-0006.entity';
import { Entity } from 'typeorm';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain0007 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain0007001' })
  domain0007001?: Maybe<number>;

  @ColumnField({ type: 'uuid', comment: 'domain0006Id' })
  domain0006Id!: string;
  @ManyToOneField(() => Domain0006, {
    comment: 'ManyToOne',
    orphanedRowAction: 'delete',
  })
  domain0006?: Domain0006;
}
