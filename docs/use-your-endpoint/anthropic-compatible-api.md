---
sidebar_position: 2
---

# Anthropic-Compatible API

Use the base URL and API key shown in **Settings**. Anthropic clients append
their own Messages API path, so use `https://getcasedesk.com` without `/v1` as
the base URL.

```python
from anthropic import Anthropic

client = Anthropic(
    base_url="https://getcasedesk.com",
    api_key="cd_live_your-key",
)

message = client.messages.create(
    model="your-approved-model",
    max_tokens=256,
    messages=[{"role": "user", "content": "Hello"}],
)
```

The requested model must be approved on a healthy customer-controlled
connection. CaseDesk does not create a runtime or provider fallback for this
request.
