---
sidebar_position: 2
---

# Deployment Stuck on Pending

If a deployment stays on **pending** for more than 20 minutes, check the logs from the deployment detail page.

## Common causes

- **No GPU node available** — the cluster has no node with a GPU. Ensure your node group has a GPU instance type (e.g. `g4dn.xlarge`)
- **Image pull failure** — the node can't reach the Ollama container registry. Check network policies
- **Insufficient resources** — the node doesn't have enough free VRAM. Try a smaller model

## View logs

From the deployment detail page click **View Logs**. Look for errors in the init container (model pull) or main container (Ollama startup).
