---
sidebar_position: 3
---

# Dedicated Hardware

Use infrastructure your organisation owns for a governed private AI connection.
For engineering teams with suitable Apple Silicon Macs, start with a focused
[Claude Code coding pilot](./mac-coding-pilot.md) before expanding adoption.

CaseDesk guides setup, owner approval, client access and status. Your organisation
retains the hardware, local runtime, model storage and operating costs. The agent
uses an authenticated outbound connection; the local runtime needs no public IP,
inbound firewall rule or Kubernetes installation.

## Choose a supported workflow

The verified Mac coding path uses **Qwen3 4B with vLLM Metal**, a reviewed
65,536-token context and one concurrent request. It replaces the earlier Mac
7B recommendation. The reference machine has 36 GiB of memory. Each device must
pass capability checks and each client installation must pass workflow checks.

Follow the [Mac coding pilot guide](./mac-coding-pilot.md) for prerequisites,
installation, plan approval, Claude Code setup and troubleshooting. Installing
an updated agent does not change an existing approved runtime plan automatically.

Linux NVIDIA workstations and servers require their own supported runtime
profile and qualification. The Mac installer does not install a Linux runtime,
and Mac workflow evidence does not establish Linux or multi-user capacity.
Contact CaseDesk to review that hardware and workload before a rollout.

## Connect a device

1. Open [Dedicated Hardware](https://getcasedesk.com/connections/dedicated-hardware).
2. For a new device, generate a one-time claim code and enter it in the installed
   Device Agent. Keep the code private. Already claimed devices retain registration.
3. Review the read-only capability report. Claiming does not approve installation.
4. Prepare a supported plan and review its model, local changes and operating limits.
5. Approve the exact plan. The agent can then retrieve that signed configuration,
   prepare the approved runtime and verify the model.
6. Wait for ready status, then authorise and verify the intended client workflow.

## Operate the pilot

The device view distinguishes an online agent from a ready model and reports
maintenance or unavailable states. Keep the Mac awake, powered and connected.
Use background controls for planned maintenance and revoke access when needed.

Measure quality, response time and availability on representative work. Verify
recovery after restarting the agent, and test full host reboot recovery separately.
A single workstation is not high availability. Simultaneous team use, larger
repositories and customised client tools require separate validation.

## Review the data and operating boundary

Inference runs on your hardware. Client requests, including supplied project and
tool content, and model responses pass through the CaseDesk gateway. This is not
an offline or air-gapped service; include the gateway in your security review.
CaseDesk does not silently route unavailable work to unapproved hardware.

Your organisation remains responsible for physical security, OS maintenance,
power, networking, available capacity and the people authorised to use the device.
For an enterprise pilot, [contact CaseDesk](https://getcasedesk.com/contact) to
review the workflow, data path, operating owner and acceptance criteria.
