import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ColumnField } from 'src/common/column-field.decorator';
import { ManyToOneField } from 'src/common/many-to-one-field.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { Domain0009 } from 'src/domain-0009/domain-0009.entity';
import { Domain0009ById } from 'src/domain-0009/query/domain-0009-by-id.type';
import { Entity } from 'typeorm';

@Entity()
@ObjectType({ implements: [MetaEntity, Domain0009ById] })
export class Domain0010 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain0010001' })
  domain0010001?: Maybe<number>;

  @ColumnField({ type: 'uuid' })
  domain0009Id!: string;
  @ManyToOneField(() => Domain0009, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  domain0009?: Domain0009;
}
