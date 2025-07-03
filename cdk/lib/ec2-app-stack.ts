import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class Ec2AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'DevVpc', { maxAzs: 2 });

    const securityGroup = new ec2.SecurityGroup(this, 'FlaskSG', {
      vpc,
      description: 'Allow port 5000',
      allowAllOutbound: true,
    });

    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(5000), 'Allow Flask port');

    const instance = new ec2.Instance(this, 'DevInstance', {
      vpc,
      securityGroup,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux2(),
      keyName: 'your-ec2-keypair-name',
    });

    instance.addUserData(
      'sudo yum update -y',
      'sudo yum install -y python3 pip',
      'pip3 install flask'
    );

    new cdk.CfnOutput(this, 'InstancePublicIp', {
      value: instance.instancePublicIp,
    });
  }
}
