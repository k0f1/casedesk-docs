---
sidebar_position: 2
---

# CaseDesk vs Replicate

Replicate is a managed inference platform — you call their API, their servers run the model, and the response comes back to you. It's optimised for ease of use: no infrastructure to manage, wide model selection, pay-per-second billing.

CaseDesk is also a managed service, but it runs in a dedicated cluster in your chosen region — UK, EU, or US — so your data never leaves that region. You get the ease of a managed service with the data residency guarantees of self-hosting. When you need inference inside your own cloud account, CaseDesk's BYOC mode deploys the same stack into your own Kubernetes cluster.

## The core difference

On Replicate, every prompt travels to Replicate's servers, is processed there, and the response is returned. You have no control over which data centre handles your requests.

On CaseDesk, your deployment runs on infrastructure CaseDesk manages in the region you select — AWS eu-west-2 for UK, Azure westeurope for EU, GCP us-east1 for US. Your prompts never leave that region. CaseDesk does not log or store inference traffic. A flat monthly subscription replaces Replicate's per-second billing, so cost is predictable at any volume.

## Comparison table

| | CaseDesk | Replicate |
| --- | --- | --- |
| **Where inference runs** | CaseDesk-managed cluster in your chosen region (UK / EU / US) | Replicate's infrastructure |
| **Data privacy** | Prompts stay in your chosen region; CaseDesk does not log inference | Prompts processed on Replicate's servers |
| **API format** | OpenAI, Anthropic, and Gemini compatible | Replicate's own prediction API |
| **OpenAI SDK compatibility** | Yes — drop-in `base_url` override | No — requires Replicate client or REST calls |
| **Cost model** | Flat monthly subscription — no per-second charges | Per second of GPU runtime |
| **Cold start** | First deploy: 5–10 min; subsequent requests: warm (scale to zero then wake) | Per-request cold starts common on shared fleet |
| **Idle cost** | Zero — scales to zero when idle | Zero — billed per prediction |
| **Concurrent users** | Up to 5 / 20 / 50 via vLLM continuous batching (Starter / Team / Advanced) | Shared fleet; throughput varies |
| **Custom models** | Any model in the catalogue (Llama, DeepSeek, Qwen, Phi, and more) | Must be packaged as a Cog model |
| **Vendor lock-in** | None — OpenAI-compatible API, open-source models | API format and model packaging tied to Replicate |
| **Infrastructure setup** | None — CaseDesk provisions and manages everything | None — API key and go |
| **Own-cloud option** | Yes — BYOC deploys into your AWS EKS, Azure AKS, or GCP GKE | No |

## Cost model in practice

Replicate charges per second of GPU compute. For sporadic, low-volume workloads this is economical. For sustained team usage — even ten developers making a few requests per minute — the per-second rate adds up quickly and typically exceeds a flat monthly CaseDesk subscription.

CaseDesk's flat subscription includes scale-to-zero, so you pay the same monthly amount whether your team is quiet or busy. There are no surprise bills at the end of the month.

## When Replicate makes sense

- You have sporadic, low-volume inference needs with no strict data residency requirements.
- You need access to a wide variety of community models without any setup.
- Ease of API access is the top priority and compliance requirements are not a factor.

## When CaseDesk makes sense

- Your organisation has data handling requirements that prevent prompts leaving a specific region (healthcare, finance, legal, government).
- You want predictable flat-rate cost rather than per-second billing that scales with usage.
- You're integrating with existing code using the OpenAI, Anthropic, or Gemini SDKs — no client changes required.
- You want to start on managed infrastructure and migrate to your own cloud cluster later without changing your application code.
