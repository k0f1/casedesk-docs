---
sidebar_position: 2
---

# Connection and Trial Status

CaseDesk tracks the health and commercial state of a connection; it does not
provision a deployment behind the scenes.

| Status | Meaning | Next step |
|---|---|---|
| **Submitted** | Connection details await verification | Confirm payer, region, data boundary, and model |
| **Approved** | Endpoint and ownership evidence are accepted | Activate the connected trial |
| **Active trial** | Requests can reach the verified endpoint | Monitor expiry and endpoint health |
| **Production active** | Paid routing is enabled | Maintain CaseDesk credit and provider capacity |
| **Paused** | Billing, expiry, or health policy stopped routing | Resolve the stated issue; no fallback is used |
| **Unhealthy** | CaseDesk cannot reach the approved endpoint | Restore the customer-controlled runtime and reverify |

Historic managed deployments may appear for audit. They are retired and cannot
be started or reprovisioned.
