import { Field, ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity, Tree, TreeChildren, TreeParent } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { MetaEntity } from '../common/meta.entity';
import { TreeBaseInterface } from '../common/tree-base.interface';

@Tree('closure-table')
@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Domain22 extends MetaEntity implements TreeBaseInterface {
  @ColumnField({ type: 'int', nullable: true, comment: 'domain2201' })
  domain2201?: Maybe<number>;

  @ColumnField({
    type: 'uuid',
    nullable: true,
    comment: 'parent ID',
  })
  parentId?: Maybe<string>;
  @Field(() => Domain22, { nullable: true, description: 'parent' })
  @TreeParent()
  parent?: Maybe<Domain22>;

  @Field(() => [Domain22], { nullable: true, description: 'tree children' })
  @TreeChildren()
  children?: Maybe<Domain22[]>;
}
