import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import { Key } from 'aws-cdk-lib/aws-kms';
import { Construct } from 'constructs';

export class KeyConstruct extends Construct {
  public readonly key: Key;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.key = new Key(this, 'Key', {
      removalPolicy: RemovalPolicy.DESTROY,
      pendingWindow: Duration.days(7),
      enableKeyRotation: true,
    });
  }
}
