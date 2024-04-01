import { ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ColumnField } from 'src/common/column-field.decorator';
import { ManyToOneField } from 'src/common/many-to-one-field.decorator';
import { MetaEntity } from 'src/common/meta.entity';
import { Domain0002 } from 'src/domain-0002/domain-0002.entity';
import { Domain0002Id } from 'src/domain-0002/query/domain-0002-id.type';
import { Entity } from 'typeorm';

@Entity()
@ObjectType({ implements: [MetaEntity, Domain0002Id] })
export class Domain0003 extends MetaEntity {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain0003001' })
  domain0003001?: Maybe<number>;

  @ColumnField({ type: 'uuid' })
  domain0002Id!: string;
  @ManyToOneField(() => Domain0002, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  domain0002?: Domain0002;
}
