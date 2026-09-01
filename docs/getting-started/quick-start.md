---
sidebar_position: 1
---

# Quick Start

CaseDesk is a private AI control plane for software teams. Start with a free
compatibility test, then connect a runtime your organisation controls for a
real production evaluation.

## 1. Try the Developer Sandbox

1. [Create an account](https://getcasedesk.com/register) or sign in.
2. Open **Connect** and select **Open Developer Sandbox**.
3. Open **Settings** to find the sandbox URL and your separate `cd_test_...`
   key.
4. Send the sample request shown on that page.

The sandbox returns a deterministic response. It proves authentication and SDK
request compatibility; it does not run a live model, allocate a GPU, or need a
payment method.

## 2. Connect production infrastructure

1. Prepare an OpenAI-compatible endpoint in your existing cloud account,
   provider account, Kubernetes cluster, or VM.
2. Open **Settings** and select **Connect your infrastructure for a deployment
   trial**.
3. Submit its URL, region, data boundary, and approved model.
4. CaseDesk verifies the payer declaration, endpoint health, and data boundary.
5. Once approved, activate the 14-day connected trial with its separate trial
   credential.

Your cloud or model provider remains the runtime payer throughout the trial.
CaseDesk does not create capacity or substitute a different runtime when the
verified connection is unavailable.

## 3. Move to paid production

Request conversion from the connected trial. The verified connection and
endpoint stay in place. Add CaseDesk credit for platform services only:

- £49/month while the first production connection is active
- £10/month for each additional active production connection
- 5% only on provider usage that CaseDesk can reliably route and meter

These charges are separate from your provider's runtime bill. See
[Choosing a connection](/deploy-a-model/choosing-a-model) for the supported
workload and commercial boundary.
