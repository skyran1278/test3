import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { Postgres } from './postgres';
import { Redis } from './redis';
import { Service } from './service';
import { Vpc } from './vpc';

export class Test3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'Vpc').vpc;

    const postgres = new Postgres(this, 'Postgres', { vpc });
    const redis = new Redis(this, 'Redis', { vpc });

    new Service(this, 'Service', {
      vpc,
      dbInstance: postgres.dbInstance,
      redisEndpoint: redis.redisEndpoint,
    });
  }
}
