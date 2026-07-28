---
sidebar_position: 2
---

# Intelligent Tools

CaseDesk deployments can call built-in tools automatically — web search, URL reading, and internal knowledge lookup. When enabled, the model uses them during inference without any changes to your client code.

## How it works

When a request arrives at any of the three endpoints (OpenAI, Anthropic, or Gemini), the proxy checks whether tools are enabled. If they are, it runs an agentic loop: the model can call tools, receive results, and reason further before producing the final response. Your client sees only the final answer.

The loop runs for a maximum of 5 iterations per request.

## Enabling tools

Go to your deployment detail page → **Intelligent Tools** section. Toggle the tools you want and click **Save**.

| Toggle | Tool | Best for |
| --- | --- | --- |
| Web Search | `web_search` | Current events, updated guidelines, statistics, anything that may have changed since training |
| Web Reader | `web_reader` | When the user asks about a specific URL or document |
| Attach a bundle | `okf_lookup` | Internal policies, clinical pathways, compliance requirements — your own knowledge |

All three endpoint formats benefit from the same tools:

- `POST /proxy/{id}/v1/chat/completions` (OpenAI)
- `POST /proxy/{id}/anthropic/v1/messages` (Anthropic)
- `POST /proxy/{id}/gemini/v1beta/models/{model}:generateContent` (Gemini)

## Streaming behaviour

When tools are enabled, responses are always buffered — even if your client sends `stream: true`. The model may need several roundtrips to produce the final answer, so the proxy buffers the result before returning it. Streaming applies to the final response only when no tool calls are needed.

## MCP server

For MCP-native clients (Claude Desktop, Cursor, Continue.dev), CaseDesk ships a standalone FastMCP server at `mcp_server.py`. Run it alongside the app:

```bash
# HTTP transport (default, port 8002)
python mcp_server.py

# stdio transport — for Claude Desktop config
MCP_TRANSPORT=stdio python mcp_server.py
```

Add to your Claude Desktop `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "casedesk-tools": {
      "command": "python",
      "args": ["/path/to/byoc/mcp_server.py"],
      "env": {
        "MCP_TRANSPORT": "stdio"
      }
    }
  }
}
```

Available MCP tools: `web_search`, `web_reader`.

## Custom tools

You can register your own tools in code. They appear automatically in all three proxies and the MCP server:

```python
from app.tools.registry import register_tool

register_tool(
    name='company_lookup',
    description='Look up a company by name in the internal CRM.',
    parameters={
        'type': 'object',
        'properties': {
            'name': {'type': 'string', 'description': 'Company name to look up.'},
        },
        'required': ['name'],
    },
    fn=lambda name: crm_client.lookup(name),
)
```

Call `register_tool` at application startup (e.g. in `app/__init__.py` after `create_app`). The tool is then available to any deployment on the same instance.
