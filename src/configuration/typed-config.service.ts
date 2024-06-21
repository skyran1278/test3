import { Injectable } from '@nestjs/common';
import { ConfigService, Path, PathValue } from '@nestjs/config';

import { EnvironmentVariables } from './environment-variables';

@Injectable()
export class TypedConfigService {
  constructor(private configService: ConfigService<EnvironmentVariables, true>) {}

  get<P extends Path<EnvironmentVariables>>(propertyPath: P): PathValue<EnvironmentVariables, P> {
    return this.configService.get(propertyPath, { infer: true });
  }
}
