import { StackProps } from 'aws-cdk-lib';
import { BlockDeviceVolume } from 'aws-cdk-lib/aws-autoscaling';
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  SubnetType,
  Vpc,
} from 'aws-cdk-lib/aws-ec2';
import {
  AmiHardwareType,
  Cluster,
  EcsOptimizedImage,
} from 'aws-cdk-lib/aws-ecs';
import { Key } from 'aws-cdk-lib/aws-kms';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';

interface ClusterConstructProps extends StackProps {
  vpc: Vpc;
  key: Key;
  topic: Topic;
}

export class ClusterConstruct extends Construct {
  public readonly cluster: Cluster;

  constructor(scope: Construct, id: string, props: ClusterConstructProps) {
    super(scope, id);

    this.cluster = new Cluster(this, 'Cluster', {
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

        // https://stackoverflow.com/questions/36523282/aws-ecs-error-when-running-task-no-container-instances-were-found-in-your-clust
        // https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_container_instance.html
        // Container instances need access to communicate with the Amazon ECS service endpoint.
        // This can be through an interface VPC endpoint or through your container instances having public IP addresses.
        // For more information about interface VPC endpoints, see Amazon ECS interface VPC endpoints (AWS PrivateLink)
        // If you do not have an interface VPC endpoint configured and your container instances do not have public IP addresses, then they must use network address translation (NAT) to provide this access.
        // For more information, see NAT gateways in the Amazon VPC User Guide and Using an HTTP proxy for Amazon ECS Linux container instances in this guide.
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
        topicEncryptionKey: props.key,

        // AwsSolutions-AS3
        // The Auto Scaling Group does not have notifications configured for all scaling events.
        // Notifications on EC2 instance launch, launch error, termination, and termination errors allow operators to gain better insights into systems attributes such as activity and health.
        notifications: [{ topic: props.topic }],
      },
    });

    if (this.cluster.autoscalingGroup) {
      NagSuppressions.addResourceSuppressions(
        this.cluster.autoscalingGroup,
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
          {
            id: 'AwsSolutions-IAM4',
            reason: `
              I have no idea how to configure this in cluster.autoscalingGroup.

              The IAM user, role, or group uses AWS managed policies.
              An AWS managed policy is a standalone policy that is created and administered by AWS. Currently, many AWS managed policies do not restrict resource scope.
              Replace AWS managed policies with system specific (customer) managed policies.
              This is a granular rule that returns individual findings that can be suppressed with 'appliesTo'.
              The findings are in the format 'Policy::<policy>' for AWS managed policies.
              Example: appliesTo: ['Policy::arn:<AWS::Partition>:iam::aws:policy/foo'].
            `,
          },
          {
            id: 'AwsSolutions-IAM5',
            reason: `
              I have no idea how to configure this in cluster.autoscalingGroup.

              [Resource::*]:
              [Resource::arn:aws:autoscaling:ap-northeast-1:637423394100:autoScalingGroup:*:autoScalingGroupName/<ServiceClusterDefaultAutoScalingGroupASGDB6A872C>]:
              [Action::ecs:Submit*]:

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
