---
sidebar_position: 1
---

# What is CaseDesk

CaseDesk gives your organisation a private AI inference endpoint powered by open-source models. Your data never leaves your chosen region.

## Deployment modes

**Managed CaseDesk** — CaseDesk provisions and runs a dedicated cluster on AWS in your chosen region. You get an OpenAI-compatible endpoint within minutes. Flat monthly subscription — no per-token or per-GPU-hour charges.

**CaseDesk Enterprise** — For NHS Trusts, government, and regulated industries. Your cloud account, full data sovereignty. Sold through a consultative process — not self-service.

**Connect Your Server** — Connect an existing GPU VM or on-prem server. CaseDesk installs the runtime and handles endpoint routing. Inference is free once your server is connected — you pay only your cloud provider.

## Key capabilities

- **OpenAI-compatible API** — drop-in replacement for OpenAI endpoints in any application
- **Production API key** — `cd_live_...` format key per deployment, shown on the deployment detail page and regeneratable at any time
- **Routing pool** — deploy multiple models behind a single endpoint URL; the request's `model` field selects which model handles it
- **vLLM continuous batching** — Team and Advanced tiers serve up to 20 or 50 concurrent users from a single pod, with no per-seat charges
- **Scale to zero** — managed deployments scale down when idle and wake automatically on the next request
- **Knowledge bundles** — attach an OKF knowledge bundle to a deployment so the inference proxy automatically grounds responses in your organisation's documents
- **Data residency** — UK (AWS eu-west-2, DSPT compliant), EU (Azure westeurope), or US (GCP us-east1)

## How CaseDesk compares

Evaluating hosted alternatives? See how CaseDesk stacks up:

- [CaseDesk vs RunPod](https://getcasedesk.com/compare/runpod) — managed vs rented GPU cloud
- [CaseDesk vs Hugging Face Endpoints](https://getcasedesk.com/compare/huggingface-endpoints) — data residency and API compatibility
- [CaseDesk vs Replicate](https://getcasedesk.com/compare/replicate) — flat subscription vs per-second billing
- [CaseDesk vs Modal](https://getcasedesk.com/compare/modal) — dedicated inference vs serverless GPU compute
