---
sidebar_position: 2
---

# Deployment Stuck on Pending

If a deployment stays on **pending** for more than 20 minutes, check the logs from the deployment detail page.

## Common causes

- **GPU node provisioning** — Sandbox deployments provision a GPU node on demand. First-time provisioning can take up to 18 minutes. If still pending after 20 minutes, contact support.
- **Model download in progress** — Large models (70B+) take longer to pull. Check the logs for download progress messages.
- **Deployment failed silently** — The status may not update correctly if the pod errored during startup. Click **View Logs** to see the actual pod output.

## View logs

From the deployment detail page click **View Logs**. Look for errors in the init container (model pull) or main container startup.

## Still stuck?

If the deployment has been pending for more than 30 minutes with no activity in the logs, delete it and redeploy. If the issue recurs, [contact support](mailto:support@getcasedesk.com) with your deployment ID.
