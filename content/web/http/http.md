---
title: "HTTP"
summary: "The request-response protocol of the web."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["HyperText Transfer Protocol", "HTTP protocol"]
prereqs: ["url"]
related: ["http-request", "http-response", "http-methods", "http-status-codes", "http-headers", "https"]
core: [backend, frontend]
---

**HTTP** is the protocol your browser and apps use to talk to web servers. It works as
**request and response**: a client asks for something, the server answers. Then the exchange
is over.

A request:

```http
GET /products/42 HTTP/1.1
Host: shop.example.com
Accept: application/json
```

and its response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"id": 42, "name": "Kettle", "price": 2999}
```

Each message has the same parts:

| Part | Request | Response |
|---|---|---|
| Start line | [method](/t/http-methods) and path (`GET /products/42`) | [status code](/t/http-status-codes) (`200 OK`) |
| [Headers](/t/http-headers) | Metadata: what I accept, who I am | Metadata: content type, caching |
| Body (optional) | Data you send (a JSON form) | The content returned |

## Key properties

- **Client-initiated.** The server doesn't speak unless asked (for push-style updates you
  need other tools such as WebSockets).
- **Stateless.** Each request stands alone; the server doesn't remember the previous one.
  Things like login rely on cookies or tokens sent with every request
  (see [session](/t/session)).
- **Plain text, in version 1.1.** HTTP/2 and HTTP/3 are more efficient on the wire but keep the
  same ideas, so what you learn here still applies.
- **Not encrypted by itself.** [HTTPS](/t/https) adds that.

## See it yourself

```sh
curl -i https://example.com
```

or open the [network tab](/t/network-tab) in your browser. Reading real requests and responses is
the fastest way to learn HTTP, and the first step when an API call "doesn't work".
