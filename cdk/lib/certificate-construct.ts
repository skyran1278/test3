import {
  Certificate,
  CertificateValidation,
} from 'aws-cdk-lib/aws-certificatemanager';
import { Construct } from 'constructs';

export class CertificateConstruct extends Construct {
  public readonly certificate: Certificate;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.certificate = new Certificate(this, 'Certificate', {
      domainName: 'x.u-ran.com',
      validation: CertificateValidation.fromDns(),
    });
  }
}
