import { StackProps } from 'aws-cdk-lib';
import {
  Certificate,
  CertificateValidation,
} from 'aws-cdk-lib/aws-certificatemanager';
import { Construct } from 'constructs';

interface CertificateConstructProps extends StackProps {
  domainName: string;
}

export class CertificateConstruct extends Construct {
  public readonly certificate: Certificate;

  constructor(scope: Construct, id: string, props: CertificateConstructProps) {
    super(scope, id);

    this.certificate = new Certificate(this, 'Certificate', {
      domainName: props.domainName,
      validation: CertificateValidation.fromDns(),
    });
  }
}
