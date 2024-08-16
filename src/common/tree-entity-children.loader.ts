// import { Injectable, Scope } from '@nestjs/common';
// import DataLoader from 'dataloader';
// import { Maybe } from 'graphql/jsutils/Maybe';

// import { TreeBaseRepository } from './tree-base.repository';

// @Injectable({ scope: Scope.REQUEST })
// export class TreeBaseChildrenLoader extends DataLoader<
//   TreeBase,
//   Maybe<TreeBase[]>
// > {
//   constructor(private readonly repo: TreeBaseRepository) {
//     super(
//       async (parents: readonly TreeBase[]): Promise<Maybe<TreeBase[]>[]> => {
//         const childrenTreeArray = await Promise.all(
//           parents.map(async (parent) => {
//             const parentTree = await this.repo.findDescendantsTree(parent, {
//               depth: 1,
//             });
//             return parentTree.children;
//           }),
//         );

//         return childrenTreeArray;
//       },
//     );
//   }
// }
