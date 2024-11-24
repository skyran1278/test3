import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain0022 } from './domain-0022.entity';
import { Domain0022Repository } from './domain-0022.repository';

@Injectable({ scope: Scope.REQUEST })
export class Domain0022ChildrenLoader extends DataLoader<
  Domain0022,
  Maybe<Domain0022[]>
> {
  constructor(private readonly repo: Domain0022Repository) {
    super(
      async (
        parents: readonly Domain0022[],
      ): Promise<Maybe<Domain0022[]>[]> => {
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
