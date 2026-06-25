---
sidebar_position: 1
---

# Quick Start (Sandbox)

No cluster required. The CaseDesk Sandbox gives you a managed GPU environment to deploy and test models immediately.

1. [Sign in](https://getcasedesk.com/login) to your CaseDesk account
2. Go to **Models** and click **Deploy Model**
3. Select **CaseDesk Sandbox** as the target cluster
4. Click **Deploy →**
5. Wait for the deployment to go from **pending** to **running** (~7-12 min on first deploy)
6. Copy your endpoint URL and start making requests

Once you're ready to deploy into your own infrastructure, go to **Infrastructure** in the navigation and choose your deployment target:

- **Kubernetes cluster** - see [AWS EKS](/connect-your-cluster/aws-eks/existing-cluster), [Azure AKS](/connect-your-cluster/azure-aks/existing-cluster), or [Google GKE](/connect-your-cluster/gcp-gke/existing-cluster)
- **GPU VM** - see [Connect a GPU VM](/connect-your-cluster/gpu-vm/connect-via-ssh)
- **On-prem server** (no inbound ports) - see [Install the agent](/connect-your-cluster/onprem/install-agent)
