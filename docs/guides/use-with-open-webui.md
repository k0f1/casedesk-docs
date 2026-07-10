---
sidebar_position: 4
---

# Use with Open WebUI

Open WebUI is an open-source chat interface compatible with OpenAI-compatible APIs. You self-host Open WebUI and point it at your CaseDesk endpoint. CaseDesk does not host Open WebUI.

---

## Option 1 - Run Open WebUI locally (Docker)

The simplest way to get started is to run Open WebUI on your own machine.

```bash
docker run -d \
  -p 3000:8080 \
  -e OPENAI_API_KEY=<your-deployment-id> \
  -e OPENAI_API_BASE_URL=https://getcasedesk.com/proxy/<your-deployment-id>/v1 \
  ghcr.io/open-webui/open-webui:main
```

Replace `<your-deployment-id>` with your deployment ID from the CaseDesk dashboard.

Then open `http://localhost:3000`.

Your deployed model will appear in the model selector.

---

## Option 2 - Connect an existing Open WebUI installation

If your team already runs Open WebUI as a shared service, add your CaseDesk deployment as a connection.

**In Open WebUI:**

1. Go to **Settings > Connections**
2. Under **OpenAI API**, click the gear icon
3. Set the Base URL to your CaseDesk endpoint (`https://getcasedesk.com/proxy/<deployment-id>/v1`)
4. Set the API Key to your deployment ID
5. Click **Save**

Your deployed model will appear in the model selector.

---

## Endpoint reference

| Field | Value |
| --- | --- |
| Base URL | `https://getcasedesk.com/proxy/<deployment-id>/v1` |
| API Key | `<deployment-id>` |

The deployment ID is shown on the deployment detail page in the CaseDesk dashboard.

---

## Connecting other applications

The same endpoint and API key work with any OpenAI-compatible application.

### Workflow automation

**n8n** - use the OpenAI node, set a custom base URL, and point it at your CaseDesk endpoint.

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

Open-source models have a training cutoff - they do not know about events or publications after their training data ends. When you ask a model about something recent or specific, it may answer from outdated training data rather than admitting it does not know.

If you have web search configured in your Open WebUI installation (for example via SearXNG), enable it in the chat toolbar to let the model fetch current information before answering.

For specific URLs, use the file/URL attachment feature to paste the page content directly into the conversation context.
