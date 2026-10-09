---
title: "HTTP Response"
summary: "A status code, headers and a body."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["HTTP response message", "status line", "response headers"]
prereqs: ["http", "http-request"]
related: ["http-request", "http-status-codes", "http-headers", "content-type", "request-response-body"]
---

An HTTP response is the message a server sends back after a request. It has three parts.

```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store
Set-Cookie: session=abc123; HttpOnly

{"id": 917, "status": "paid"}
```

| Part | Example | Meaning |
|---|---|---|
| **Status line** | `HTTP/1.1 200 OK` | the protocol, a [status code](/t/http-status-codes) and a short reason |
| **Headers** | `Content-Type`, `Set-Cookie` | metadata about the response ([headers](/t/http-headers)) |
| **Body** (optional) | `{"id": 917 ...}` | the content: HTML, JSON, an image ([body](/t/request-response-body)) |

## Reading one

1. **Status code first**: did it work? The first digit says the class: 2xx success, 3xx redirect, 4xx client error, 5xx server error ([status codes](/t/http-status-codes)).
2. **`Content-Type`**: how to interpret the body ([Content-Type](/t/content-type)).
3. **Other headers**: caching rules ([HTTP caching](/t/http-caching)), cookies to store, redirects (`Location`), CORS permissions ([CORS](/t/cors)).
4. **The body**: the actual data, or an error description.

```js
const res = await fetch("/api/orders/917");
res.status;                 // 200
res.headers.get("content-type");
const data = await res.json();
```

Remember: `fetch` doesn't throw on a 404 or 500. Check `res.ok` ([fetch API](/t/fetch-api)).

## Writing good ones

- **Use the right status code**, not 200 for everything.
- **Always set `Content-Type`.**
- **Send consistent error bodies** ([error response format](/t/error-response-format)).
- **Set caching headers deliberately.**
- **Don't leak internals**: server versions, stack traces, internal IPs.
- **Add security headers** ([security headers](/t/security-headers)).

Responses answer an [HTTP request](/t/http-request). You can inspect them in the [network tab](/t/network-tab) or with `curl -i`.
