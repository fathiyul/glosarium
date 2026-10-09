---
title: "HTTP Headers"
summary: "Metadata attached to requests and responses."
levels: { backend: junior, frontend: junior }
aliases: ["headers", "request headers", "response headers", "header fields"]
prereqs: ["http"]
related: ["http-request", "http-response", "content-type", "cache-control", "cors", "user-agent"]
core: [backend]
---

**HTTP headers** are key-value lines of metadata sent with every request and response. They
describe the message itself rather than carrying the data: who's asking, what format, how long to cache.

```http
POST /orders HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOi...
Accept: application/json
```

## Headers you'll meet constantly

| Header | Direction | Purpose |
|---|---|---|
| `Content-Type` | both | Format of the body (`application/json`) |
| `Accept` | request | Formats the client can handle |
| `Authorization` | request | Credentials, such as a bearer token |
| `Cookie` / `Set-Cookie` | request / response | Send and store cookies |
| `Cache-Control` | both | Caching rules ([cache-control](/t/cache-control)) |
| `Location` | response | Where to go next (redirects, new resources) |
| `User-Agent` | request | Which client is making the request |
| `Access-Control-Allow-Origin` | response | Cross-origin permission ([CORS](/t/cors)) |

## Points to remember

- Header **names are case-insensitive** (`content-type` equals `Content-Type`). Values often aren't.
- **A wrong `Content-Type` is a common bug**: sending JSON without
  `Content-Type: application/json` makes many servers ignore or reject the body.
- **Put credentials in headers, not in the URL.** URLs end up in logs, history and
  referrer headers.
- **Don't trust client headers** for security decisions (`User-Agent`, `X-Forwarded-For`
  can be faked unless a trusted proxy sets them).
- Headers can contain secrets. Be careful when you share a copied request or a screenshot of
  the [network tab](/t/network-tab).

A custom header is allowed for your own metadata, such as a request ID (`X-Request-Id`)
that helps trace a request through logs.
