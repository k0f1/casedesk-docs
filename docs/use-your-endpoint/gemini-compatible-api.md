---
sidebar_position: 3
---

# Gemini-Compatible API

Every CaseDesk deployment exposes a Gemini-compatible endpoint following the Google `generativelanguage` REST API format:

```
https://getcasedesk.com/proxy/{deployment-id}/gemini/v1beta/models/{model}:generateContent
```

For streaming responses, use the `:streamGenerateContent` action:

```
https://getcasedesk.com/proxy/{deployment-id}/gemini/v1beta/models/{model}:streamGenerateContent
```

Replace `{model}` with the model tag from your deployment (e.g. `gemma2:9b`, `llama3.1:8b`).

:::warning Always call from your server — never from the browser
CaseDesk does not expose CORS headers. Direct browser requests will fail. Always route requests through your own backend server.
:::

## curl

```bash
curl "https://getcasedesk.com/proxy/{deployment-id}/gemini/v1beta/models/gemma2:9b:generateContent" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [
      {
        "role": "user",
        "parts": [{"text": "What are the main benefits of running models on your own infrastructure?"}]
      }
    ],
    "generationConfig": {
      "temperature": 0.7,
      "maxOutputTokens": 1024
    }
  }'
```

For streaming:

```bash
curl "https://getcasedesk.com/proxy/{deployment-id}/gemini/v1beta/models/gemma2:9b:streamGenerateContent" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [
      {
        "role": "user",
        "parts": [{"text": "What are the main benefits of running models on your own infrastructure?"}]
      }
    ]
  }'
```

## Python

You can use the `google-generativeai` SDK by pointing it at your CaseDesk proxy, or use `requests` directly for full control.

### Using `requests` (recommended for custom endpoints)

```python
import requests

deployment_id = "{deployment-id}"
model = "gemma2:9b"
base_url = f"https://getcasedesk.com/proxy/{deployment_id}/gemini/v1beta"

payload = {
    "contents": [
        {
            "role": "user",
            "parts": [{"text": "What are the main benefits of running models on your own infrastructure?"}],
        }
    ],
    "generationConfig": {
        "temperature": 0.7,
        "maxOutputTokens": 1024,
    },
}

response = requests.post(
    f"{base_url}/models/{model}:generateContent",
    json=payload,
)
response.raise_for_status()

data = response.json()
print(data["candidates"][0]["content"]["parts"][0]["text"])
```

### Using `google-generativeai` SDK with a custom transport

Install the SDK:

```bash
pip install google-generativeai
```

```python
import google.generativeai as genai

genai.configure(
    api_key="not-needed",
    transport="rest",
    client_options={
        "api_endpoint": "https://getcasedesk.com/proxy/{deployment-id}/gemini",
    },
)

model = genai.GenerativeModel("gemma2:9b")
response = model.generate_content(
    "What are the main benefits of running models on your own infrastructure?"
)
print(response.text)
```

## Node.js (server-side only)

### Using `node-fetch` or the built-in `fetch`

```javascript
const deploymentId = '{deployment-id}';
const model = 'gemma2:9b';
const baseUrl = `https://getcasedesk.com/proxy/${deploymentId}/gemini/v1beta`;

const payload = {
  contents: [
    {
      role: 'user',
      parts: [{ text: 'What are the main benefits of running models on your own infrastructure?' }],
    },
  ],
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 1024,
  },
};

const response = await fetch(
  `${baseUrl}/models/${model}:generateContent`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }
);

const data = await response.json();
console.log(data.candidates[0].content.parts[0].text);
```

### Streaming with `streamGenerateContent`

```javascript
const response = await fetch(
  `${baseUrl}/models/${model}:streamGenerateContent`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: payload.contents }),
  }
);

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  process.stdout.write(decoder.decode(value));
}
```

## Request body reference

| Field | Notes |
|---|---|
| `contents` | Array of `{role, parts}` objects. `role` is `"user"` or `"model"`. |
| `contents[].parts` | Array of `{text}` objects. |
| `generationConfig.temperature` | Sampling temperature (0–1). |
| `generationConfig.maxOutputTokens` | Maximum tokens to generate. |
| `generationConfig.topP` | Nucleus sampling threshold. |
| `systemInstruction` | Optional system prompt: `{"parts": [{"text": "..."}]}` |

Replace `{deployment-id}` with the ID shown on your deployment detail page.
