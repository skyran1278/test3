import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@InterfaceType()
export abstract class MetaEntity {
  /** @see https://github.com/typestack/class-validator#validation-groups */
  validationGroups?: string[] | string;

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn({ nullable: true })
  deletedAt?: Maybe<Date>;

  @Field(() => ID, { nullable: true })
  @Column({ type: 'uuid', nullable: true })
  createUserId?: Maybe<string>;
  @ManyToOne('User', { nullable: true })
  createUser?: Maybe<User>;

  @Field(() => ID, { nullable: true })
  @Column({ type: 'uuid', nullable: true })
  updateUserId?: Maybe<string>;
  @ManyToOne('User', { nullable: true })
  updateUser?: Maybe<User>;

  @Field(() => ID, { nullable: true })
  @Column({ type: 'uuid', nullable: true })
  deleteUserId?: Maybe<string>;
  @ManyToOne('User', { nullable: true })
  deleteUser?: Maybe<User>;
}
