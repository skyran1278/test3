import { AsyncLocalStorage } from 'async_hooks';

import { InternalServerErrorException } from '@nestjs/common';

import { AlsStore } from './als-store.interface';

export class AlsService {
  private static als = new AsyncLocalStorage<AlsStore>();

  isActive() {
    return !!AlsService.als.getStore();
  }

  public run<T>(store: AlsStore, fn: () => T): T {
    return AlsService.als.run(store, fn);
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

  public get<T extends keyof AlsStore>(key: T): AlsStore[T] {
    const store = this.getStore();
    const value = store[key];
    return value;
  }

  public set<T extends keyof AlsStore>(key: T, value: AlsStore[T]): void {
    const store = this.getStore();
    store[key] = value;
  }
}

export const als = new AlsService();
