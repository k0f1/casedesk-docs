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

For AWS, start with the guided connection rather than collecting endpoint
details yourself:

1. Open **Connections** and select **AWS guided deployment**.
2. CaseDesk opens AWS CloudFormation in a separate tab. Keep the CaseDesk tab
   open so it can show the verification result.
3. In AWS, review the prefilled template, acknowledge creation of the named IAM
   role, and select **Create stack**.
4. The one-time stack creates only a read-only discovery role. It does not
   create a cluster, VM, GPU, model, endpoint, or runtime capacity.
5. Return to CaseDesk. It verifies that the role belongs to your AWS account
   before read-only cluster and GPU-VM discovery can begin.

Use **I already have a vLLM endpoint** only when your technical team already
operates an OpenAI-compatible runtime and wants CaseDesk to verify that endpoint.
See [Connect AWS infrastructure](/connect-your-cluster/aws/guided-discovery)
for the permissions, acknowledgement, and expected AWS outcomes.

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
