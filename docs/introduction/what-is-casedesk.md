---
sidebar_position: 1
---

# What is CaseDesk

CaseDesk gives your organisation a private AI inference endpoint powered by open-source models. Your data never leaves your infrastructure.

Two deployment modes are available:

**Managed CaseDesk** - CaseDesk provisions and runs a dedicated cluster on Azure or GCP in your chosen region. You get an OpenAI-compatible endpoint within minutes. Flat monthly subscription - no per-token or per-GPU-hour charges.

**BYOC (Bring Your Own Cluster)** - Connect your existing AWS EKS, Azure AKS, GCP GKE, GPU VM, or on-prem server. CaseDesk handles the deployment and endpoint routing. Inference is free once your cluster is connected - you pay only your cloud provider.

## Key capabilities

- **OpenAI-compatible API** - drop-in replacement for OpenAI endpoints in any application
- **vLLM continuous batching** - Team and Advanced tiers serve up to 20 or 50 concurrent users from a single pod, with no per-seat charges
- **Scale to zero** - managed deployments scale down when idle and wake automatically on the next request
- **Knowledge bundles** - attach an OKF knowledge bundle to a deployment so the inference proxy automatically grounds responses in your organisation's documents
- **Data residency** - choose UK (Azure uksouth, DSPT compliant), EU (Azure westeurope), or US (GCP us-east1)

## How CaseDesk compares

Evaluating hosted alternatives? See how CaseDesk stacks up:

- [CaseDesk vs RunPod](https://getcasedesk.com/compare/runpod) - BYOC vs rented GPU cloud
- [CaseDesk vs Hugging Face Endpoints](https://getcasedesk.com/compare/huggingface-endpoints) - BYOC vs managed inference
- [CaseDesk vs Replicate](https://getcasedesk.com/compare/replicate) - BYOC vs serverless model API
- [CaseDesk vs Modal](https://getcasedesk.com/compare/modal) - BYOC vs serverless GPU compute
