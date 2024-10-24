import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { AlbEcsConstruct } from './alb-ecs-construct';
import { CertificateConstruct } from './certificate-construct';
import { ClusterConstruct } from './cluster-construct';
import { KeyConstruct } from './key-construct';
import { NotificationConstruct } from './notification-construct';
import { PostgresConstruct } from './postgres-construct';
import { RedisConstruct } from './redis-construct';
import { VpcConstruct } from './vpc-construct';

export class Test3Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const { certificate } = new CertificateConstruct(
      this,
      'CertificationConstruct',
      { domainName: 'api.u-ran.com' },
    );

    const { key } = new KeyConstruct(this, 'KeyConstruct');

    const { topic } = new NotificationConstruct(this, 'NotificationConstruct', {
      key,
      email: 'test3@u-ran.com',
    });

    const { vpc } = new VpcConstruct(this, 'VpcConstruct');

    const { databaseInstance } = new PostgresConstruct(
      this,
      'PostgresConstruct',
      {
        vpc,
      },
    );

    const { cfnCacheCluster } = new RedisConstruct(this, 'RedisConstruct', {
      vpc,
    });

    const { cluster } = new ClusterConstruct(this, 'ClusterConstruct', {
      vpc,
      key,
      topic,
    });

    const { ecs } = new AlbEcsConstruct(this, 'AlbEcsConstruct', {
      cluster,
      certificate,
      cfnCacheCluster,
      databaseInstance,
    });

    databaseInstance.connections.allowDefaultPortFrom(ecs.service);
  }
}
