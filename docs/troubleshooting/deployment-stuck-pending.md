---
sidebar_position: 1
---

# Connection Is Not Activating

CaseDesk does not provision a GPU or model as part of activation. A connection
can remain unavailable only while its verification, billing, trial, or health
requirement is unresolved.

Check the following:

1. The endpoint URL is reachable by CaseDesk over HTTPS.
2. The submitted region, data boundary, and model match the runtime.
3. The workspace administrator has confirmed the customer or provider payer.
4. The connection has been approved and is healthy.
5. The trial is not expired and production credit is available where required.

If the connection is unhealthy, restore it in the customer-controlled
environment and request verification again. CaseDesk will not dispatch traffic
to another endpoint or create fallback capacity.
