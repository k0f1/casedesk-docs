---
sidebar_position: 1
---

# CaseDesk vs Hugging Face Inference Endpoints

Hugging Face Inference Endpoints is a managed service that lets you deploy models from the Hugging Face Hub on Hugging Face's own cloud infrastructure. CaseDesk is also a managed service — but it runs in a dedicated cluster in your chosen region (UK, EU, or US), so your data never leaves that region. For teams that need inference inside their own cloud account, CaseDesk also offers a BYOC mode.

## The core difference

With Hugging Face Endpoints, the execution environment is hosted by Hugging Face. Your prompts travel to their servers, inference happens there, and the response comes back to you. You have no control over which data centre processes your requests.

With CaseDesk, your deployment runs on infrastructure CaseDesk manages in the region you choose — AWS eu-west-2 for UK, Azure westeurope for EU, GCP us-east1 for US. Your prompts never leave that region. CaseDesk does not log or store inference traffic. When you need even more control, the BYOC option deploys the same stack into your own Kubernetes cluster.

## Comparison table

| | CaseDesk | Hugging Face Endpoints |
| --- | --- | --- |
| **Where inference runs** | CaseDesk-managed cluster in your chosen region (UK / EU / US) | Hugging Face's infrastructure |
| **Data privacy** | Prompts stay in your chosen region; CaseDesk does not log inference | Prompts processed on Hugging Face's servers |
| **Region control** | UK (AWS eu-west-2), EU (Azure westeurope), US (GCP us-east1) | AWS, Azure, GCP — but on HF's tenancy |
| **API format** | OpenAI, Anthropic, and Gemini compatible | Hugging Face Inference API format |
| **Existing SDK compatibility** | Drop-in: works with `openai`, `anthropic`, `google-generativeai` | Requires HF client or custom HTTP calls |
| **Cost model** | Flat monthly subscription — no per-token or per-GPU-hour charges | Per minute of runtime |
| **Infrastructure setup** | None — CaseDesk provisions and manages the cluster | No cluster required |
| **GPU availability** | Dedicated namespace — no shared queues | Shared fleet; availability varies |
| **Idle scale-down** | Scale to zero when idle, wakes on next request | Pause endpoint |
| **Vendor lock-in** | None — OpenAI-compatible API, open-source models | Tied to HF's infrastructure and API format |
| **Own-cloud option** | Yes — BYOC deploys into your AWS EKS, Azure AKS, or GCP GKE | No |
| **Model source** | Any model in the catalogue (Llama, DeepSeek, Qwen, Phi, and more) | Hugging Face Hub models |

## When Hugging Face Endpoints makes sense

- You want to experiment with a wide range of community models from the HF Hub.
- Data residency requirements are not strict.
- You're already deeply integrated with the Hugging Face ecosystem.

## When CaseDesk makes sense

- You need data to stay in a specific region — UK, EU, or US — for compliance, enterprise policy, or customer commitments.
- You want a flat predictable monthly cost rather than per-minute GPU billing.
- You're standardising on the OpenAI, Anthropic, or Gemini SDK format and don't want to maintain a separate HF client integration.
- You want to start on managed infrastructure and move to your own cloud cluster later without changing your application code.

## API compatibility note

Hugging Face Endpoints returns responses in the [HF Text Generation Inference](https://huggingface.co/docs/text-generation-inference) format, which differs from the OpenAI Chat Completions schema. If you're migrating from an OpenAI-compatible setup, you'll need to adapt your client code.

CaseDesk endpoints return OpenAI-compatible responses by default, so existing code using the `openai` SDK works without changes.
