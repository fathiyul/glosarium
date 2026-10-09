---
title: "HTTP Client Tools"
summary: "curl, HTTPie, Postman or Bruno for calling APIs by hand."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["Postman", "Insomnia", "HTTPie", "Bruno", "API client"]
prereqs: ["http", "curl"]
related: ["curl", "api-testing", "openapi", "rest", "network-tab"]
---

When you work with APIs, you often want to send a request by hand and look at the response. Several tools do that, from the command line to visual apps.

| Tool | Style | Good for |
|---|---|---|
| [curl](/t/curl) | command line | quick checks, scripts, anywhere there's a terminal |
| HTTPie | command line, friendlier syntax and colored output | readable one-off requests |
| Postman, Insomnia, Bruno | graphical apps | saving requests in collections, environments, auth helpers, team sharing |
| Editor extensions (REST Client for VS Code, JetBrains HTTP client) | plain `.http` files in your editor | requests that live in the repository next to the code |
| Browser DevTools | built in | replaying what the page sent ([network tab](/t/network-tab)) |

```http
### Create an order
POST {{baseUrl}}/orders
Authorization: Bearer {{token}}
Content-Type: application/json

{ "item_id": 7, "quantity": 2 }
```

## What to look for in a tool

- **Environments and variables** for dev, staging and production, so you don't edit URLs by hand.
- **Saved collections** that others can use.
- **Auth support** (bearer tokens, OAuth).
- **Import from [OpenAPI](/t/openapi)** specs.
- **Scripting and tests** on responses, and running a collection in CI.
- **Where data is stored**: some tools sync collections to the cloud.

## Habits

- **Never commit real tokens or passwords** in saved requests. Use environment variables and keep secrets out of shared collections ([secrets in Git](/t/secrets-in-git)).
- **Be careful with production.** A saved `DELETE` request is one click from disaster.
- **Keep requests in version control** where you can (text files, or exported collections).
- **Use them to explore and debug**, but write automated tests for anything important ([API testing](/t/api-testing)).

The best tool is the one your team will actually share and keep current.
