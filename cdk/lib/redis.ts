import { CfnOutput, StackProps } from 'aws-cdk-lib';
import { IVpc, Peer, Port, SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import {
  CfnCacheCluster,
  CfnParameterGroup,
  CfnSubnetGroup,
} from 'aws-cdk-lib/aws-elasticache';
import { Construct } from 'constructs';

interface RedisProps extends StackProps {
  vpc: IVpc;
}

export class Redis extends Construct {
  public readonly cluster: CfnCacheCluster;
  public readonly securityGroup: SecurityGroup;

  constructor(scope: Construct, id: string, props: RedisProps) {
    super(scope, id);

    // Create a security group for the Redis cluster
    this.securityGroup = new SecurityGroup(this, 'SecurityGroup', {
      vpc: props.vpc,
      description: 'Allow Redis access',
      allowAllOutbound: true,
    });

    // Allow inbound traffic on port 6379 (default Redis port)
    this.securityGroup.addIngressRule(
      Peer.anyIpv4(),
      Port.tcp(7982),
      'Allow Redis inbound',
    );

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

    this.cluster = new CfnCacheCluster(this, 'Cluster', {
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
    this.cluster.addDependency(subnetGroup);

    // Output the Redis endpoint
    new CfnOutput(this, 'Endpoint', {
      value: this.cluster.attrRedisEndpointAddress,
    });
  }
}
