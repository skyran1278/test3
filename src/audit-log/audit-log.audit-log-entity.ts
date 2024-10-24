import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ObjectLiteral,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../user/user.entity';
import { AuditActionEnum } from './audit-action.enum';

@ObjectType()
@Entity({ database: process.env.AUDIT_LOG_DB_NAME })
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Field(() => Date)
  @Column({ type: 'varchar', length: 36 })
  requestId!: string;

  @Column({ type: 'uuid' })
  userId!: string;
  @ManyToOne(() => User)
  user?: User;

  @Column({ type: 'text' })
  input!: string;

  @Column({ type: 'enum', enum: AuditActionEnum })
  action!: AuditActionEnum;

  @Column({ type: 'varchar', length: 255 })
  tableName!: string;

  @Column({ type: 'uuid' })
  entityId!: string;

  @Column({ type: 'json' })
  previousEntity!: ObjectLiteral;

  @Column({ type: 'json' })
  newEntity!: ObjectLiteral;
}
