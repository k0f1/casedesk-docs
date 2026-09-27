---
sidebar_position: 4
---

# Pilot Claude Code on an Apple Silicon Mac

Put a suitable company-owned Mac to work for a focused engineering pilot.
CaseDesk guides the approved local runtime setup, client access and status;
Claude Code supplies the project tools. Start with one workflow and measure
its usefulness before planning wider team adoption.

## What has been verified

The tested configuration uses **Qwen3-4B-Instruct-2507**, vLLM Metal and a
36 GiB Apple Silicon Mac, with a reviewed 65,536-token context and **one
concurrent request**. Claude Code completed file reading, code changes and
unit tests through the production gateway. The CLI workflow also passed after
restarting the Device Agent. Agent 1.7.4 or later is required for this plan.

These checks qualify a bounded coding workflow. They do not establish capacity
for simultaneous team use, arbitrary repositories, custom hooks, external MCP
tools or full Mac reboot recovery. Each installation must pass its own checks.
The recorded small CLI workflow took about two minutes and fifteen seconds;
measure latency on your own project rather than expecting instant responses.

## Before you start

- Assign a device owner who can approve local changes and maintain the Mac.
- Use Apple Silicon with sufficient memory for the approved plan. The reference
  system has 36 GiB; the device capability check determines eligibility.
- Reserve at least 20 GiB free storage. The reviewed model download is about
  8.06 GB, with additional runtime dependencies and working space.
- Install Claude Code and have a project available for the setup check.
- Keep the Mac awake, powered and connected to outbound HTTPS during setup and use.
- Review the data path with your organisation: inference runs on the Mac, but
  prompts, tool content and responses pass through the CaseDesk gateway.
  This is not an offline or air-gapped connection.

## 1. Install and claim the Device Agent

Open the [Mac Device Agent download page](https://getcasedesk.com/downloads/device-agent/mac)
and follow its installation instructions. Confirm the offered release supports
this plan (1.7.4 or later). If it does not, contact CaseDesk before proceeding.
Updating an already claimed Mac retains its registration; do not claim it again.

For a new device, open [Dedicated Hardware](https://getcasedesk.com/connections/dedicated-hardware),
generate a claim code and enter it in the Device Agent. Keep codes private.
Claiming reports capabilities; it does not approve model installation.

## 2. Review and approve the coding plan

Review the device capability report and prepare the **Claude Code trial on
Apple Silicon** plan for `qwen3:4b-instruct-2507`. Review the download, storage,
context, concurrency and local changes before approving the exact plan.

An old 7B or 16K-context plan is not upgraded by installing a newer agent.
Use **Connect Claude Code** in the Device Agent to follow the replacement-plan
flow when prompted. Your current plan remains in effect until replacement
approval. Wait for the approved model to report ready before client setup.

## 3. Connect Claude Code to your project

1. Open **CaseDesk Device Agent → Connect Claude Code**.
2. Follow the browser flow to authorise access to the approved device and plan.
3. Generate a fresh one-time setup code and paste it into the Device Agent.
   The code expires in five minutes and cannot be reused after exchange.
4. Select your project and choose **Verify and configure**.
5. Wait for the gateway and client workflow checks. They use temporary files
   and consume trial requests. Hooks and external MCP tools are excluded.
6. After success, restart Claude Code in that project and start a new conversation.
   In VS Code, reload the window before reopening Claude Code.

Setup stores the credential in Keychain and updates `.claude/settings.local.json`
only after verification succeeds. Existing permissions are preserved and previous
settings are backed up privately. Do not replace it with a sandbox or account API
key. Client access lasts up to 24 hours; reconnect to renew it.

## 4. Verify the workflow you intend to use

Submit this once in the new Claude Code conversation:

```text
Work only inside a new temporary test directory. Create calculator.py containing
 def add(a, b): return a - b. Read the file, correct the bug, and create a unittest
covering positive, negative, and zero inputs. Run the tests and report their actual
output. Do not modify existing project files or commit anything.
```

Check the actual tool output and generated files: addition must be correct and
tests must execute successfully. A ready device or a setup success message alone
is not evidence that your intended project workflow works.

With no request in progress, restart the Device Agent background service using
its background controls. Wait for ready status, then repeat the same test with a
new temporary directory. Record the result, agent/client versions, plan and
elapsed time. Test full Mac reboot recovery separately before relying on it.

## Troubleshooting

| Symptom | Next action |
| --- | --- |
| Device online but model not ready | Keep the Mac awake; review preparation and model status. |
| Setup code rejected | Generate a fresh code; check expiry and whether it was already exchanged. |
| 400 or 401 access error | Check client access, approved plan and device status. Restart the configured client; a new account key is not a general fix. |
| 422 context exceeded | Review instructions, tools and conversation size against the approved context. Use a qualified larger plan if available; increasing response limits cannot fix oversized input. |
| 503 or long delay | Check model readiness, device connection and outstanding work. Record the time and error for support if it persists; repeated submissions can add queue pressure. |
| CLI works but VS Code fails | Verify the extension uses the configured project and approved model, then test a new conversation. |

Do not drain, revoke or restart a device while a workflow is running unless you
intend to interrupt it. Revoke client access when a pilot participant no longer
needs it. A single laptop does not provide high availability.

For a broader rollout, [talk to CaseDesk](https://getcasedesk.com/contact) about
your workload, security review, operating owner and capacity requirements.
