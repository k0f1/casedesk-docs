---
sidebar_position: 2
---

# How it Works

CaseDesk deploys open-source AI models into your own infrastructure and gives you an OpenAI-compatible API endpoint. All compute stays on your side.

## Infrastructure types

CaseDesk supports three types of deployment targets, all managed from the **Infrastructure** section of the dashboard:

| Type | Best for |
|---|---|
| **Kubernetes Cluster** | Production workloads, auto-scaling, multi-model |
| **GPU VM** | Single cloud server (AWS EC2, Hetzner, Lambda Labs, DigitalOcean, GCP, Azure) |
| **On-prem Server** | Servers inside your network - no inbound ports required |

---

## Kubernetes cluster path (AWS EKS, Azure AKS, Google GKE)

1. **Connect your cluster** - authenticate with AWS IAM credentials, or sign in with Microsoft/Google via OAuth
2. **Choose a model** - pick from the catalogue (Llama, DeepSeek, Qwen, Phi, and more)
3. **Deploy** - CaseDesk creates a Kubernetes namespace and deploys Ollama into your cluster
4. **Use the endpoint** - every deployment gets a unique OpenAI-compatible URL

---

## GPU VM path (single cloud server, no Kubernetes)

1. **Connect your provider** - sign in with Google/Microsoft/DigitalOcean OAuth, or paste an API key for AWS/Hetzner/Lambda Labs. CaseDesk lists your running VMs automatically.
2. **Select a VM** - pick from the list; the IP address and provider are pre-filled
3. **Upload your SSH key** - CaseDesk encrypts it with AES-256-GCM and uses it once to bootstrap
4. **CaseDesk bootstraps** - installs Docker, runs Ollama, pulls the selected model
5. **Use the endpoint** - proxied through your CaseDesk dashboard URL

You can also enter an IP address manually if you prefer not to connect a cloud account.

---

## On-prem server path (outbound agent, no inbound ports)

For servers inside your network where inbound SSH is not possible (air-gapped environments, HSCN-connected NHS trusts, corporate firewalls):

1. **Generate an install token** - CaseDesk creates a one-time token valid for 24 hours
2. **Run the one-liner on your server** - the agent installs itself and connects outbound over HTTPS
3. **Agent registers** - CaseDesk receives the connection and marks the server as live
4. **Deploy a model** - same catalogue, same one-click deploy

The agent never requires an inbound port. All traffic is initiated by the server to CaseDesk.

---

Your data never leaves your infrastructure.
