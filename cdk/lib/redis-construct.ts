import { CfnOutput, StackProps } from 'aws-cdk-lib';
import { IVpc, Peer, Port, SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import {
  CfnCacheCluster,
  CfnParameterGroup,
  CfnSubnetGroup,
} from 'aws-cdk-lib/aws-elasticache';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';

interface RedisConstructProps extends StackProps {
  vpc: IVpc;
}

export class RedisConstruct extends Construct {
  public readonly cfnCacheCluster: CfnCacheCluster;
  public readonly securityGroup: SecurityGroup;

  constructor(scope: Construct, id: string, props: RedisConstructProps) {
    super(scope, id);

    // Create a security group for the Redis cluster
    this.securityGroup = new SecurityGroup(this, 'SecurityGroup', {
      vpc: props.vpc,
      description: 'Allow Redis access',
      allowAllOutbound: true,
    });

    this.securityGroup.addIngressRule(
      Peer.anyIpv4(),
      Port.tcp(7982),
      'Allow Redis inbound',
    );

    NagSuppressions.addResourceSuppressions(this.securityGroup, [
      {
        id: 'AwsSolutions-EC23',
        reason: `
          I have no idea how to configure this el.

          The Security Group allows for 0.0.0.0/0 or ::/0 inbound access.
          Large port ranges, when open, expose instances to unwanted attacks.
          More than that, they make traceability of vulnerabilities very difficult.
          For instance, your web servers may only require 80 and 443 ports to be open, but not all.
          One of the most common mistakes observed is when  all ports for 0.0.0.0/0 range are open in a rush to access the instance.
          EC2 instances must expose only to those ports enabled on the corresponding security group level.
        `,
      },
    ]);

    const parameterGroup = new CfnParameterGroup(this, 'ParameterGroup', {
      cacheParameterGroupFamily: 'redis7',
      description: 'Custom parameter group for Redis with noeviction policy',
      properties: {
        'maxmemory-policy': 'noeviction',
      },
    });

    // Create the Redis subnet group
    const subnetGroup = new CfnSubnetGroup(this, 'SubnetGroup', {
      description: 'Subnet group for Redis cluster',
      subnetIds: props.vpc.isolatedSubnets.map((subnet) => subnet.subnetId),
    });

    this.cfnCacheCluster = new CfnCacheCluster(this, 'Cluster', {
      // https://aws.amazon.com/tw/elasticache/pricing/
      // 750 hours of ElastiCache cache.t2.micro or cache.t3.micro node usage for free for up to 12 months.
      cacheNodeType: 'cache.t3.micro',
      engine: 'redis',
      numCacheNodes: 1,
      vpcSecurityGroupIds: [this.securityGroup.securityGroupId],
      cacheSubnetGroupName: subnetGroup.ref,
      cacheParameterGroupName: parameterGroup.ref,

      // AwsSolutions-AEC5
      // The ElastiCache cluster uses the default endpoint port.
      // Port obfuscation (using a non default endpoint port) adds an additional layer of defense against non-targeted attacks (i.e. Redis port 6379 and Memcached port 11211).
      port: 7982,
    });

    // Establishes the dependency between cache and subnetGroup, so that they can be deleted in the right order
    this.cfnCacheCluster.addDependency(subnetGroup);

    // Output the Redis endpoint
    new CfnOutput(this, 'Endpoint', {
      value: this.cfnCacheCluster.attrRedisEndpointAddress,
    });
  }
}
