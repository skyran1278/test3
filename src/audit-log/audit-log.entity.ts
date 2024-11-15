import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  Entity,
  ObjectLiteral,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ColumnField } from '../common/column-field.decorator';
import { ManyToOneField } from '../common/many-to-one-field.decorator';
import { User } from '../user/user.entity';
import { AuditActionEnum } from './audit-action.enum';

@ObjectType()
@Entity()
export class AuditLog {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt!: Date;

  @ColumnField({ type: 'varchar', length: 36 })
  requestId!: string;

  @ColumnField({ type: 'uuid' })
  userId!: string;
  @ManyToOneField(() => User)
  user?: User;

  @ColumnField({ type: 'text' })
  input!: string;

  @ColumnField({ type: 'enum', enum: AuditActionEnum })
  action!: AuditActionEnum;

  @ColumnField({ type: 'varchar', length: 255 })
  tableName!: string;

  @ColumnField({ type: 'uuid' })
  entityId!: string;

  @ColumnField({ type: 'json' })
  previousEntity!: ObjectLiteral;

  @ColumnField({ type: 'json' })
  newEntity!: ObjectLiteral;
}
