import { join } from 'path';

import * as cdk from 'aws-cdk-lib';
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';
import {
  Certificate,
  CertificateValidation,
} from 'aws-cdk-lib/aws-certificatemanager';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { AmiHardwareType } from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import { CfnCacheCluster } from 'aws-cdk-lib/aws-elasticache';
import { ApplicationProtocol } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { DatabaseInstance } from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';

interface ServiceProps extends cdk.StackProps {
  vpc: ec2.IVpc;
  dbInstance: DatabaseInstance;
  redisCluster: CfnCacheCluster;
}

export class Service extends Construct {
  constructor(scope: Construct, id: string, props: ServiceProps) {
    super(scope, id);

    const cluster = new ecs.Cluster(this, 'Cluster', {
      vpc: props.vpc,

      // AwsSolutions-ECS4
      containerInsights: true,

      capacity: {
        instanceType: ec2.InstanceType.of(
          ec2.InstanceClass.T4G,
          ec2.InstanceSize.SMALL,
        ),
        machineImage: ecs.EcsOptimizedImage.amazonLinux2023(
          AmiHardwareType.ARM,
        ),
        blockDevices: [
          {
            deviceName: '/dev/sdf',
            // 30 GB of storage, 2 million I/Os, and 1 GB of snapshot storage with Amazon Elastic Block Store (EBS).
            volume: autoscaling.BlockDeviceVolume.ebs(30, {
              encrypted: true,
            }),
          },
        ],
        vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
        associatePublicIpAddress: true,
      },
    });

    const certificate = new Certificate(this, 'Certificate', {
      domainName: 'test3.u-ran.com',
      validation: CertificateValidation.fromDns(),
    });

    const secret = props.dbInstance.secret;
    if (secret === undefined) {
      throw new Error('props.dbInstance.secret is undefined');
    }

    const ecsService = new ecsPatterns.ApplicationLoadBalancedEc2Service(
      this,
      'Ecs',
      {
        cluster,
        memoryLimitMiB: 512,
        certificate,
        protocol: ApplicationProtocol.HTTPS,
        // cpu: 256,
        taskImageOptions: {
          image: ecs.ContainerImage.fromAsset(join(__dirname, '..', '..')),
          environment: {
            NODE_ENV: 'development',
            PORT: '80',
            NEST_DEBUG: '',
            DB_HOST: props.dbInstance.dbInstanceEndpointAddress,
            DB_PORT: '5432',
            DB_USERNAME: 'postgres',
            DB_NAME: 'postgres',
            DB_SCHEMA: 'public',
            DB_LOGGING: 'true',
            DB_SSL: 'true',
            DB_MIGRATIONS_RUN: 'true',
            REDIS_HOST: props.redisCluster.attrRedisEndpointAddress,
            REDIS_PORT: '6379',
            GRAPHQL_SERVER: 'development',
            JWT_SECRET: '001',
            JWT_EXPIRES_IN: '100d',
            GITHUB_TOKEN: '',
            TEST_TOKEN: '',
          },
          secrets: {
            DB_PASSWORD: ecs.Secret.fromSecretsManager(secret, 'password'),
          },
        },
      },
    );

    props.dbInstance.connections.allowDefaultPortFrom(ecsService.service);

    // AwsSolutions-ELB2
    // const logBucket = new s3.Bucket(this, 'Bucket', {
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    // });
    // ecsService.loadBalancer.logAccessLogs(logBucket);

    // ecsService.service.connections.all(
    //   props.dbInstance,
    //   ec2.Port.tcp(5432),
    // );
    // ecsService.service.connections.allowTo(
    //   ec2.Peer.ipv4(props.redisEndpoint),
    //   ec2.Port.tcp(6379),
    // );

    // // AwsSolutions-ELB2
    // // Create an S3 bucket for ALB access logs
    // const accessLogBucket = new s3.Bucket(this, 'Bucket', {
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    //   autoDeleteObjects: true,
    //   blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    // });

    // accessLogBucket.addToResourcePolicy(
    //   new iam.PolicyStatement({
    //     effect: iam.Effect.DENY,
    //     actions: ['s3:*'],
    //     resources: [
    //       accessLogBucket.bucketArn,
    //       `${accessLogBucket.bucketArn}/*`,
    //     ],
    //     conditions: {
    //       Bool: {
    //         'aws:SecureTransport': 'false',
    //       },
    //     },
    //     principals: [new iam.AnyPrincipal()],
    //   }),
    // );

    // const loadBalancer = service.loadBalancer;
    // loadBalancer.logAccessLogs(accessLogBucket, 'alb-access-logs/');
  }
}
