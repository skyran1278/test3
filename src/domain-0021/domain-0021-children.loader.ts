import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0021 } from './domain-0021.entity';
import { Domain0021Repository } from './domain-0021.repository';

@Injectable({ scope: Scope.REQUEST })
export class Domain0021ChildrenLoader extends DataLoader<
  Domain0021,
  Maybe<Domain0021[]>
> {
  constructor(private readonly repo: Domain0021Repository) {
    super(
      async (
        parents: readonly Domain0021[],
      ): Promise<Maybe<Domain0021[]>[]> => {
        const childrenTreeArray = await Promise.all(
          parents.map(async (parent) => {
            const parentTree = await this.repo.findDescendantsTree(parent, {
              depth: 1,
            });
            return parentTree.children;
          }),
        );

        return childrenTreeArray;
      },
    );
  }
}
