---
sidebar_position: 2
---

# Anthropic-Compatible API

Every CaseDesk deployment exposes an Anthropic Messages API-compatible endpoint:

```text
https://getcasedesk.com/proxy/{deployment-id}/anthropic/v1/messages
```

You can use it as a drop-in replacement for the Anthropic API by overriding the base URL in the official SDK.

:::warning Always call from your server — never from the browser
CaseDesk does not expose CORS headers. Direct browser requests will fail. Always route requests through your own backend server.
:::

## API key

Every deployment has a production API key in `cd_live_...` format. Find it on the deployment detail page. Pass it as the `x-api-key` header (the standard Anthropic auth header):

```http
x-api-key: cd_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## curl

```bash
curl https://getcasedesk.com/proxy/{deployment-id}/anthropic/v1/messages \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -H "x-api-key: cd_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
  -d '{
    "model": "llama3.1:8b",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Explain quantum entanglement in simple terms."}]
  }'
```

The `anthropic-version: 2023-06-01` header is required — it matches the version expected by the Anthropic Messages API format.

## Python

Install the SDK if you haven't already:

```bash
pip install anthropic
```

```python
import anthropic

client = anthropic.Anthropic(
    base_url="https://getcasedesk.com/proxy/{deployment-id}/anthropic",
    api_key="cd_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
)

message = client.messages.create(
    model="llama3.1:8b",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Explain quantum entanglement in simple terms."}
    ],
)
print(message.content[0].text)
```

## Node.js (server-side only)

Install the SDK if you haven't already:

```bash
npm install @anthropic-ai/sdk
```

```javascript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  baseURL: 'https://getcasedesk.com/proxy/{deployment-id}/anthropic',
  apiKey: 'cd_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
});

const message = await client.messages.create({
  model: 'llama3.1:8b',
  max_tokens: 1024,
  messages: [
    { role: 'user', content: 'Explain quantum entanglement in simple terms.' },
  ],
});

console.log(message.content[0].text);
```

## Supported request fields

The endpoint accepts the standard Anthropic Messages API request body:

| Field | Required | Notes |
|---|---|---|
| `model` | Yes | The model tag from your deployment (e.g. `llama3.1:8b`, `deepseek-r1:14b`) |
| `messages` | Yes | Array of `{role, content}` objects |
| `max_tokens` | Yes | Maximum tokens to generate |
| `system` | No | System prompt string |
| `temperature` | No | Sampling temperature (0–1) |
| `stream` | No | Set to `true` for server-sent events streaming |

Replace `{deployment-id}` with the ID shown on your deployment detail page, and `cd_live_xxx...` with your deployment's production API key.
