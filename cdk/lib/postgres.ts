import assert = require('assert');

import { CfnOutput, RemovalPolicy, StackProps } from 'aws-cdk-lib';
import {
  IVpc,
  InstanceClass,
  InstanceSize,
  InstanceType,
  SubnetType,
} from 'aws-cdk-lib/aws-ec2';
import {
  Credentials,
  DatabaseInstance,
  DatabaseInstanceEngine,
  PostgresEngineVersion,
  StorageType,
} from 'aws-cdk-lib/aws-rds';
import {
  SecretRotation,
  SecretRotationApplication,
} from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

interface PostgresProps extends StackProps {
  vpc: IVpc;
}

export class Postgres extends Construct {
  public dbInstance: DatabaseInstance;

  constructor(scope: Construct, id: string, props: PostgresProps) {
    super(scope, id);

    this.dbInstance = new DatabaseInstance(this, 'Instance', {
      engine: DatabaseInstanceEngine.postgres({
        version: PostgresEngineVersion.VER_16,
      }),
      databaseName: 'postgres',

      vpc: props.vpc,
      vpcSubnets: { subnetType: SubnetType.PRIVATE_ISOLATED },

      // Generate the secret with admin username `postgres` and random password
      credentials: Credentials.fromGeneratedSecret('postgres'),

      // 20 GB of General Purpose SSD (gp2) storage per month.
      allocatedStorage: 20,
      storageType: StorageType.GP2,

      // 750 hours of Amazon RDS Single-AZ db.t2.micro, db.t3.micro, and db.t4g.micro Instances usage running MySQL, MariaDB, PostgreSQL databases each month.
      // t4g have up to 40% better price/performance compared to T3 instances
      instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.MICRO),
      multiAz: false,

      // 20 GB of backup storage for your automated database backups and any user-initiated DB snapshots per month.
      deletionProtection: false,
      removalPolicy: RemovalPolicy.DESTROY,

      // AwsSolutions-RDS11
      // The RDS instance or Aurora DB cluster uses the default endpoint port.
      // Port obfuscation (using a non default endpoint port) adds an additional layer of defense against non-targeted attacks (i.e. MySQL/Aurora port 3306, SQL Server port 1433, PostgreSQL port 5432, etc).
      port: 33075,

      // AwsSolutions-RDS2
      // The RDS instance or Aurora DB cluster does not have storage encryption enabled.
      // Storage encryption helps protect data-at-rest by encrypting the underlying storage, automated backups, read replicas, and snapshots for the database.
      storageEncrypted: true,
    });

    assert(this.dbInstance.secret, 'Secret not created');

    // AwsSolutions-SMG4
    // The secret does not have automatic rotation scheduled.
    // AWS Secrets Manager can be configured to automatically rotate the secret for a secured service or database.
    new SecretRotation(this, 'SecretRotation', {
      vpc: props.vpc,
      application: SecretRotationApplication.POSTGRES_ROTATION_SINGLE_USER,
      secret: this.dbInstance.secret,
      target: this.dbInstance,
    });

    new CfnOutput(this, 'SecretName', {
      value: this.dbInstance.secret.secretName,
      description: 'The name of the secret containing the RDS credentials',
    });
  }
}
