import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

// interface VpcProps extends cdk.StackProps {}

export class Vpc extends Construct {
  public readonly vpc: ec2.IVpc;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.vpc = new ec2.Vpc(this, 'Test3Vpc', {
      // Disable NAT gateways, free tier does not include them
      natGateways: 0,

      maxAzs: 2,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'Public',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: 'Isolated',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

    // Create a CloudWatch Log Group for Flow Logs
    const logGroup = new LogGroup(this, 'LogGroup', {
      retention: RetentionDays.ONE_WEEK,
    });

    // Create a Flow Log for the VPC
    new ec2.FlowLog(this, 'FlowLog', {
      resourceType: ec2.FlowLogResourceType.fromVpc(this.vpc),
      destination: ec2.FlowLogDestination.toCloudWatchLogs(logGroup),
    });
  }
}
