---
sidebar_position: 1
---

# Use with Open WebUI

[Open WebUI](https://openwebui.com) is an open-source chat interface compatible with OpenAI-compatible APIs. You self-host Open WebUI and point it at your CaseDesk endpoint — the model inference runs through CaseDesk, the UI runs on your own machine or server.

:::info CaseDesk does not host Open WebUI for customers
Each team runs their own Open WebUI instance. The instructions below show how to connect it to your CaseDesk deployment.
:::

---

## Option 1 — Run Open WebUI locally (Docker)

The simplest way to get started. Runs on your machine in under a minute.

```bash
docker run -d \
  -p 3000:8080 \
  -e OPENAI_API_KEY=cd_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx \
  -e OPENAI_API_BASE_URL=https://getcasedesk.com/proxy/<deployment-id>/v1 \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

Replace `cd_live_xxx...` with your deployment's production API key and `<deployment-id>` with your deployment ID. Both are shown on the deployment detail page in the CaseDesk dashboard.

Then open `http://localhost:3000`. Your deployed model will appear in the model selector.

---

## Option 2 — Connect an existing Open WebUI installation

If your team already runs a shared Open WebUI instance, add your CaseDesk deployment as a connection.

**In Open WebUI:**

1. Go to **Settings > Connections**
2. Under **OpenAI API**, click the **+** icon to add a new connection
3. Set the Base URL to `https://getcasedesk.com/proxy/<deployment-id>/v1`
4. Set the API Key to your production API key (`cd_live_...`)
5. Click **Save**

Your deployed model will appear in the model selector.

---

## Endpoint reference

| Field | Value |
| --- | --- |
| Base URL | `https://getcasedesk.com/proxy/<deployment-id>/v1` |
| API Key | `cd_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |

---

## Connecting other applications

The same endpoint and API key work with any OpenAI-compatible application.

### Workflow automation

**n8n** — use the OpenAI node, set a custom base URL, and point it at your CaseDesk endpoint.

**Flowise** and **Langflow** support custom OpenAI endpoints directly in their node configuration.

### Developer tools

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

## Working with real-time information

Open-source models have a training cutoff — they do not know about events after their training data ends. If you have web search configured in your Open WebUI installation (for example via SearXNG), enable it in the chat toolbar to let the model fetch current information before answering.

For specific URLs, use the file/URL attachment feature to paste the page content directly into the conversation context.
