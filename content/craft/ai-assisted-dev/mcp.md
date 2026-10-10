---
title: "Model Context Protocol (MCP)"
summary: "A standard for connecting AI assistants to tools and data."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["MCP", "Model Context Protocol"]
prereqs: ["coding-agent"]
related: ["coding-agent", "agent-instructions-file", "context-window", "api-documentation"]
---

The Model Context Protocol (MCP) is an open standard for connecting AI assistants to external tools and data sources. A server exposes capabilities, such as reading files from a system, querying a database or calling an internal API, and a client, usually the assistant's host application, discovers and uses them through one common protocol.

```
assistant host  <--MCP-->  server exposing "search tickets" and "read document"
```

The point of a standard is reuse. A tool written as an MCP server can be used by any client that speaks the protocol, instead of being wired separately into each assistant.

The trade-off is trust and scope. Each server gives the assistant new abilities, and some of those abilities can change data or reach sensitive systems. The results a server returns also enter the model's context, so untrusted content from a server can try to steer the assistant. Treat the tools as code you're giving access to.

The classic mistake is connecting a server with broad permissions because it's convenient, then forgetting it is there. Give each server the least access it needs, read-only where possible, and review which servers are enabled for a project. Anything that writes or deletes should need explicit confirmation. The same caution applies to outside text read through tools, which can carry [prompt injection](/t/prompt-injection).
