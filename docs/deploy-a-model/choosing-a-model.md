---
sidebar_position: 1
---

# Choosing the Right Plan

Managed CaseDesk is a flat monthly subscription. The recommendation flow starts from workload intent, then maps to the smallest safe plan that can satisfy the required runtime envelope.

## Plans

| Plan | Monthly price | Model size | Runtime | Max concurrent users |
|------|--------------|------------|---------|----------------------|
| Starter | £199 / €229 / $239 | 1–8B | Ollama (sequential) | 1 |
| Team | £449 / €499 / $519 | 9–20B | vLLM | 20 |
| Advanced | £1,199 / €1,349 / $1,399 | 21–70B | vLLM | 50 |
| Enterprise Isolation | Custom | Any | Dedicated hardware node | Custom |

Prices are per deployment, billed monthly. No GPU-hour charges. No per-seat charges.

[Contact sales](mailto:sales@getcasedesk.com) for Enterprise Isolation pricing.

## Concurrency

Starter uses Ollama, which processes requests sequentially. It is suited to single-user or low-concurrency workloads.

Team and Advanced use vLLM continuous batching. Multiple users can generate responses simultaneously from a single pod:

- **Team** — up to 20 concurrent users generating at once
- **Advanced** — up to 50 concurrent users generating at once

The flat monthly price covers all concurrent users with no additional per-seat charges.

## Choosing a deployment path

The wizard should be read as a workload-to-runtime decision, not a raw model-catalogue picker. Guidance by workload:

| Workload profile | Intended for | Recommended plan floor |
|------------------|--------------|------------------------|
| `KNOWLEDGE_STANDARD` | General assistant work, explanations, and trusted internal materials | Starter or Team |
| `CODING_STANDARD` | Code generation, code review, repository-aware agents, Claude Code, Codex | Advanced |
| `RESEARCH_STANDARD` | Web search, synthesis, and current-information workflows | Team or Advanced |
| `AUTOMATION_STANDARD` | Structured automation and business-system routing | Starter or Team |

For coding intent, CaseDesk must keep the deployment on a coding-capable runtime envelope. Smaller tiers may still appear as alternatives, but they are not coding-agent ready.

:::tip Evaluating hosted alternatives?
If you're comparing CaseDesk against GPU cloud or serverless inference providers, see the [comparison pages](https://getcasedesk.com/compare) for a side-by-side breakdown on cost, data ownership, and control.
:::
