import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Maybe } from 'graphql/jsutils/Maybe';

import { Domain21 } from './domain-21.entity';
import { Domain21Repository } from './domain-21.repository';

@Injectable({ scope: Scope.REQUEST })
export class Domain21ChildrenLoader extends DataLoader<
  Domain21,
  Maybe<Domain21[]>
> {
  constructor(private readonly repo: Domain21Repository) {
    super(
      async (parents: readonly Domain21[]): Promise<Maybe<Domain21[]>[]> => {
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
