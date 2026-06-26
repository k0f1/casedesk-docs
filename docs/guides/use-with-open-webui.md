---
sidebar_position: 4
---

# Using Open WebUI with CaseDesk

## Overview

CaseDesk deploys open-source AI models to your own infrastructure and exposes them through an OpenAI-compatible API. This allows you to use your deployed models with applications such as Open WebUI without modifying your code.

In this guide you'll learn how to connect Open WebUI to a model deployed by CaseDesk.

---

## Prerequisites

Before you begin, make sure you have:

- A model successfully deployed with CaseDesk
- An active deployment endpoint
- Open WebUI installed locally

For example, after deployment CaseDesk provides an endpoint similar to:

```text
https://getcasedesk.com/proxy/<deployment-id>/v1
```

---

## Installing Open WebUI

If you haven't installed Open WebUI yet, choose one of the following options.

**Docker (recommended):**

```bash
docker run -d \
  -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

Open `http://localhost:3000`.

**Python (pip):**

```bash
pip install open-webui
open-webui serve
```

Open `http://localhost:3000`.

---

## Step 1 - Open Open WebUI

Start Open WebUI and open:

```text
http://localhost:3000
```

:::tip
You only need to type this once. Bookmark it in your browser or install it as a desktop application from Chrome or Edge.
:::

---

## Step 2 - Open Connections

Navigate to:

**Settings** (bottom-left) **> Connections**

Locate the **OpenAI API** connection.

Click the **Settings** (gear) icon.

---

## Step 3 - Configure the OpenAI Connection

Replace the default URL with your CaseDesk deployment endpoint:

```text
https://getcasedesk.com/proxy/<deployment-id>/v1
```

Enter your **deployment ID** as the API key. CaseDesk uses the deployment ID to authenticate API clients.

| Field | Value |
| --- | --- |
| Base URL | `https://getcasedesk.com/proxy/<deployment-id>/v1` |
| API Key | `<deployment-id>` |

Leave the remaining settings unchanged.

Click **Save**.

---

## Step 4 - Disable Local Ollama (Optional)

If you only want to use models deployed by CaseDesk, you can disable the local Ollama connection.

This prevents Open WebUI from listing locally installed models.

If you still want access to local models, simply leave the Ollama connection enabled.

---

## Step 5 - Refresh Models

Open WebUI discovers available models by calling:

```text
GET /v1/models
```

If your deployment appears in the model list, the connection has been configured successfully.

If no models appear:

- Verify the deployment endpoint is correct
- Verify the deployment is running
- Verify the deployment ID is entered as the API key
- Check that your deployment status is **Running** (not Pending or Recovering)

---

## Step 6 - Start Chatting

Select your deployed model from the model selector.

Open a new chat.

Begin interacting with your model exactly as you would with ChatGPT or Claude.

---

## OpenAI Compatibility

CaseDesk exposes models through the OpenAI API specification so they work with existing AI applications.

Applications that support OpenAI-compatible APIs can connect to your deployment without modification.

CaseDesk currently provides:

- `GET /v1/models`
- `POST /v1/chat/completions`

### Other compatible tools

Any tool that supports a custom OpenAI endpoint works with CaseDesk. Examples include:

| Tool | Category |
| --- | --- |
| [Open WebUI](https://openwebui.com) | Chat interface |
| [LibreChat](https://librechat.ai) | Chat interface |
| [Continue.dev](https://continue.dev) | IDE coding assistant |
| [Cline](https://github.com/cline/cline) | IDE agent |
| [Flowise](https://flowiseai.com) | Visual LLM flow builder |
| [Langflow](https://langflow.org) | Visual LLM flow builder |
| n8n AI nodes | Workflow automation |
| Most IDE AI plugins | Various editors |

This ecosystem compatibility is a key advantage of CaseDesk. Rather than building your own chat interface, you can use the tools you already prefer while CaseDesk manages the infrastructure underneath.

---

## Accessing Open WebUI Quickly

Although Open WebUI runs locally at `http://localhost:3000`, you don't need to type the address every time.

Recommended options:

- Bookmark the page
- Install it as a Chrome or Edge application
- Keep it in your Dock or taskbar for one-click access

---

## Looking Ahead

In the future, CaseDesk may provide its own native desktop client that automatically:

- Discovers your deployments
- Lists available models
- Connects securely to your infrastructure
- Eliminates manual API configuration

This would provide a streamlined experience similar to ChatGPT Desktop or Claude Desktop while keeping your models deployed on infrastructure you control.
