---
sidebar_position: 4
---

# Routing Pool (Multiple Models, One Endpoint)

A routing pool lets you serve multiple models through a single endpoint URL. The `model` field in your API request selects which model handles it — no URL change required.

## How it works

When you already have a deployment (for example, a Sandbox deployment running `llama3.2:3b`) and you deploy a second model, CaseDesk gives you the option to add it to the existing deployment's routing pool instead of creating a separate endpoint.

Once added to the pool:

- The endpoint URL stays the same
- Both models are available behind that URL
- The `model` field in each request determines which deployment handles it

```bash
# Request routed to llama3.2:3b
curl https://getcasedesk.com/proxy/{deployment-id}/v1/chat/completions \
  -H "Authorization: Bearer cd_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
  -d '{"model": "llama3.2:3b", "messages": [...]}'

# Request routed to deepseek-r1:7b (second model in the pool)
curl https://getcasedesk.com/proxy/{deployment-id}/v1/chat/completions \
  -H "Authorization: Bearer cd_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
  -d '{"model": "deepseek-r1:7b", "messages": [...]}'
```

The `{deployment-id}` and API key are the same for both requests.

## Adding a model to an existing pool

1. Go to **Models** and click **Deploy Model**
2. Choose your model from the catalogue
3. On the deployment configuration screen, select your existing deployment under **Add to existing endpoint**
4. Click **Deploy**

CaseDesk adds the new model to the pool. The endpoint URL does not change.

## Use case

The routing pool is useful when you want to give your application access to multiple models — for example, a fast small model for simple queries and a larger model for complex reasoning — without managing multiple endpoint URLs or API keys.

## Notes

- Each model in the pool is a separate deployment with its own pod and resources
- Scale-to-zero applies per deployment; a model can be idle while others in the pool are running
- The pool is identified by the original deployment's ID and API key
