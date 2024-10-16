import { PromiseOrValue } from 'graphql/jsutils/PromiseOrValue';

/**
 * @see https://github.com/MichalLytek/type-graphql/blob/5d7faede87a3bbf6f899978abf9ad94f63a5dc22/src/typings/ResolverInterface.ts#L5
 *
 * Resolver classes can implement this type
 * to provide a proper resolver method signatures for fields of T.
 */
export type ResolverInterface<T extends object> = {
  [P in keyof T]?: (root: T, ...args: unknown[]) => PromiseOrValue<T[P]>;
};
