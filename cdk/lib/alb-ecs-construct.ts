import { join } from 'path';

import { RemovalPolicy, StackProps } from 'aws-cdk-lib';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { Platform } from 'aws-cdk-lib/aws-ecr-assets';
import { Cluster, ContainerImage, Secret } from 'aws-cdk-lib/aws-ecs';
import { ApplicationLoadBalancedEc2Service } from 'aws-cdk-lib/aws-ecs-patterns';
import { CfnCacheCluster } from 'aws-cdk-lib/aws-elasticache';
import { ApplicationProtocol } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { DatabaseInstance } from 'aws-cdk-lib/aws-rds';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';

interface AlbEcsConstructProps extends StackProps {
  databaseInstance: DatabaseInstance;
  cfnCacheCluster: CfnCacheCluster;
  cluster: Cluster;
  certificate: Certificate;
}

export class AlbEcsConstruct extends Construct {
  public readonly ecs: ApplicationLoadBalancedEc2Service;

  constructor(scope: Construct, id: string, props: AlbEcsConstructProps) {
    super(scope, id);

    const secret = props.databaseInstance.secret;
    if (secret == null) {
      throw new Error('props.dbInstance.secret is undefined');
    }

    this.ecs = new ApplicationLoadBalancedEc2Service(this, 'Ecs', {
      cluster: props.cluster,
      memoryLimitMiB: 512,
      certificate: props.certificate,
      protocol: ApplicationProtocol.HTTPS,
      enableExecuteCommand: true,
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
          REDIS_HOST: props.cfnCacheCluster.attrRedisEndpointAddress,
          REDIS_PORT: props.cfnCacheCluster.attrRedisEndpointPort,
          GRAPHQL_SERVER: 'development',
          GITHUB_TOKEN: '',
          TEST_TOKEN: '',
          CORS_ORIGIN: 'https://preflight-request.apollographql.com',
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
          BULL_BOARD_USERNAME: Secret.fromSsmParameter(
            StringParameter.fromSecureStringParameterAttributes(
              this,
              'BULL_BOARD_USERNAME',
              {
                parameterName: '/test3/BULL_BOARD_USERNAME',
              },
            ),
          ),
          BULL_BOARD_PASSWORD: Secret.fromSsmParameter(
            StringParameter.fromSecureStringParameterAttributes(
              this,
              'BULL_BOARD_PASSWORD',
              {
                parameterName: '/test3/BULL_BOARD_PASSWORD',
              },
            ),
          ),
        },
      },
    });

    this.ecs.targetGroup.configureHealthCheck({
      path: '/health',
    });

    // AwsSolutions-ELB2
    // The ELB does not have access logs enabled.
    // Access logs allow operators to to analyze traffic patterns and identify and troubleshoot security issues.
    const logBucket = new Bucket(this, 'LogBucket', {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      enforceSSL: true,
    });
    this.ecs.loadBalancer.logAccessLogs(logBucket);

    // AwsSolutions-S1
    // The S3 Bucket has server access logs disabled.
    // The bucket should have server access logging enabled to provide detailed records for the requests that are made to the bucket.
    new Bucket(this, 'MainBucket', {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      enforceSSL: true,
      serverAccessLogsBucket: logBucket,
    });

    NagSuppressions.addResourceSuppressions(
      this.ecs.loadBalancer,
      [
        {
          id: 'AwsSolutions-EC23',
          reason: `
            I have no idea how to configure this.

            The Security Group allows for 0.0.0.0/0 or ::/0 inbound access.
            Large port ranges, when open, expose instances to unwanted attacks.
            More than that, they make traceability of vulnerabilities very difficult.
            For instance, your web servers may only require 80 and 443 ports to be open, but not all.
            One of the most common mistakes observed is when  all ports for 0.0.0.0/0 range are open in a rush to access the instance.
            EC2 instances must expose only to those ports enabled on the corresponding security group level.
          `,
        },
      ],
      true,
    );

    NagSuppressions.addResourceSuppressions(this.ecs.service.taskDefinition, [
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

    NagSuppressions.addResourceSuppressions(
      this.ecs.service.taskDefinition.taskRole,
      [
        {
          id: 'AwsSolutions-IAM5',
          reason: `
            I have no idea how to configure this.
            relative to enableExecuteCommand: true, for using migrate command.

            [Resource::*]

            The IAM entity contains wildcard permissions and does not have a cdk-nag rule suppression with evidence for those permission.
            Metadata explaining the evidence (e.g. via supporting links) for wildcard permissions allows for transparency to operators.
            This is a granular rule that returns individual findings that can be suppressed with 'appliesTo'.
            The findings are in the format 'Action::<action>' for policy actions and 'Resource::<resource>' for resources.
            Example: appliesTo: ['Action::s3:*'].
          `,
        },
      ],
      true,
    );

    if (this.ecs.service.taskDefinition.executionRole) {
      NagSuppressions.addResourceSuppressions(
        this.ecs.service.taskDefinition.executionRole,
        [
          {
            id: 'AwsSolutions-IAM5',
            reason: `
              I have no idea how to configure this.

              [Resource::*]

              The IAM entity contains wildcard permissions and does not have a cdk-nag rule suppression with evidence for those permission.
              Metadata explaining the evidence (e.g. via supporting links) for wildcard permissions allows for transparency to operators.
              This is a granular rule that returns individual findings that can be suppressed with 'appliesTo'.
              The findings are in the format 'Action::<action>' for policy actions and 'Resource::<resource>' for resources.
              Example: appliesTo: ['Action::s3:*'].
            `,
          },
        ],
        true,
      );
    }
  }
}
