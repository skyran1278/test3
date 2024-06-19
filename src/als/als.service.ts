import { AsyncLocalStorage } from 'async_hooks';

import { InternalServerErrorException } from '@nestjs/common';

import { AlsStore } from './als-store.interface';

export class AlsService {
  private static als = new AsyncLocalStorage<AlsStore>();

  public isActive() {
    return !!AlsService.als.getStore();
  }

  public run<T>(store: AlsStore, fn: () => T): T {
    return AlsService.als.run(store, fn);
  }

  public get<T extends keyof AlsStore>(key: T): AlsStore[T] {
    const store = this.getStore();
    const value = store[key];
    return value;
  }

  public getOrFail<T extends keyof AlsStore>(key: T): NonNullable<AlsStore[T]> {
    const value = this.get(key);

    if (!value) {
      throw new InternalServerErrorException(`${key} not found in store`);
    }

    return value;
  }

  public set<T extends keyof AlsStore>(key: T, value: AlsStore[T]): void {
    const store = this.getStore();
    store[key] = value;
  }

  public has<T extends keyof AlsStore>(key: T): boolean {
    return this.get(key) !== undefined;
  }

  private getStore(): AlsStore {
    const store = AlsService.als.getStore();
    if (!store) {
      throw new InternalServerErrorException(
        'No store found. Please make sure to run the function within the context of the AsyncLocalStorage.',
      );
    }
    return store;
  }
}

export const alsService = new AlsService();
