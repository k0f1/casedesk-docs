---
sidebar_position: 1
---

# AWS EKS — I Already Have a Cluster

## What you need before you start

- An AWS IAM user with an access key and secret access key
- The IAM user must have at minimum:
  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": ["eks:DescribeCluster", "eks:ListClusters"],
        "Resource": "*"
      }
    ]
  }
  ```
- The IAM user must be added to your cluster's `aws-auth` ConfigMap
- Your cluster's API endpoint must be publicly accessible

## Recommended: create a scoped IAM user

Rather than using your admin credentials, create a dedicated `casedesk-byoc` user with minimal permissions. See [IAM Scoped Credentials](/security/iam-scoped-credentials).

## Connect the cluster

1. In CaseDesk, go to **Clusters → Connect cluster → AWS EKS**
2. Enter your Access Key ID, Secret Access Key, and region
3. CaseDesk will list your available clusters — select the one to connect
4. Click **Connect cluster →**

If the connection fails with a 401 error, see [401 Unauthorized](/troubleshooting/unauthorized).
