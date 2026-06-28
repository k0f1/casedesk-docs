---
sidebar_position: 4
---

# Chat Interfaces and Integrations

## Overview

CaseDesk deploys open-source AI models to your own infrastructure and exposes them through an OpenAI-compatible API. Once your model is running, you can connect any OpenAI-compatible application to it - a chat interface, a workflow tool, a customer service bot, or your own application.

This guide covers your options, starting with the simplest.

---

## Option 1 - CaseDesk Chat (Recommended)

CaseDesk Chat is an optional hosted workspace add-on. One workspace per organization - all your employees share it. No installation required.

**To open your workspace:**

1. Go to any deployment page
2. Click the **Chat clients** tab
3. Click **Open CaseDesk Chat**

If your organization has the Chat Workspace add-on, clicking this button provisions your workspace automatically on first use (takes 2-3 minutes), then opens it instantly every time after. Your deployed model is connected automatically - no API keys to copy.

**What you get:**
- A persistent chat interface at `https://<your-subdomain>.chat.getcasedesk.com`
- Your deployment endpoints synced automatically as connections
- Your whole team shares one workspace - invite employees directly inside Open WebUI
- Conversation history, file uploads, and model switching built in

No Docker, no configuration, no manual setup.

:::info Add-on pricing
CaseDesk Chat is a standalone add-on priced by organization size:

| Tier | Employees | Price |
| --- | --- | --- |
| Starter | Up to 25 | £49/month |
| Team | Up to 100 | £99/month |
| Business | Up to 500 | £199/month |
| Enterprise | 500+ | Custom |

Contact [sales@getcasedesk.com](mailto:sales@getcasedesk.com) to add it to your account.
:::

---

## Option 2 - Run Open WebUI Locally

If you prefer to run Open WebUI on your own machine or server, your deployment page provides a pre-configured Docker command.

**To get your Docker command:**

1. Go to your deployment page
2. Click the **Chat clients** tab
3. Copy the command from the **Self-host Open WebUI** section

The command looks like this:

```bash
docker run -d \
  -p 3000:8080 \
  -e OPENAI_API_KEY=<your-deployment-id> \
  -e OPENAI_API_BASE_URL=https://getcasedesk.com/proxy/<your-deployment-id>/v1 \
  ghcr.io/open-webui/open-webui:main
```

Your API key and endpoint URL are already filled in. Run it, then open `http://localhost:3000`.

**When to use this option:**
- You are on the Free plan
- You want Open WebUI on a specific machine or internal server
- You have data residency requirements that prevent using a hosted service
- You are already running Open WebUI and want to add a CaseDesk deployment as a connection

---

## Option 3 - Connect an Existing Open WebUI Installation

If your team already runs Open WebUI as a shared service, you can add your CaseDesk deployment as a connection without reinstalling anything.

**In Open WebUI:**

1. Go to **Settings > Connections**
2. Under **OpenAI API**, click the gear icon
3. Set the Base URL to your CaseDesk endpoint:

```text
https://getcasedesk.com/proxy/<deployment-id>/v1
```

4. Set the API Key to your deployment ID
5. Click **Save**

Your deployed model will appear in the model selector.

Your deployed model will appear in the model selector. To keep connections in sync automatically as you add new deployments, consider the CaseDesk Chat add-on (Option 1).

---

## Connecting Other Applications

Your CaseDesk endpoint works with any application that supports a custom OpenAI-compatible API. The endpoint and API key are the same in every case:

| Field | Value |
| --- | --- |
| Base URL | `https://getcasedesk.com/proxy/<deployment-id>/v1` |
| API Key | `<deployment-id>` |

### Workflow Automation

**n8n** - Use the OpenAI node in n8n, set a custom base URL, and point it at your CaseDesk endpoint. Your deployed model can then power any n8n AI workflow: document summarisation, email triage, data extraction, and more.

**Flowise** and **Langflow** support custom OpenAI endpoints directly in their node configuration. Use them to build RAG pipelines, multi-step agents, and visual LLM flows on top of your deployed models.

### Customer Service and Support Bots

Any customer service platform with AI capabilities that supports a custom OpenAI endpoint can route requests through your CaseDesk deployment instead of a commercial API. This keeps conversation data within your infrastructure and removes per-token costs to third-party providers.

Tools that work this way include **Botpress** (custom LLM provider), **Chatwoot** (AI assist feature), and any custom chatbot built on the OpenAI SDK.

### Developer Tools

| Tool | Use case |
| --- | --- |
| [Continue.dev](https://continue.dev) | IDE coding assistant |
| [Cline](https://github.com/cline/cline) | IDE agent |
| [LibreChat](https://librechat.ai) | Chat interface with RAG |
| [Flowise](https://flowiseai.com) | Visual LLM flow builder |
| [Langflow](https://langflow.org) | Visual LLM flow builder |
| n8n AI nodes | Workflow automation |
| OpenAI Python / JS SDK | Custom applications |

Any tool that accepts a custom `base_url` and `api_key` works with CaseDesk out of the box.

---

## Summary

| Option | Setup | Best for |
| --- | --- | --- |
| CaseDesk Chat (managed) | None - one click provisions it | Organizations with the Chat Workspace add-on |
| Local Docker | One command | Self-hosted control, no add-on needed |
| Connect existing | Paste URL + key in settings | Teams already running Open WebUI |
| Other tools (n8n, chatbots, etc.) | Set custom base URL | Automation, customer service, custom apps |
