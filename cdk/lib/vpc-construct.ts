import {
  FlowLog,
  FlowLogDestination,
  FlowLogResourceType,
  SubnetType,
  Vpc,
} from 'aws-cdk-lib/aws-ec2';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export class VpcConstruct extends Construct {
  public readonly vpc: Vpc;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.vpc = new Vpc(this, 'Vpc', {
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
