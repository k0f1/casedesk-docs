---
sidebar_position: 1
---

# Connect a GPU or CPU VM

Prepare a compatible runtime in a VM you control, then connect its existing
endpoint to CaseDesk. CaseDesk does not log in to your server, install a model,
or create a VM on your behalf.

## Before you connect

- Run an approved OpenAI-compatible runtime and model.
- Make its HTTPS endpoint reachable to CaseDesk.
- Record the provider, region, data boundary, and account that pays the bill.
- Keep the endpoint credential ready if it requires bearer authentication.

## Connect it

1. Sign in to CaseDesk and open **Settings**.
2. Select **Connect your infrastructure for a deployment trial**.
3. Enter a display name, runtime URL, region, data boundary, and supported
   model.
4. Submit it for endpoint, payer, and data-boundary verification.
5. Activate a connected trial only after approval.

For private networks that cannot expose an HTTPS endpoint, contact CaseDesk for
a reviewed enterprise connectivity design. Do not open infrastructure or grant
SSH access merely to start a trial.
