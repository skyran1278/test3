import { AlsService, als } from './als.service';

interface RunAlsOptions<T extends unknown[]> {
  setup?: (als: AlsService, ...args: T) => void | Promise<void>;
}

export function RunAls<T extends unknown[]>(options?: RunAlsOptions<T>) {
  return (
    _target: unknown,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod: unknown = descriptor.value;
    if (typeof originalMethod !== 'function') {
      throw new Error(
        `The @RunAls decorator can be only used on functions, but ${key.toString()} is not a function.`,
      );
    }

    descriptor.value = function (...args: T) {
      return als.run<unknown>({}, async () => {
        if (options?.setup) {
          await options.setup.apply(this, [als, ...args]);
        }
        return originalMethod.apply(this, args);
      });
    };
    return descriptor;
  };
}

// /**
//  * Copies all metadata from one object to another.
//  * Useful for overwriting function definition in
//  * decorators while keeping all previously
//  * attached metadata
//  *
//  * @param from object to copy metadata from
//  * @param to object to copy metadata to
//  */
// export function copyMethodMetadata(from: unknown, to: unknown) {
//     const metadataKeys = Reflect.getMetadataKeys(from);
//     metadataKeys.map((key) => {
//         const value = Reflect.getMetadata(key, from);
//         Reflect.defineMetadata(key, value, to);
//     });
// }
