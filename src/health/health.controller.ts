import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

import { NoAuthentication } from '../auth/no-authentication.decorator';

/**
 * @see https://docs.nestjs.com/recipes/terminus
 */
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  @NoAuthentication()
  @Get()
  @HealthCheck()
  check() {
    // const { rss } = process.memoryUsage();
    // console.log('Memory usage', rss / 1024 / 1024, 'MB');

    return this.health.check([
      () => this.db.pingCheck('database', { timeout: 300 }),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024), // 150MB
      // RSS is the Resident Set Size and is used to show how much memory is allocated to that process and is in RAM.
      // It does not include memory that is swapped out. It does include memory from shared libraries as long as the pages from those libraries are actually in memory.
      // It does include all stack and heap memory.
      () => this.memory.checkRSS('memory_rss', 200 * 1024 * 1024), // 200MB
      () =>
        this.disk.checkStorage('storage', {
          thresholdPercent: 0.5, // 250 * 1024 * 1024 * 1024, 250GB
          path: '/',
        }),
    ]);
  }
}
