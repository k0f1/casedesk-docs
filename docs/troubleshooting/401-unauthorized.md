---
sidebar_position: 1
---

# 401 Unauthorized

This error appears when connecting an AWS EKS cluster and means the Kubernetes API rejected the authentication token.

## Checklist

1. **Verify your credentials are valid**
   ```bash
   aws sts get-caller-identity --profile casedesk-byoc
   ```
   If this fails, your access key or secret is incorrect.

2. **Verify the IAM user is in the aws-auth ConfigMap**
   ```bash
   kubectl get configmap aws-auth -n kube-system -o yaml
   ```
   Look for your IAM user ARN in the `mapUsers` section. If missing, add it:
   ```bash
   eksctl create iamidentitymapping \
     --cluster <cluster-name> \
     --region <region> \
     --arn arn:aws:iam::<account-id>:user/casedesk-byoc \
     --username casedesk-byoc \
     --group system:masters
   ```

3. **Verify the cluster API endpoint is publicly accessible**
   Your cluster must have a public endpoint enabled. Private-only endpoints cannot be reached by CaseDesk.
