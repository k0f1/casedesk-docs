---
sidebar_position: 1
---

# On-prem Servers (Outbound Agent)

For servers inside your network where inbound SSH is not possible - air-gapped environments, HSCN-connected trusts, corporate firewalls, or any server that cannot accept inbound connections.

The CaseDesk agent installs on your server and connects **outbound over HTTPS**. No inbound ports are required. No VPN. No firewall changes.

## How it works

1. You generate a one-time install token in CaseDesk (valid 24 hours)
2. You run a one-liner on your server
3. The agent installs itself and calls home to CaseDesk over HTTPS
4. CaseDesk marks the server as connected
5. Deploy a model the same way as any other infrastructure target

## Requirements

- A server with outbound HTTPS access (port 443) to `getcasedesk.com`
- Docker installed, or a user with permission to install it
- If using GPU: NVIDIA drivers installed on the server

## Connect a server

1. In CaseDesk, go to **Infrastructure** in the navigation
2. Click **On-prem Servers**, then **+ Add server**
3. Enter a label for the server (e.g. `nhs-gpu-1`)
4. Click **Get install token** - CaseDesk creates a pending server entry and generates a one-time token
5. Copy the install command shown on screen - it looks like:

```bash
curl -sSL https://getcasedesk.com/install | bash -s -- --token <your-token>
```

6. Run that command on your server
7. The agent installs and connects. The server status in CaseDesk changes from **Agent (pending)** to **Agent** once the connection is established.

The token is single-use and expires after 24 hours. If it expires before you run the command, delete the pending server entry and generate a new token.

## What the install script does

The install script:

1. Downloads and installs the CaseDesk agent binary
2. Registers it as a systemd service (`casedesk-agent`)
3. The agent connects outbound to CaseDesk over HTTPS and registers using the token
4. After registration, the token is invalidated

The agent process runs as a system service and restarts automatically if the server reboots.

## Security notes

- All traffic is outbound HTTPS from your server to CaseDesk - no inbound ports needed
- The install token is one-time use and expires after 24 hours
- After registration the agent authenticates with a long-lived credential stored on the server
- You can disconnect a server at any time from the Infrastructure page

## Troubleshooting

**Status stays "Agent (pending)"** - check that the install command ran successfully on the server. Verify outbound HTTPS is not blocked: `curl -v https://getcasedesk.com`. Check the agent service status: `systemctl status casedesk-agent`.

**Token expired** - delete the pending server entry in CaseDesk and repeat from step 2 to generate a fresh token.

**Deployment stays pending after agent connects** - check Docker is installed and the `casedesk-agent` service is running. Check agent logs: `journalctl -u casedesk-agent -f`.
