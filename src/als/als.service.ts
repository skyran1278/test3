import { AsyncLocalStorage } from 'async_hooks';

import { AlsStore } from './als-store.interface';

export class AlsService extends AsyncLocalStorage<AlsStore> {}
