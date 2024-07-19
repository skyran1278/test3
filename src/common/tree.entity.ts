// import { Field, InterfaceType } from '@nestjs/graphql';
// import { IsOptional } from 'class-validator';
// import { Maybe } from 'graphql/jsutils/Maybe';
// import { TreeChildren, TreeParent } from 'typeorm';

// import { ColumnField } from './column-field.decorator';
// import { MetaEntity } from './meta.entity';

// @InterfaceType()
// export abstract class TreeEntity extends MetaEntity {
//   @IsOptional()
//   @ColumnField({
//     type: 'uuid',
//     nullable: true,
//     comment: 'Parent ID',
//   })
//   parentId?: Maybe<string>;
//   @Field(() => TreeEntity, { nullable: true, description: 'Parent' })
//   @TreeParent()
//   parent?: Maybe<TreeEntity>;

//   @Field(() => [TreeEntity], { nullable: true, description: 'Tree Children' })
//   @TreeChildren()
//   children?: Maybe<TreeEntity[]>;
// }
