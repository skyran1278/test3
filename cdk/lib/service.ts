import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';

interface ServiceProps extends cdk.StackProps {
  vpc: ec2.IVpc;
}

export class Service extends Construct {
  constructor(scope: Construct, id: string, props: ServiceProps) {
    super(scope, id);

    const cluster = new ecs.Cluster(this, 'Cluster', {
      vpc: props.vpc,
    });

    const service = new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      'Service',
      {
        cluster,
        memoryLimitMiB: 512,
        cpu: 256,
        taskImageOptions: {
          image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
          //   image: ecs.ContainerImage.fromAsset('./path/to/image'),
        },
      },
    );

    service.targetGroup.configureHealthCheck({
      path: '/',
    });
  }
}
