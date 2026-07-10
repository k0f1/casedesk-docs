---
sidebar_position: 1
---

# Choosing the Right Plan

Managed CaseDesk is a flat monthly subscription. Choose the plan that matches your model size and concurrency requirements.

## Plans

| Plan | Monthly price | Model size | Runtime | Max concurrent users |
|------|--------------|------------|---------|----------------------|
| Starter | £199 / €229 / $239 | 1-8B | Ollama (sequential) | 1 |
| Team | £449 / €499 / $519 | 9-20B | vLLM | 20 |
| Advanced | £1,199 / €1,349 / $1,399 | 21-70B | vLLM | 50 |
| Enterprise Isolation | Custom | Any | Dedicated hardware node | Custom |

Prices are per deployment, billed monthly. No GPU-hour charges. No per-seat charges.

[Contact sales](mailto:sales@getcasedesk.com) for Enterprise Isolation pricing.

## Concurrency

Starter uses Ollama, which processes requests sequentially. It is suited to single-user or low-concurrency workloads.

Team and Advanced use vLLM continuous batching. Multiple users can generate responses simultaneously from a single pod:

- **Team** - up to 20 concurrent users generating at once
- **Advanced** - up to 50 concurrent users generating at once

The flat monthly price covers all concurrent users with no additional per-seat charges.

## Choosing a model

Within each plan, you choose a model from the catalogue at deployment time. Guidance by use case:

| Use case | Recommended model range |
|----------|------------------------|
| Assistants, chatbots, customer support | 1-8B (Starter) |
| Complex reasoning, agents, document analysis | 9-20B (Team) |
| Large-context tasks, long documents, legal/medical analysis | 21-70B (Advanced) |

## BYOC

If you connect your own cluster (BYOC), there is no CaseDesk subscription charge for inference. You choose the model and runtime freely, and pay only your cloud provider for the underlying compute.

:::tip Evaluating hosted alternatives?
If you're comparing CaseDesk against GPU cloud or serverless inference providers, see the [comparison pages](https://getcasedesk.com/compare) for a side-by-side breakdown on cost, data ownership, and control.
:::
