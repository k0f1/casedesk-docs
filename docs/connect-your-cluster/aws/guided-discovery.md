---
sidebar_position: 1
---

# Connect AWS Infrastructure

Use this one-time setup to let CaseDesk discover eligible EKS clusters and GPU
VMs in an AWS account your organisation controls. Your AWS account remains the
runtime payer.

## What happens

1. In CaseDesk, open **Connections** and choose **AWS guided deployment**.
2. Select **Open AWS CloudFormation in a new tab**. Keep the CaseDesk tab open.
3. AWS shows a prefilled CloudFormation template with a unique stack name. Do
   not change its parameters; an earlier failed or deleted attempt cannot block
   a new one.
4. Tick the acknowledgement for the named IAM role, then select **Create stack**.
5. AWS creates the role and tells CaseDesk, server to server, that the stack
   completed. CaseDesk verifies the role before it can read inventory.
6. Return to the CaseDesk tab. Its status changes from **Waiting for AWS
   authorisation** to **AWS account connected**.

CloudFormation controls its own browser experience, so it does not redirect the
browser back to CaseDesk. Opening AWS in a separate tab avoids losing your
CaseDesk progress while the stack is created.

## What you acknowledge

AWS requires an acknowledgement because the stack creates a named IAM role.
The role is scoped for read-only discovery:

- list and describe EKS clusters;
- list and describe EC2 instances and instance types;
- inspect regions and the relevant service quota;
- prove the AWS account identity.

The role does not create or change EKS clusters, EC2 instances, VPCs, GPU
capacity, models, endpoints, or runtime deployments. CaseDesk never asks for
SSH keys, public IPs, raw AWS keys, or browser-visible cloud credentials.

## If the stack fails

Open the failed CloudFormation event and review its **Status reason**. Do not
change the prefilled parameters. Correct the AWS permission or policy issue and
start a fresh guided connection from CaseDesk.

## What happens next

This connection is stored only under your CaseDesk account and is reused for
later reviewed deployment plans. Other CaseDesk accounts cannot see or use it.
Discovery and any future runtime deployment require separate review and approval;
connecting AWS does not start a model or incur runtime charges.
