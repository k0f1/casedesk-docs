---
sidebar_position: 2
---

# CaseDesk vs Replicate

Replicate is a managed inference platform — you call their API, their servers run the model, and the response comes back to you. It's optimised for ease of use: no infrastructure to manage, wide model selection, pay-per-second billing.

CaseDesk is built around a different principle: the inference compute runs in your cloud account, not Replicate's. Your data doesn't leave your infrastructure.

## The core difference

On Replicate, every prompt you send travels across the public internet to Replicate's servers, is processed there, and the response is returned to your application. Replicate controls the hardware and the network path.

On CaseDesk, the inference pod is a Kubernetes deployment inside your own AWS VPC or Azure VNet. Prompts flow from your application to CaseDesk's proxy (for routing and auth), then to your inference pod — and the inference pod itself never leaves your network boundary. CaseDesk's control plane does not see or log inference traffic.

## Comparison table

| | CaseDesk | Replicate |
|---|---|---|
| **Where inference runs** | Your AWS / Azure Kubernetes cluster | Replicate's infrastructure |
| **Data privacy** | Prompts stay in your cloud | Prompts processed on Replicate's servers |
| **Infrastructure control** | Full — you own the cluster, nodes, and networking | None — fully managed by Replicate |
| **API format** | OpenAI, Anthropic, and Gemini compatible | Replicate's own prediction API |
| **OpenAI SDK compatibility** | Yes — drop-in `base_url` override | No — requires Replicate client or REST calls |
| **Cost model** | Pay AWS/Azure at standard rates | Pay Replicate per second of GPU runtime |
| **GPU types available** | Any GPU in your AWS/Azure region | Replicate's fleet (T4, A40, A100) |
| **Cold start latency** | First start: 3–10 min (model pull); subsequent: warm | Per-request cold starts common on shared fleet |
| **Idle cost** | Zero — scale to zero with cluster autoscaler | Zero — billed per prediction, not per hour |
| **Custom models** | Any Ollama-compatible model | Must be packaged as a Cog model |
| **Vendor lock-in** | None | API format and model packaging tied to Replicate |
| **Setup complexity** | Requires a Kubernetes cluster | None — API key and go |

## Cost model in practice

Replicate charges per second of GPU compute. For sporadic requests (a few hundred per day), this can be very economical. For sustained, high-throughput workloads, the per-second rate adds up quickly and typically exceeds the cost of a dedicated GPU node.

CaseDesk runs a dedicated pod — you pay for the node whether it's processing requests or idle. With the cluster autoscaler scaling GPU nodes to zero when no deployments are active, idle cost is eliminated. For workloads with predictable traffic patterns, this is significantly cheaper at scale.

## When Replicate makes sense

- You have sporadic, low-volume inference needs and don't want to manage a Kubernetes cluster.
- You need access to a wide variety of community models without packaging them yourself.
- Ease of setup is the top priority and data privacy requirements are not strict.

## When CaseDesk makes sense

- Your organisation has data handling requirements that prevent sending prompts to third-party servers (healthcare, finance, legal, government).
- You already run Kubernetes on AWS or Azure and want to add LLM inference without adding a new vendor.
- You're integrating with existing code that uses the OpenAI, Anthropic, or Gemini SDKs — no client changes required.
- You want GPU inference costs to appear in your existing cloud bill, subject to your existing enterprise discounts and committed use arrangements.
- You need consistent, low-latency performance from a dedicated node rather than shared fleet cold-start variability.
