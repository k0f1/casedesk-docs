---
sidebar_position: 1
---

# OpenAI-Compatible API

Every CaseDesk deployment exposes an OpenAI-compatible endpoint:

```
https://getcasedesk.com/proxy/{deployment-id}/v1
```

You can use it as a drop-in replacement for the OpenAI API in any OpenAI SDK or compatible client.

:::warning Always call from your server — never from the browser
CaseDesk does not expose CORS headers. Direct browser requests will fail. Always route requests through your own backend server.
:::

## curl

```bash
curl https://getcasedesk.com/proxy/{deployment-id}/v1/chat/completions \
  -H "Content-Type: application/json" \
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
    api_key="not-needed",
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
  apiKey: 'not-needed',
});

const response = await client.chat.completions.create({
  model: 'llama3.2:3b',
  messages: [{ role: 'user', content: 'Hello!' }],
});

console.log(response.choices[0].message.content);
```

Replace `{deployment-id}` with the ID from your deployment detail page.
