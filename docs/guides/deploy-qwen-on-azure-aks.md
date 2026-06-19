---
sidebar_position: 3
---

# Deploy Qwen on Azure AKS

This guide walks through connecting your Azure AKS cluster to CaseDesk and deploying a Qwen 2.5 model. By the end, you'll have a private inference endpoint running inside your own Azure subscription.

## Prerequisites

- An Azure AKS cluster with a GPU node pool (T4 or A100 SKU)
- An Azure account with Owner or Contributor access on the subscription
- A CaseDesk account

## Step 1 — Connect your AKS cluster

CaseDesk uses an OAuth flow to connect to Azure — no service principal setup required.

1. Go to **Clusters** in the CaseDesk dashboard and click **Connect cluster**.
2. Select **Azure AKS** as the provider.
3. Click **Authorise with Azure**. You'll be redirected to the Microsoft login page.
4. Sign in with the Azure account that has access to your subscription. CaseDesk requests read-only access to your AKS clusters via the Azure Resource Manager API.
5. After authorising, return to CaseDesk and select your **subscription** and **cluster** from the dropdowns.
6. CaseDesk retrieves the cluster endpoint and CA certificate automatically.
7. Click **Save cluster**.

## Step 2 — Apply RBAC permissions

CaseDesk creates a dedicated Kubernetes namespace for each deployment (e.g. `casedesk-abc123`). Apply the RBAC manifest shown in the connect flow to grant the CaseDesk service account permission to manage those namespaces:

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
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: casedesk-operator
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: casedesk-operator
subjects:
  - kind: ServiceAccount
    name: casedesk
    namespace: casedesk-system
EOF
```

CaseDesk will verify that these permissions are in place before allowing deployments to the cluster.

## Step 3 — Verify your GPU node pool

AKS installs the NVIDIA device plugin automatically on GPU node pools, but confirm the plugin is healthy:

```bash
kubectl get pods -n kube-system | grep nvidia
```

You should see a `nvidia-device-plugin-daemonset` pod in a `Running` state on each GPU node.

Supported GPU SKUs for Qwen 2.5:

| Model | VRAM required | Recommended Azure SKU |
|---|---|---|
| Qwen 2.5 7B | ~8 GB | `Standard_NC4as_T4_v3` (T4, 16 GB) |
| Qwen 2.5 14B | ~18 GB (Q4) | `Standard_NC6s_v3` (V100, 16 GB) or `Standard_NC24ads_A100_v4` |

The `Standard_NC4as_T4_v3` is the most cost-effective option for Qwen 2.5 7B. The 14B model with Q4 quantisation also fits on a T4 with some headroom.

## Step 4 — Enable cluster autoscaler (optional but recommended)

If you want the GPU node pool to scale to zero when idle (saving cost), enable the AKS cluster autoscaler on the GPU node pool:

```bash
az aks nodepool update \
  --resource-group <your-resource-group> \
  --cluster-name <your-cluster-name> \
  --name gpunodes \
  --enable-cluster-autoscaler \
  --min-count 0 \
  --max-count 3
```

CaseDesk will trigger scale-up automatically when a deployment is created, and the autoscaler will scale the pool back to zero after sustained idle time.

## Step 5 — Deploy Qwen 2.5

1. Go to **Models** in CaseDesk and search for **Qwen**.
2. Select either **Qwen 2.5 7B** or **Qwen 2.5 14B**.
3. Click **Deploy** and select the AKS cluster you connected in Step 1.
4. CaseDesk provisions the namespace and starts pulling the model weights (~4–9 GB depending on quantisation). This takes 4–10 minutes on the first deploy.

Monitor the deployment status in the CaseDesk dashboard. Once it shows **Running**, your endpoint is live.

## Step 6 — Get your endpoint URL

Click into the deployment to find your endpoint:

```
https://getcasedesk.com/proxy/{deployment-id}/v1
```

## Step 7 — Test with curl

```bash
curl https://getcasedesk.com/proxy/{deployment-id}/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen2.5:7b",
    "messages": [
      {"role": "system", "content": "You are a concise technical assistant."},
      {"role": "user", "content": "What is the difference between a mutex and a semaphore?"}
    ],
    "temperature": 0.6,
    "max_tokens": 512
  }'
```

For Qwen 2.5 14B, change the `model` value to `qwen2.5:14b`.

## Python example

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://getcasedesk.com/proxy/{deployment-id}/v1",
    api_key="not-needed",
)

response = client.chat.completions.create(
    model="qwen2.5:7b",
    messages=[
        {"role": "system", "content": "You are a concise technical assistant."},
        {"role": "user", "content": "What is the difference between a mutex and a semaphore?"},
    ],
    temperature=0.6,
    max_tokens=512,
)
print(response.choices[0].message.content)
```

## Cost estimate

| Model | Azure SKU | Pay-as-you-go | Approx. monthly (8 hrs/day) |
|---|---|---|---|
| Qwen 2.5 7B | `Standard_NC4as_T4_v3` | ~$0.526/hr | ~$85/mo |
| Qwen 2.5 14B | `Standard_NC6s_v3` | ~$0.90/hr | ~$145/mo |

With the cluster autoscaler scaling to zero during off-hours, actual costs can be significantly lower. AKS cluster management fees (~$73/mo for the control plane) apply regardless of whether nodes are running.

## Troubleshooting

**OAuth authorisation fails**: Ensure the Azure account you're signing in with has at least Reader access on the subscription and `Microsoft.ContainerService/managedClusters/listClusterUserCredential/action` permission on the cluster.

**GPU node pool not scaling up**: Check that the cluster autoscaler is enabled and the minimum node count allows scale-up. Run `kubectl get events -n casedesk-{deployment-id}` to see scheduling events.

**Model OOM on T4 with Qwen 2.5 14B (full precision)**: The full-precision 14B model exceeds 16 GB VRAM. Use the Q4 quantised variant from the model catalogue, or switch to a `Standard_NC24ads_A100_v4` node (80 GB VRAM).
