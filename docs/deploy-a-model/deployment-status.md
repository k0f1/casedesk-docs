---
sidebar_position: 2
---

# Understanding Deployment Status

| Status | Meaning |
|--------|---------|
| **Pending** | Kubernetes resources created, pod starting up |
| **Pulling** | Downloading the model weights - this can take several minutes |
| **Running** | Model is loaded and the endpoint is live |
| **Recovering** | Model was unloaded (e.g. pod restart) and is being re-pulled automatically |
| **Failed** | Deployment could not start or auto-recovery failed - check the error message |

## First deploy cold-start times

- **CaseDesk Sandbox**: 10–18 min (GPU node provisioning + image pull + model download)
- **Your own cluster (warm node)**: 5–10 min (image pull + model download)

Subsequent deploys on a warm node are significantly faster as the Ollama image is already cached.

## Viewing logs

From the deployment detail page, click **View Logs** to see the pod output in real time. This is the fastest way to diagnose a failed deployment.
