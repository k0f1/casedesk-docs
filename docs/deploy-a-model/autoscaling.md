---
sidebar_position: 3
---

# Autoscaling and Scale to Zero

All Managed CaseDesk deployments (Starter, Team, and Advanced) scale to zero automatically when idle. BYOC deployments running on your own cluster are not affected by this policy.

## How it works

- When a managed deployment receives no traffic for 30 minutes, CaseDesk scales the pod down to zero replicas
- The deployment status changes to **idle**
- On the next incoming request, CaseDesk wakes the deployment automatically

No configuration is needed. Scale to zero applies to all managed deployments and cannot be disabled.

## Cold-start times

| Tier | Runtime | Typical cold-start from idle |
|------|---------|------------------------------|
| Starter | Ollama | 15-30 seconds |
| Team | vLLM | 30-90 seconds |
| Advanced | vLLM | 30-90 seconds |
| Sandbox | Ollama (AWS ASG) | ~2 minutes (includes GPU node provisioning) |

Starter deployments wake faster because Ollama has a lighter startup path than vLLM. Team and Advanced use vLLM, which must load model weights into GPU VRAM before serving the first request.

## Impact on applications

Applications connecting to a managed endpoint should handle an initial delay when the deployment is idle. A request to an idle endpoint:

1. Triggers auto-wake
2. Waits while the model loads (see cold-start times above)
3. Receives the response once the model is ready

The request does not need to be retried - CaseDesk holds the connection open until the deployment is ready. Set your HTTP client timeout to at least 120 seconds to avoid premature disconnects on cold starts.

## Checking deployment status

The deployment card shows **idle** when scaled to zero. Once a request arrives and the deployment is waking, the status transitions to **pending**, then **running**. See [Understanding Deployment Status](/deploy-a-model/deployment-status) for the full status reference.
