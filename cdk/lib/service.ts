import { join } from 'path';

import { RemovalPolicy, StackProps } from 'aws-cdk-lib';
import { BlockDeviceVolume } from 'aws-cdk-lib/aws-autoscaling';
import {
  Certificate,
  CertificateValidation,
} from 'aws-cdk-lib/aws-certificatemanager';
import {
  IVpc,
  InstanceClass,
  InstanceSize,
  InstanceType,
  SubnetType,
} from 'aws-cdk-lib/aws-ec2';
import { Platform } from 'aws-cdk-lib/aws-ecr-assets';
import {
  AmiHardwareType,
  Cluster,
  ContainerImage,
  EcsOptimizedImage,
  Secret,
} from 'aws-cdk-lib/aws-ecs';
import { ApplicationLoadBalancedEc2Service } from 'aws-cdk-lib/aws-ecs-patterns';
import { ApplicationProtocol } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Key } from 'aws-cdk-lib/aws-kms';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { EmailSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';

import { Postgres } from './postgres';
import { Redis } from './redis';

interface ServiceProps extends StackProps {
  vpc: IVpc;
  postgres: Postgres;
  redis: Redis;
}

export class Service extends Construct {
  constructor(scope: Construct, id: string, props: ServiceProps) {
    super(scope, id);

    const key = new Key(this, 'Key', {
      enableKeyRotation: true,
    });

    const topic = new Topic(this, 'Topic', {
      masterKey: key,
    });
    topic.addSubscription(new EmailSubscription('test3@u-ran.com'));

    const cluster = new Cluster(this, 'Cluster', {
      vpc: props.vpc,

      // AwsSolutions-ECS4
      containerInsights: true,

      capacity: {
        instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.SMALL),
        machineImage: EcsOptimizedImage.amazonLinux2023(AmiHardwareType.ARM),
        blockDevices: [
          {
            deviceName: '/dev/sdf',
            // 30 GB of storage, 2 million I/Os, and 1 GB of snapshot storage with Amazon Elastic Block Store (EBS).
            volume: BlockDeviceVolume.ebs(30, {
              encrypted: true,
            }),
          },
        ],
        vpcSubnets: { subnetType: SubnetType.PUBLIC },
        associatePublicIpAddress: true,

        // AwsSolutions-SNS2
        // The SNS Topic does not have server-side encryption enabled.
        // Server side encryption adds additional protection of sensitive data delivered as messages to subscribers.
        //
        // AwsSolutions-SNS3
        // The SNS Topic does not require publishers to use SSL.
        // Without HTTPS (TLS), a network-based attacker can eavesdrop on network traffic or manipulate it, using an attack such as man-in-the-middle.
        // Allow only encrypted connections over HTTPS (TLS) using the aws:SecureTransport condition and the 'sns: Publish' action in the topic policy to force publishers to use SSL.
        // If SSE is already enabled then this control is auto enforced.
        topicEncryptionKey: key,

        // AwsSolutions-AS3
        // The Auto Scaling Group does not have notifications configured for all scaling events.
        // Notifications on EC2 instance launch, launch error, termination, and termination errors allow operators to gain better insights into systems attributes such as activity and health.
        notifications: [{ topic }],
      },
    });

    if (cluster.autoscalingGroup) {
      NagSuppressions.addResourceSuppressions(
        cluster.autoscalingGroup,
        [
          {
            id: 'AwsSolutions-L1',
            reason: `
              I have no idea how to configure this in cluster.autoscalingGroup.

              The non-container Lambda function is not configured to use the latest runtime version.
              Use the latest available runtime for the targeted language to avoid technical debt.
              Runtimes specific to a language or framework version are deprecated when the version reaches end of life.
              This rule only applies to non-container Lambda functions.
            `,
          },
        ],
        true,
      );
    }

    const certificate = new Certificate(this, 'Certificate', {
      domainName: 'x.u-ran.com',
      validation: CertificateValidation.fromDns(),
    });

    const secret = props.postgres.dbInstance.secret;
    if (secret === undefined) {
      throw new Error('props.dbInstance.secret is undefined');
    }

    const ecsService = new ApplicationLoadBalancedEc2Service(this, 'Ecs', {
      cluster,
      memoryLimitMiB: 512,
      certificate,
      protocol: ApplicationProtocol.HTTPS,
      taskImageOptions: {
        image: ContainerImage.fromAsset(join(__dirname, '..', '..'), {
          platform: Platform.LINUX_ARM64,
        }),
        environment: {
          NODE_ENV: 'production',
          PORT: '80',
          NEST_DEBUG: '',
          DB_SCHEMA: 'public',
          DB_LOGGING: 'true',
          DB_SSL: 'true',
          DB_MIGRATIONS_RUN: 'true',
          REDIS_HOST: props.redis.cluster.attrRedisEndpointAddress,
          REDIS_PORT: props.redis.cluster.attrRedisEndpointPort,
          GRAPHQL_SERVER: 'development',
          GITHUB_TOKEN: '',
          TEST_TOKEN: '',
        },
        secrets: {
          DB_PASSWORD: Secret.fromSecretsManager(secret, 'password'),
          DB_NAME: Secret.fromSecretsManager(secret, 'dbname'),
          DB_PORT: Secret.fromSecretsManager(secret, 'port'),
          DB_HOST: Secret.fromSecretsManager(secret, 'host'),
          DB_USERNAME: Secret.fromSecretsManager(secret, 'username'),
          JWT_SECRET: Secret.fromSsmParameter(
            StringParameter.fromSecureStringParameterAttributes(
              this,
              'JWT_SECRET',
              {
                parameterName: '/test3/JWT_SECRET',
              },
            ),
          ),
          JWT_EXPIRES_IN: Secret.fromSsmParameter(
            StringParameter.fromSecureStringParameterAttributes(
              this,
              'JWT_EXPIRES_IN',
              {
                parameterName: '/test3/JWT_EXPIRES_IN',
              },
            ),
          ),
        },
      },
    });

    NagSuppressions.addResourceSuppressions(ecsService.service.taskDefinition, [
      {
        id: 'AwsSolutions-ECS2',
        reason: `
          Because of \`REDIS_HOST\`, we need to allow using environment variables.

          The ECS Task Definition includes a container definition that directly specifies environment variables.
          Use secrets to inject environment variables during container startup from AWS Systems Manager Parameter Store or Secrets Manager instead of directly specifying plaintext environment variables.
          Updates to direct environment variables require operators to change task definitions and perform new deployments.
        `,
      },
    ]);

    props.postgres.dbInstance.connections.allowDefaultPortFrom(
      ecsService.service,
    );

    // AwsSolutions-ELB2
    // The ELB does not have access logs enabled.
    // Access logs allow operators to to analyze traffic patterns and identify and troubleshoot security issues.
    const logBucket = new Bucket(this, 'LogBucket', {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      enforceSSL: true,
    });
    ecsService.loadBalancer.logAccessLogs(logBucket);

    // AwsSolutions-S1
    // The S3 Bucket has server access logs disabled.
    // The bucket should have server access logging enabled to provide detailed records for the requests that are made to the bucket.
    new Bucket(this, 'MainBucket', {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      enforceSSL: true,
      serverAccessLogsBucket: logBucket,
    });
  }
}
