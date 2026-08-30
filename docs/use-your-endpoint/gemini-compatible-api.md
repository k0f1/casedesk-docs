---
sidebar_position: 3
---

# Gemini-Compatible API

Use the account-level endpoint and key shown in **Settings**. Gemini clients
append their own versioned model path, so use `https://getcasedesk.com` as the
base endpoint.

```python
import google.generativeai as genai

genai.configure(
    api_key="cd_live_your-key",
    client_options={"api_endpoint": "https://getcasedesk.com"},
)
```

Select a model that is approved for the connected production endpoint. For a
free compatibility test, use the separate sandbox URL and `cd_test_...` key
shown in Settings; it returns deterministic output only.
