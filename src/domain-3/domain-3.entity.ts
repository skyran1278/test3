import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ColumnField } from 'src/common/column-field.decorator';
import { ManyToOneField } from 'src/common/many-to-one-field.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { Domain2 } from 'src/domain-2/domain-2.entity';
import { Entity } from 'typeorm';

@Entity()
@ObjectType({ implements: MetaEntity })
export class Domain3 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain3001' })
  domain3001?: Maybe<number>;

  @ColumnField({ type: 'uuid' })
  domain2Id!: string;
  @ManyToOneField(() => Domain2, { onDelete: 'CASCADE' })
  domain2?: Domain2;
}
