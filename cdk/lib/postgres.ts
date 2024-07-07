import * as cdk from 'aws-cdk-lib';
import { CfnOutput, RemovalPolicy } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';

interface PostgresProps extends cdk.StackProps {
  vpc: ec2.IVpc;
}

export class Postgres extends Construct {
  constructor(scope: Construct, id: string, props: PostgresProps) {
    super(scope, id);

    // Create a security group for the database
    const securityGroup = new ec2.SecurityGroup(this, 'SecurityGroup', {
      vpc: props.vpc,
      description: 'Allow postgres outbound',
      allowAllOutbound: true,
    });
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(5432),
      'Allow postgres inbound',
    );

    const dbInstance = new rds.DatabaseInstance(this, 'Instance', {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_16,
      }),
      databaseName: 'postgres',

      // Ensure it is publicly accessible
      vpc: props.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      securityGroups: [securityGroup],
      publiclyAccessible: true,

      // Generate the secret with admin username `postgres` and random password
      credentials: rds.Credentials.fromGeneratedSecret('postgres'),

      // 20 GB of General Purpose SSD (gp2) storage per month.
      allocatedStorage: 20,
      storageType: rds.StorageType.GP2,

      // 750 hours of Amazon RDS Single-AZ db.t2.micro, db.t3.micro, and db.t4g.micro Instances usage running MySQL, MariaDB, PostgreSQL databases each month.
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T4G,
        ec2.InstanceSize.MICRO,
      ),
      multiAz: false,

      // 20 GB of backup storage for your automated database backups and any user-initiated DB snapshots per month.
      deletionProtection: false,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // Output the name of the secret
    new CfnOutput(this, 'SecretName', {
      value: dbInstance.secret?.secretName || 'No secret created',
      description: 'The name of the secret containing the RDS credentials',
    });
  }
}
