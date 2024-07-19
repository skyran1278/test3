// import { BadRequestException, Logger } from '@nestjs/common';
// import { DeepPartial, In, TreeRepository } from 'typeorm';

// import {
//   canTopologicalSort,
//   topologicalSort,
// } from '../domain-0021/topological-sort';
// import { BaseRepository } from './base.repository';
// import { TreeEntity } from './tree.entity';

// export abstract class TreeBaseRepository<
//   Entity extends TreeEntity,
// > extends BaseRepository<Entity> {
//   readonly logger = new Logger(this.constructor.name);

//   constructor(private readonly treeRepository: TreeRepository<Entity>) {
//     super(treeRepository);
//   }

//   async save(entity: DeepPartial<Entity>): Promise<Entity>;
//   async save(entities: DeepPartial<Entity>[]): Promise<Entity[]>;
//   async save(
//     input: DeepPartial<Entity> | DeepPartial<Entity>[],
//   ): Promise<Entity | Entity[]> {
//     if (Array.isArray(input)) {
//       const databaseParents = await this.treeRepository.findBy({
//         id: In(input.map(({ parentId }) => parentId)),
//       });

//       const parents = input.concat(databaseParents);

//       // https://orkhan.gitbook.io/typeorm/docs/tree-entities#working-with-tree-entities
//       // To bind tree entities to each other, it is required to set the parent in the child entity and then save them.
//       input.forEach((e) => {
//         if (e.parentId == null) return;

//         const parent = parents.find(({ id }) => id === e.parentId);

//         if (!parent) {
//           throw new BadRequestException(
//             `Parent with id ${e.parentId} does not exist`,
//           );
//         }

//         e.parent = parent;
//       });

//       if (!canTopologicalSort(input)) return super.save(input);
//       const parentGoFirst = topologicalSort(input);

//       return super.save(parentGoFirst);
//     }

//     if (input.parentId != null && input.parent == null) {
//       const parent = await this.treeRepository.findOneBy({
//         id: input.parentId,
//       });

//       if (!parent) {
//         throw new BadRequestException(
//           `Parent with id ${input.parentId} does not exist`,
//         );
//       }

//       input.parent = parent;
//     }

//     return super.save(input);
//   }
// }
