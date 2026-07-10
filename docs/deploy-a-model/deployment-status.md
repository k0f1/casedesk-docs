---
sidebar_position: 2
---

# Understanding Deployment Status

| Status | Meaning |
|--------|---------|
| **Pending** | Provisioning - Kubernetes resources created, pod starting up |
| **Pulling** | Downloading the model weights - this can take several minutes |
| **Running** | Model is loaded and the endpoint is live |
| **Idle** | Scaled to zero - no traffic for 30 min; will auto-wake on the next request |
| **Failed** | Deployment could not start - check the error message |

## Idle status and auto-wake

Managed CaseDesk deployments (Starter, Team, Advanced) scale to zero automatically when there has been no traffic for 30 minutes. The status changes to **idle**.

When a new request arrives at an idle endpoint, CaseDesk wakes the deployment automatically. The request is held open while the model loads - no retry is needed. Once the deployment reaches **running**, the response is returned.

Cold-start times from idle:

- **Starter** (Ollama): 15-30 seconds
- **Team / Advanced** (vLLM): 30-90 seconds
- **Sandbox** (Ollama on AWS ASG, includes GPU node provisioning): ~2 minutes

See [Autoscaling](/deploy-a-model/autoscaling) for more detail.

## First deploy cold-start times

- **Managed CaseDesk**: 5-10 min (cluster provisioning + image pull + model download)
- **CaseDesk Sandbox**: 10-18 min (GPU node provisioning + image pull + model download)
- **Your own cluster (warm node)**: 5-10 min (image pull + model download)

Subsequent deploys on a warm node are significantly faster as the runtime image is already cached.

## Viewing logs

From the deployment detail page, click **View Logs** to see the pod output in real time. This is the fastest way to diagnose a failed deployment.
