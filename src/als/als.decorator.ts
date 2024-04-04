import { AlsStore } from './als-store.interface';
import { als } from './als.service';

export function RunAls() {
  return (_target: unknown, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod: unknown = descriptor.value;
    if (typeof originalMethod !== 'function') {
      throw new Error(
        `The @RunAls decorator can be only used on functions, but ${key.toString()} is not a function.`,
      );
    }

    descriptor.value = function (...args: unknown[]) {
      const store = {} as AlsStore;
      return als.run<unknown>(store, () => {
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
