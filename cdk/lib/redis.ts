import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as elasticache from 'aws-cdk-lib/aws-elasticache';
import { Construct } from 'constructs';

interface RedisProps extends cdk.StackProps {
  vpc: ec2.IVpc;
}

export class Redis extends Construct {
  constructor(scope: Construct, id: string, props: RedisProps) {
    super(scope, id);

    // Create a security group for the Redis cluster
    const securityGroup = new ec2.SecurityGroup(this, 'SecurityGroup', {
      vpc: props.vpc,
      description: 'Allow redis outbound',
      allowAllOutbound: true,
    });

    // Allow inbound traffic on port 6379 (default Redis port)
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(6379),
      'Allow redis inbound',
    );

    // Create the Redis subnet group
    const subnetGroup = new elasticache.CfnSubnetGroup(this, 'SubnetGroup', {
      description: 'Subnet group for Redis cluster',
      subnetIds: props.vpc.privateSubnets.map((subnet) => subnet.subnetId),
    });

    // Create the Redis cluster
    const redisCluster = new elasticache.CfnCacheCluster(this, 'Cluster', {
      cacheNodeType: 'cache.t3.micro', // Free tier eligible instance type
      engine: 'redis',
      numCacheNodes: 1,
      vpcSecurityGroupIds: [securityGroup.securityGroupId],
      cacheSubnetGroupName: subnetGroup.ref,
    });

    // Establishes the dependency between cache and subnetGroup,
    // so that they can be deleted in the right order
    redisCluster.addDependency(subnetGroup);

    // Output the Redis endpoint
    new cdk.CfnOutput(this, 'Endpoint', {
      value: redisCluster.attrRedisEndpointAddress,
    });
  }
}
