---
sidebar_position: 1
---

# CaseDesk vs Hugging Face Inference Endpoints

Hugging Face Inference Endpoints is a managed service that lets you deploy models from the Hugging Face Hub on Hugging Face's own cloud infrastructure. CaseDesk takes a different approach: it deploys models into your AWS or Azure account, so the inference compute lives inside your cloud, not someone else's.

## The core difference

With Hugging Face Endpoints, the execution environment is hosted by Hugging Face. Your prompts travel to their servers, inference happens there, and the response comes back to you. You pay Hugging Face directly for the compute.

With CaseDesk, the inference pod runs in your own Kubernetes cluster — in your VPC, under your cloud account. Your prompts never leave your infrastructure. CaseDesk's control plane only manages the deployment lifecycle (provisioning, monitoring, routing); it does not process or store inference traffic.

## Comparison table

| | CaseDesk | Hugging Face Endpoints |
|---|---|---|
| **Where inference runs** | Your AWS / Azure account | Hugging Face's infrastructure |
| **Data privacy** | Prompts and responses stay in your cloud | Prompts pass through Hugging Face servers |
| **Cloud provider choice** | AWS EKS or Azure AKS (your account) | AWS, Azure, GCP — but on HF's tenancy |
| **API format** | OpenAI, Anthropic, and Gemini compatible | Hugging Face Inference API format |
| **Existing SDK compatibility** | Drop-in: works with `openai`, `anthropic`, `google-generativeai` | Requires HF client or custom HTTP calls |
| **Cost model** | You pay AWS/Azure directly at standard rates | You pay Hugging Face per minute of runtime |
| **Cost transparency** | Your cloud bill, same as any EC2/AKS workload | Separate HF billing, per-endpoint pricing |
| **GPU availability** | Any GPU available in your region | Depends on HF's fleet availability |
| **Idle scale-down** | Supported via cluster autoscaler (scale to zero) | Supported (pause endpoint) |
| **Vendor lock-in** | None — your cluster, your models | Tied to HF's infrastructure and pricing |
| **Model source** | Any Ollama-compatible model | Hugging Face Hub models |
| **Setup complexity** | Requires a Kubernetes cluster | No cluster required |

## When Hugging Face Endpoints makes sense

- You don't have an existing Kubernetes cluster and don't want to manage one.
- You want to prototype quickly without cloud infrastructure setup.
- Your workload doesn't have strict data residency requirements.

## When CaseDesk makes sense

- You need data to stay inside your own cloud (compliance, enterprise policy, or customer commitments).
- You already run AWS EKS or Azure AKS and want to add inference without additional vendor accounts.
- You're standardising on the OpenAI, Anthropic, or Gemini SDK format and don't want to maintain a separate HF client integration.
- You want inference costs to appear in your existing AWS or Azure bill rather than a separate vendor invoice.
- You need to negotiate enterprise cloud pricing (reserved instances, committed use discounts) — those discounts apply automatically because you're paying your cloud provider directly.

## API compatibility note

Hugging Face Endpoints returns responses in the [HF Text Generation Inference](https://huggingface.co/docs/text-generation-inference) format, which differs from the OpenAI Chat Completions schema. If you're migrating from an OpenAI-compatible setup, you'll need to adapt your client code.

CaseDesk endpoints return OpenAI-compatible responses by default, so existing code using the `openai` SDK works without changes.
