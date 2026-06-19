---
sidebar_position: 1
---

# Deploy DeepSeek on AWS EKS

This guide walks through connecting your AWS EKS cluster to CaseDesk and deploying a DeepSeek R1 model. By the end, you'll have a private inference endpoint running inside your own AWS account.

## Prerequisites

- An AWS EKS cluster with at least one GPU node group. CaseDesk recommends `g4dn.xlarge` spot instances — a single node handles DeepSeek R1 7B comfortably, and two nodes handle the 14B model.
- `kubectl` configured locally with access to the cluster.
- An AWS IAM user or role with permissions to read cluster metadata and push workloads.

## Step 1 — Create an IAM user for CaseDesk

CaseDesk needs read access to your EKS cluster and permission to deploy workloads into a dedicated namespace. Create an IAM user with the following policy, then generate an access key:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "eks:DescribeCluster",
        "eks:ListClusters"
      ],
      "Resource": "*"
    }
  ]
}
```

CaseDesk uses these credentials only to retrieve the cluster endpoint and CA certificate. It does not need broad AWS permissions — Kubernetes RBAC controls what it can actually do inside the cluster.

## Step 2 — Grant CaseDesk access inside Kubernetes

CaseDesk creates a dedicated namespace for each deployment (e.g. `casedesk-abc123`). You need to create a `ClusterRole` and `ClusterRoleBinding` that allows the CaseDesk service account to manage resources in those namespaces:

```bash
kubectl apply -f - <<EOF
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: casedesk-operator
rules:
  - apiGroups: ["", "apps"]
    resources: ["namespaces", "deployments", "pods", "services", "configmaps", "persistentvolumeclaims"]
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
EOF
```

CaseDesk will prompt you for the `ClusterRoleBinding` target service account during the connect flow.

## Step 3 — Connect your cluster in CaseDesk

1. Go to **Clusters** in the CaseDesk dashboard and click **Connect cluster**.
2. Select **AWS EKS** as the provider.
3. Enter your AWS region (e.g. `eu-west-2`), cluster name, and the IAM access key and secret you created in Step 1.
4. CaseDesk will verify connectivity and display your cluster's node groups. Confirm the GPU node group (`gpu-spot` or similar) is listed.
5. Click **Save cluster**.

## Step 4 — Configure your GPU node group

If your EKS cluster uses a managed node group with spot `g4dn.xlarge` instances, enable the cluster autoscaler so CaseDesk can scale nodes from zero when a deployment is created:

```bash
# Check that the NVIDIA device plugin is running
kubectl get pods -n kube-system | grep nvidia
```

The NVIDIA device plugin must be present for GPU resource requests to be scheduled. If it's missing, install it:

```bash
kubectl apply -f https://raw.githubusercontent.com/NVIDIA/k8s-device-plugin/v0.14.5/nvidia-device-plugin.yml
```

Each `g4dn.xlarge` instance exposes 1 GPU (`nvidia.com/gpu: 1`). CaseDesk's deployment template requests exactly 1 GPU per inference pod.

## Step 5 — Pick a DeepSeek model and deploy

1. In CaseDesk, go to **Models** and search for **DeepSeek**.
2. You'll see two options:
   - **DeepSeek R1 7B** — fits on a single `g4dn.xlarge` (16 GB VRAM). Good for most workloads.
   - **DeepSeek R1 14B** — requires ~28 GB VRAM; runs on a `g4dn.12xlarge` or two `g4dn.xlarge` nodes with tensor parallelism enabled.
3. Select your model and click **Deploy**.
4. Choose the cluster you connected in Step 3.
5. CaseDesk provisions the namespace, pulls the model weights, and starts the inference server. This typically takes 3–8 minutes on first deploy (model weights are ~4–8 GB depending on quantisation).

## Step 6 — Get your endpoint URL

Once the deployment status shows **Running**, click into the deployment to find your endpoint:

```
https://getcasedesk.com/proxy/{deployment-id}/v1
```

This is an OpenAI-compatible endpoint. You can also use the Anthropic-compatible or Gemini-compatible variants — see [Use Your Endpoint](/docs/use-your-endpoint/openai-compatible-api).

## Step 7 — Test with curl

```bash
curl https://getcasedesk.com/proxy/{deployment-id}/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-r1:7b",
    "messages": [
      {"role": "user", "content": "Solve this step by step: if a train travels at 80 km/h for 2.5 hours, how far does it go?"}
    ]
  }'
```

DeepSeek R1 models include chain-of-thought reasoning in their output — you'll see `<think>...</think>` tags wrapping the reasoning steps before the final answer.

## Cost estimate

Running DeepSeek R1 7B on a single `g4dn.xlarge` spot instance in `eu-west-2`:

| Resource | Cost |
|---|---|
| `g4dn.xlarge` spot (on-demand ~$0.526/hr, spot ~$0.16–0.20/hr) | ~$115–145/mo on-demand, ~$35–45/mo spot |
| EKS cluster control plane | ~$73/mo |
| Data transfer (typical inference traffic) | ~$5–10/mo |
| **Estimated total (spot)** | **~$113–128/mo** |

Actual spot pricing varies. Check the [AWS Spot Instance Advisor](https://aws.amazon.com/ec2/spot/instance-advisor/) for current `g4dn.xlarge` rates in your region.

If you scale the node group to zero when not in use (CaseDesk supports idle scale-down), and run inference only during business hours (~8 hrs/day, 5 days/week), costs drop to approximately **$28–55/mo** for the EC2 portion.

## Troubleshooting

**Pod stuck in `Pending`**: Check that the GPU node group has capacity and the cluster autoscaler is running. Run `kubectl describe pod -n casedesk-{deployment-id}` to see scheduling events.

**Model takes >10 minutes to start**: The first start pulls model weights from the registry. Subsequent starts are faster because weights are cached on the node's local disk.

**Out of memory errors**: DeepSeek R1 14B requires more VRAM than a single `g4dn.xlarge` provides. Either switch to the 7B model or select a larger instance type when configuring your node group.
