import * as ec2 from 'aws-cdk-lib/aws-ec2';
import {
  FlowLog,
  FlowLogDestination,
  FlowLogResourceType,
  IVpc,
  SubnetType,
} from 'aws-cdk-lib/aws-ec2';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

// interface VpcProps extends cdk.StackProps {}

export class Vpc extends Construct {
  public readonly vpc: IVpc;

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
          subnetType: SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: 'Isolated',
          subnetType: SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

    // Create a CloudWatch Log Group for Flow Logs
    const logGroup = new LogGroup(this, 'LogGroup', {
      retention: RetentionDays.ONE_WEEK,
    });

    // Create a Flow Log for the VPC
    new FlowLog(this, 'FlowLog', {
      resourceType: FlowLogResourceType.fromVpc(this.vpc),
      destination: FlowLogDestination.toCloudWatchLogs(logGroup),
    });
  }
}
