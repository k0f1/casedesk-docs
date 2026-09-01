---
sidebar_position: 2
---

# How It Works

CaseDesk helps a software team move from a clear use case to a governed API
connection without making CaseDesk the payer for runtime capacity.

## Developer Sandbox

1. Create an account.
2. Open the Developer Sandbox from the connection flow.
3. Use the separate test URL and `cd_test_...` credential from Settings.
4. Confirm that your SDK can authenticate and send a compatible request.

The response is deterministic, so the sandbox proves integration rather than
model quality or GPU performance.

## Connected Trial

1. Select a runtime already controlled by your organisation or provider.
2. Submit its OpenAI-compatible endpoint, region, data boundary, and model.
3. CaseDesk verifies the endpoint and records that your organisation is the
   runtime payer.
4. Activate the approved 14-day trial.
5. Route trial traffic only to that verified endpoint.

CaseDesk never provisions a cluster, reserves a GPU, or chooses a different
provider as a trial fallback.

## Connected Production

After a trial, request commercial approval. The existing verified endpoint is
kept in place. Add prepaid CaseDesk credit for the control-plane service while
your cloud or model provider bills runtime use directly.

For integration examples, see [Use Your Endpoint](/use-your-endpoint/openai-compatible-api).
