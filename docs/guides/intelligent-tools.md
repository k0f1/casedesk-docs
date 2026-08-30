---
sidebar_position: 2
---

# Intelligent Tools

CaseDesk can apply approved routing and tool policy to a connected production
endpoint. Tool availability depends on the workload contract and the connected
runtime; it is not enabled by creating a separate CaseDesk deployment.

## Available capabilities

- **Web search** for current information where the connected policy permits it
- **Web reader** for a specific URL or document where the connected policy
  permits it

## Requesting tools

During connection review, describe the workload and the required tool policy.
CaseDesk records that policy with the connection. An approved connection can
then use the account-level API shown in **Settings**.

CaseDesk does not route a tool-enabled request to an unapproved connection or
start separate infrastructure to satisfy it.

## MCP server

The optional CaseDesk MCP server exposes `web_search` and `web_reader` to
MCP-native clients. It is a control-plane integration and does not create a
model runtime:

```bash
python mcp_server.py
```

Configure the process with the transport and credentials appropriate to your
environment. Keep any provider or runtime credential under your own controls.
