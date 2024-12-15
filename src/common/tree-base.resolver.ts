// import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
// import { Maybe } from 'graphql/jsutils/Maybe';

// import { User } from '../user/user.entity';
// import { TreeBaseEntity } from './tree-base.entity';

// @Resolver(() => TreeBaseEntity)
// export class TreeBaseEntityResolver {
//   constructor(
//     private readonly domain21ChildrenLoader: Domain21ChildrenLoader,
//   ) {}

//   @ResolveField(() => User, { nullable: true })
//   async createdUser(
//     @Parent() { createdUser, createdUserId }: TreeBaseEntity,
//   ): Promise<Maybe<User>> {
//     if (createdUser) return createdUser;
//     if (createdUserId) return this.userByIdLoader.load(createdUserId);
//     return null;
//   }

//   @ResolveField(() => User, { nullable: true })
//   async updatedUser(
//     @Parent() { updatedUser, updatedUserId }: TreeBaseEntity,
//   ): Promise<Maybe<User>> {
//     if (updatedUser) return updatedUser;
//     if (updatedUserId) return this.userByIdLoader.load(updatedUserId);
//     return null;
//   }

//   @ResolveField(() => User, { nullable: true })
//   async deletedUser(
//     @Parent() { deletedUser, deletedUserId }: TreeBaseEntity,
//   ): Promise<Maybe<User>> {
//     if (deletedUser) return deletedUser;
//     if (deletedUserId) return this.userByIdLoader.load(deletedUserId);
//     return null;
//   }
// }
