---
sidebar_position: 1
---

# OpenAI-Compatible API

Use the account-level base URL and credentials displayed in **Settings**. Do
not add a deployment ID to the URL. CaseDesk selects the approved connection
from the requested model and service policy.

## Production request

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://getcasedesk.com/v1",
    api_key="cd_live_your-key",
)

response = client.chat.completions.create(
    model="your-approved-model",
    messages=[{"role": "user", "content": "Hello"}],
)
```

Use a `cd_test_...` key and the sandbox URL shown in Settings for deterministic
integration testing. A sandbox response is not live model output.

For production, CaseDesk routes only to a verified customer-controlled
connection. If it is unhealthy, expired, unapproved, or paused for billing,
the request fails clearly rather than falling back to another provider.
