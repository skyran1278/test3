import { RawRule } from '@casl/ability';
import { Field, ObjectType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Entity, ManyToMany, ObjectLiteral } from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { MetaEntity } from '../common/meta.entity';
import { Role } from '../role/role.entity';
import { PermissionActionEnum } from './permission-action.enum';

@Entity()
@ObjectType({ implements: [MetaEntity] })
export class Permission extends MetaEntity implements RawRule {
  @ColumnField({ type: 'enum', enum: PermissionActionEnum })
  action!: PermissionActionEnum;

  @ColumnField({ type: 'varchar', length: 50 })
  subject!: string;

  // fix Type 'Record<string, unknown>' is not assignable to type '(() => string) | _QueryDeepPartialEntity<Maybe<Record<string, unknown>>>' while calling insert
  @ColumnField({ type: 'jsonb', nullable: true })
  conditions?: Maybe<ObjectLiteral>;

  @Field(() => [Role], { nullable: true, description: '角色' })
  @ManyToMany(() => Role, (role) => role.permissions)
  roles?: Role[];
}
