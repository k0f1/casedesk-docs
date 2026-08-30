---
sidebar_position: 3
---

# Runtime Scaling

CaseDesk does not create, scale, or reserve production runtime capacity for a
customer. Scaling belongs to the cloud, provider, Kubernetes cluster, or VM
that you connect.

## What to decide before a connected trial

- Minimum and maximum runtime capacity
- Cold-start and model-load behaviour
- Timeout and retry policy in your client
- GPU or CPU limits for the workload contract
- Who is responsible for observing and changing the runtime

CaseDesk records the connection's region, data boundary, endpoint health, and
service policy. It does not change the scaling policy in your environment.

For a temporary evaluation, set a finite runtime window and remove or scale down
the customer-owned capacity when the evaluation ends.
