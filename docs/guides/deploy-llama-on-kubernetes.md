---
sidebar_position: 2
---

# Deploy Llama on Kubernetes

This guide covers deploying Meta's Llama models on your own Kubernetes cluster using CaseDesk. It applies to both **AWS EKS** and **Azure AKS** — the steps are the same once your cluster is connected.

## Supported models

| Model | VRAM required | Recommended instance |
|---|---|---|
| Llama 3.1 8B | ~10 GB | `g4dn.xlarge` (AWS) / `Standard_NC4as_T4_v3` (Azure) |
| Llama 3.3 70B | ~42 GB (Q4) | `g4dn.12xlarge` (AWS) / `Standard_NC24ads_A100_v4` (Azure) |

Llama 3.1 8B is the most practical choice if you're starting out — it fits on a single T4 GPU node and runs at a cost accessible to small teams. Llama 3.3 70B produces better results on complex reasoning and instruction following, but requires significantly more GPU memory.

## Prerequisites

- A Kubernetes cluster (EKS or AKS) with a GPU node group
- NVIDIA device plugin installed on the cluster
- CaseDesk account

## Connect your cluster

### AWS EKS

1. In CaseDesk, go to **Clusters** → **Connect cluster** → select **AWS EKS**.
2. Provide your AWS region, cluster name, and IAM access key with `eks:DescribeCluster` permission.
3. Apply the CaseDesk RBAC manifest to your cluster (shown during the connect flow) to grant the deployment service account permission to create namespaces and workloads.

See [Deploy DeepSeek on AWS EKS](/docs/guides/deploy-deepseek-on-aws-eks) for a detailed walkthrough of the EKS connect flow, including the IAM policy and NVIDIA device plugin setup.

### Azure AKS

1. In CaseDesk, go to **Clusters** → **Connect cluster** → select **Azure AKS**.
2. CaseDesk initiates an OAuth flow — you'll be redirected to Azure to authorise read access to your subscription's AKS clusters.
3. Select the subscription and cluster from the dropdown. CaseDesk retrieves the cluster endpoint and credentials via the Azure Resource Manager API.
4. Apply the RBAC manifest shown during the connect flow to grant the CaseDesk service account the necessary Kubernetes permissions.

For AKS GPU nodes, ensure the `aks-gpu` node pool is using the `Standard_NC4as_T4_v3` (T4, 16 GB) or `Standard_NC6s_v3` (V100, 16 GB) SKU. The NVIDIA device plugin is installed automatically on AKS GPU node pools — you don't need to install it manually.

## Deploy Llama

1. Go to **Models** in CaseDesk and search for **Llama**.
2. Select either **Llama 3.1 8B** or **Llama 3.3 70B**.
3. Click **Deploy** and choose your connected cluster.
4. CaseDesk provisions a dedicated namespace (e.g. `casedesk-abc123`), schedules the inference pod on a GPU node, and pulls the model weights.

First-time startup takes 5–12 minutes while model weights download. Subsequent restarts are faster.

## Use the endpoint

Once the deployment status shows **Running**, your endpoint is available at:

```
https://getcasedesk.com/proxy/{deployment-id}/v1
```

### curl — Llama 3.1 8B

```bash
curl https://getcasedesk.com/proxy/{deployment-id}/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3.1:8b",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Summarise the key differences between TCP and UDP."}
    ],
    "temperature": 0.7,
    "max_tokens": 512
  }'
```

### curl — Llama 3.3 70B

```bash
curl https://getcasedesk.com/proxy/{deployment-id}/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3.3:70b",
    "messages": [
      {"role": "user", "content": "Write a technical design document outline for a distributed rate limiter."}
    ],
    "temperature": 0.5,
    "max_tokens": 2048
  }'
```

### Python

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://getcasedesk.com/proxy/{deployment-id}/v1",
    api_key="not-needed",
)

response = client.chat.completions.create(
    model="llama3.1:8b",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Summarise the key differences between TCP and UDP."},
    ],
)
print(response.choices[0].message.content)
```

### Node.js (server-side only)

```javascript
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://getcasedesk.com/proxy/{deployment-id}/v1',
  apiKey: 'not-needed',
});

const response = await client.chat.completions.create({
  model: 'llama3.1:8b',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Summarise the key differences between TCP and UDP.' },
  ],
});

console.log(response.choices[0].message.content);
```

## Cost reference

### AWS EKS

| Model | Instance | Spot price (approx.) | On-demand price |
|---|---|---|---|
| Llama 3.1 8B | `g4dn.xlarge` | ~$0.16–0.20/hr | ~$0.526/hr |
| Llama 3.3 70B | `g4dn.12xlarge` | ~$0.80–1.20/hr | ~$3.912/hr |

### Azure AKS

| Model | Instance | Pay-as-you-go price |
|---|---|---|
| Llama 3.1 8B | `Standard_NC4as_T4_v3` | ~$0.526/hr |
| Llama 3.3 70B | `Standard_NC24ads_A100_v4` | ~$3.67/hr |

With CaseDesk's idle scale-down, GPU nodes scale to zero when no inference requests are being processed, so you only pay for actual compute time.

## Troubleshooting

**Pod not scheduling on GPU nodes**: Verify the NVIDIA device plugin is running (`kubectl get pods -n kube-system | grep nvidia`). On EKS, you may need to install it manually. On AKS, it's installed automatically for GPU SKUs.

**`llama3.3:70b` OOM on T4 nodes**: The 70B model requires more VRAM than a single T4 (16 GB) can provide. Use a larger instance (`g4dn.12xlarge` on AWS or an A100 SKU on Azure) or switch to the quantised 70B variant in the model catalogue.

**Slow first response**: The first request after a cold start may take 20–60 seconds while the model loads into GPU memory. Subsequent requests within the same session are fast.
