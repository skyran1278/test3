import assert from 'assert';

import { Maybe } from 'graphql/jsutils/Maybe';

import { Nullable } from '../common/nullable.interface';

interface Element {
  id: string;
  parentId?: Maybe<string>; // null indicates no parent (root element)
}

/**
 * @see https://en.wikipedia.org/wiki/Topological_sorting
 * @param elements
 * @returns
 */
export function topologicalSort(elements: Element[]): Element[] {
  const sorted: Element[] = [];
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

export const canTopologicalSort = <T extends Element>(
  elements: Nullable<T>[],
): elements is T[] => {
  return elements.every((e) => e.id);
};
