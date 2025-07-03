#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Ec2AppStack } from '../lib/ec2-app-stack';

const app = new cdk.App();
new Ec2AppStack(app, 'DevEc2Stack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }
});
