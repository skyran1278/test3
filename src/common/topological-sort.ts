import assert from 'assert';

import { DeepPartial } from 'typeorm';

import { TreeBaseInterface } from './tree-base.interface';

/**
 * @see https://en.wikipedia.org/wiki/Topological_sorting
 * @param elements
 * @returns
 */
export function topologicalSort<T extends TreeBaseInterface>(
  elements: T[],
): T[] {
  const sorted: T[] = [];
  const visited: Set<string> = new Set();
  const graph: Map<string, string[]> = new Map();

  // Build the graph
  elements.forEach((element) => {
    if (!graph.has(element.id)) {
      graph.set(element.id, []);
    }

    if (element.parentId) {
      if (!graph.has(element.parentId)) {
        graph.set(element.parentId, []);
      }

      const childIds = graph.get(element.parentId);
      assert(childIds);
      childIds.push(element.id);
    }
  });

  // Helper function for Depth-First Search
  function visit(id: string) {
    if (!visited.has(id)) {
      visited.add(id);
      if (graph.has(id)) {
        const childIds = graph.get(id);
        assert(childIds);
        childIds.forEach((childId) => visit(childId));
      }

      const child = elements.find((element) => element.id === id);
      assert(child);
      sorted.push(child);
    }
  }

  // Visit all nodes
  elements.forEach((element) => {
    if (!visited.has(element.id)) {
      visit(element.id);
    }
  });

  return sorted.reverse(); // reverse to ensure parents come before children
}

export const canTopologicalSort = <T extends TreeBaseInterface>(
  elements: DeepPartial<T>[],
): elements is T[] => {
  return elements.every((e) => e.id);
};
