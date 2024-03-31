import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ColumnField } from 'src/common/column-field.decorator';
import { ManyToOneField } from 'src/common/many-to-one-field.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { Domain4 } from 'src/domain-4/domain-4.entity';
import { Entity } from 'typeorm';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain5 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain5001' })
  domain5001?: Maybe<number>;

  @ColumnField({ type: 'uuid', comment: 'domain4Id' })
  domain4Id!: string;
  @ManyToOneField(() => Domain4, {
    comment: 'ManyToOne',
    orphanedRowAction: 'delete',
  })
  domain4?: Domain4;
}
