import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

import { Postgres } from './postgres';

export class Test3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'Test3Vpc', {
      maxAzs: 2, // Default is all AZs in the region
    });

    new Postgres(this, 'Postgres', { vpc });
  }
}
