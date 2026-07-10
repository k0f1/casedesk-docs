---
sidebar_position: 2
---

# How it Works

CaseDesk deploys open-source AI models and gives you an OpenAI-compatible API endpoint. Two modes are available: Managed CaseDesk (CaseDesk runs the cluster) and BYOC (you connect your own infrastructure).

---

## Managed CaseDesk

CaseDesk provisions a dedicated cluster in your chosen region and manages it for you. Flat monthly subscription - no GPU-hour billing.

1. **Start the wizard** - go to [getcasedesk.com](https://getcasedesk.com) and click **Get started**
2. **Choose a plan** - Starter (1-8B models), Team (9-20B, up to 20 concurrent users), or Advanced (21-70B, up to 50 concurrent users)
3. **Choose a region** - UK (Azure uksouth, DSPT compliant), EU (Azure westeurope), or US (GCP us-east1)
4. **Choose a model** - pick from the catalogue (Llama, DeepSeek, Qwen, Phi, and more)
5. **Use the endpoint** - every deployment gets a unique OpenAI-compatible URL

Managed deployments scale to zero when idle and wake automatically on the next request. See [Autoscaling](/deploy-a-model/autoscaling) for cold-start times.

---

## BYOC (Bring Your Own Cluster)

Connect your existing infrastructure. CaseDesk handles deployment and endpoint routing. All compute stays on your side - inference is free once your cluster is connected.

CaseDesk supports three types of BYOC targets:

| Type | Best for |
|---|---|
| **Kubernetes cluster** | Production workloads, multi-model (AWS EKS, Azure AKS, GCP GKE) |
| **GPU VM** | Single cloud server (AWS EC2, Hetzner, Lambda Labs, DigitalOcean, GCP, Azure) |
| **On-prem server** | Servers inside your network - no inbound ports required |

### Kubernetes cluster path (AWS EKS, Azure AKS, Google GKE)

1. **Connect your cluster** - authenticate with AWS IAM credentials, or sign in with Microsoft/Google via OAuth
2. **Choose a model** - pick from the catalogue
3. **Deploy** - CaseDesk creates a Kubernetes namespace and deploys the runtime into your cluster
4. **Use the endpoint** - every deployment gets a unique OpenAI-compatible URL

### GPU VM path (single cloud server, no Kubernetes)

1. **Connect your provider** - sign in with Google/Microsoft/DigitalOcean OAuth, or paste an API key for AWS/Hetzner/Lambda Labs. CaseDesk lists your running VMs automatically.
2. **Select a VM** - pick from the list; the IP address and provider are pre-filled
3. **Upload your SSH key** - CaseDesk encrypts it with AES-256-GCM and uses it once to bootstrap
4. **CaseDesk bootstraps** - installs Docker, runs Ollama, pulls the selected model
5. **Use the endpoint** - proxied through your CaseDesk dashboard URL

You can also enter an IP address manually if you prefer not to connect a cloud account.

### On-prem server path (outbound agent, no inbound ports)

For servers inside your network where inbound SSH is not possible (air-gapped environments, HSCN-connected NHS trusts, corporate firewalls):

1. **Generate an install token** - CaseDesk creates a one-time token valid for 24 hours
2. **Run the one-liner on your server** - the agent installs itself and connects outbound over HTTPS
3. **Agent registers** - CaseDesk receives the connection and marks the server as live
4. **Deploy a model** - same catalogue, same one-click deploy

The agent never requires an inbound port. All traffic is initiated by the server to CaseDesk.

---

Your data never leaves your infrastructure.
