---
sidebar_position: 1
---

# IAM Scoped Credentials

We strongly recommend creating a dedicated IAM user for CaseDesk with minimal permissions rather than using your admin credentials.

## Why

- If the credentials are ever exposed, the blast radius is limited to EKS read access only
- Your admin credentials stay out of third-party systems entirely

## Step 1: Create the IAM user

```bash
aws iam create-user --user-name casedesk-byoc --profile admin
```

## Step 2: Create and attach the minimal policy

```bash
cat > /tmp/casedesk-byoc-policy.json << 'EOF'
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
EOF

aws iam create-policy \
  --policy-name casedesk-byoc-policy \
  --policy-document file:///tmp/casedesk-byoc-policy.json \
  --profile admin
```

Copy the ARN from the output, then attach it:

```bash
aws iam attach-user-policy \
  --user-name casedesk-byoc \
  --policy-arn <arn-from-above> \
  --profile admin
```

## Step 3: Generate an access key

```bash
aws iam create-access-key \
  --user-name casedesk-byoc \
  --profile admin
```

Save the `AccessKeyId` and `SecretAccessKey` — this is the only time AWS shows the secret.

## Step 4: Add to the EKS aws-auth ConfigMap

```bash
eksctl create iamidentitymapping \
  --cluster <cluster-name> \
  --region <region> \
  --arn arn:aws:iam::<account-id>:user/casedesk-byoc \
  --username casedesk-byoc \
  --group system:masters \
  --profile admin
```

## Step 5: Verify

```bash
aws configure --profile casedesk-byoc
aws eks list-clusters --region <region> --profile casedesk-byoc
```

If your cluster appears, you're ready to connect in CaseDesk.
