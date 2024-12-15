import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain22 } from './domain-22.entity';
import { Domain22Repository } from './domain-22.repository';

@Injectable({ scope: Scope.REQUEST })
export class Domain22ChildrenLoader extends DataLoader<
  Domain22,
  Maybe<Domain22[]>
> {
  constructor(private readonly repo: Domain22Repository) {
    super(
      async (parents: readonly Domain22[]): Promise<Maybe<Domain22[]>[]> => {
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
