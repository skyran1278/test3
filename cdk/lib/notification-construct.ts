import { StackProps } from 'aws-cdk-lib';
import { Key } from 'aws-cdk-lib/aws-kms';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { EmailSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';

interface NotificationConstructProps extends StackProps {
  key: Key;
}

export class NotificationConstruct extends Construct {
  public readonly topic: Topic;

  constructor(scope: Construct, id: string, props: NotificationConstructProps) {
    super(scope, id);

    this.topic = new Topic(this, 'Topic', {
      masterKey: props.key,
    });

    this.topic.addSubscription(new EmailSubscription('test3@u-ran.com'));
  }
}
