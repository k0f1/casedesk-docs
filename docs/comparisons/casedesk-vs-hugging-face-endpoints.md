---
sidebar_position: 1
---

# CaseDesk vs Hugging Face Inference Endpoints

Hugging Face Inference Endpoints hosts models in Hugging Face-managed cloud
infrastructure. CaseDesk connects its control plane to an endpoint your
organisation or approved provider already controls.

| Question | CaseDesk | Hugging Face Inference Endpoints |
|---|---|---|
| Runtime ownership | Customer or approved provider | Hugging Face |
| Runtime payer | Customer or approved provider | Hugging Face customer account |
| Platform role | API compatibility, routing, policy, and observability | Managed endpoint hosting |
| Capacity fallback | Never substitutes a different runtime | Provider-managed service |
| Regional boundary | Customer-selected and verified | Provider-selected configuration |

Choose CaseDesk when infrastructure ownership, payer separation, and a single
governed API surface matter more than hosted endpoint convenience.
