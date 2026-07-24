---
sidebar_position: 1
---

# Quick Start

The fastest way to get a private AI endpoint is through the Managed CaseDesk wizard. CaseDesk provisions the cluster — no infrastructure setup required.

## Managed CaseDesk (recommended)

1. [Sign in](https://getcasedesk.com/login) to your CaseDesk account
2. The wizard launches automatically after sign-in
3. Choose a plan: **Starter**, **Team**, or **Advanced** (see [Choosing a Plan](/deploy-a-model/choosing-a-model) for a full comparison)
4. Choose a region: UK, EU, or US
5. Choose a model from the catalogue
6. Click **Deploy** — CaseDesk provisions your cluster and deployment
7. Wait for the status to reach **running** (~5–10 min on first deploy)
8. Copy your endpoint URL and production API key (`cd_live_...`) from the deployment detail page

Managed deployments are billed as a flat monthly subscription. No GPU-hour charges.

## Sandbox (free, for testing)

The CaseDesk Sandbox gives you a shared GPU environment to test models without a subscription.

1. [Sign in](https://getcasedesk.com/login) to your CaseDesk account
2. Go to **Models** and click **Deploy Model**
3. Select **CaseDesk Sandbox** as the target
4. Click **Deploy**
5. Wait for the deployment to go from **pending** to **running** (~10–18 min on first deploy — includes GPU node provisioning)
6. Copy your endpoint URL and production API key from the deployment detail page

The Sandbox is shared infrastructure. For production use, upgrade to a Managed CaseDesk plan.

## Connect your own server

If you prefer to run inference on your own hardware:

- **GPU VM** — see [Connect a GPU VM](/connect-your-cluster/gpu-vm/connect-via-ssh)
- **On-prem server** (no inbound ports) — see [Install the agent](/connect-your-cluster/onprem/install-agent)
