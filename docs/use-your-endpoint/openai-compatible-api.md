---
sidebar_position: 1
---

# OpenAI-Compatible API

Every CaseDesk deployment exposes an OpenAI-compatible endpoint:

```text
https://getcasedesk.com/proxy/{deployment-id}/v1
```

You can use it as a drop-in replacement for the OpenAI API in any OpenAI SDK or compatible client.

:::warning Always call from your server — never from the browser
CaseDesk does not expose CORS headers. Direct browser requests will fail. Always route requests through your own backend server.
:::

## API key

Every deployment has a production API key in `cd_live_...` format. Find it on the deployment detail page — click **Show key** next to the endpoint URL. You can regenerate it at any time from the same page.

Pass it as a Bearer token in all API calls:

```http
Authorization: Bearer cd_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## curl

```bash
curl https://getcasedesk.com/proxy/{deployment-id}/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer cd_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
  -d '{
    "model": "llama3.2:3b",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

## Python

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://getcasedesk.com/proxy/{deployment-id}/v1",
    api_key="cd_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
)

response = client.chat.completions.create(
    model="llama3.2:3b",
    messages=[{"role": "user", "content": "Hello!"}],
)
print(response.choices[0].message.content)
```

## Node.js (server-side only)

```javascript
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://getcasedesk.com/proxy/{deployment-id}/v1',
  apiKey: 'cd_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
});

const response = await client.chat.completions.create({
  model: 'llama3.2:3b',
  messages: [{ role: 'user', content: 'Hello!' }],
});

console.log(response.choices[0].message.content);
```

Replace `{deployment-id}` with the ID from your deployment detail page, and `cd_live_xxx...` with your deployment's production API key.
