---
title: "HTTP Request"
summary: "A method, URL, headers and an optional body."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["HTTP request message", "request line", "request headers"]
prereqs: ["http"]
related: ["http-response", "http-methods", "http-headers", "url", "request-response-body"]
---

An HTTP request is the message a client sends to a server. It has four parts.

```http
POST /orders?source=web HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOi...
Accept: application/json

{"item_id": 7, "quantity": 2}
```

| Part | Example | Meaning |
|---|---|---|
| **Request line** | `POST /orders?source=web HTTP/1.1` | the [method](/t/http-methods), the path and query, and the protocol version |
| **Headers** | `Host`, `Content-Type`, `Authorization` | metadata about the request ([headers](/t/http-headers)) |
| **Blank line** | | separates headers from the body |
| **Body** (optional) | `{"item_id": 7 ...}` | data being sent ([body](/t/request-response-body)) |

The full address comes from the `Host` header plus the path (and the scheme and port you connected with) ([URLs](/t/url)).

## What each part is for

- **Method**: what to do (`GET` read, `POST` create...).
- **Path**: which resource (`/orders/917`).
- **Query string**: optional parameters, such as filters and paging ([query strings](/t/query-string)).
- **Headers**: who you are, what you send and accept, caching hints, cookies.
- **Body**: the payload for `POST`, `PUT` and `PATCH`.

## Seeing real requests

```sh
curl -v https://example.com          # shows the request it sends
```

The [network tab](/t/network-tab) in browser DevTools lists every request, with headers and bodies.

## Points to remember

- A `GET` normally has no body.
- Header names are case-insensitive.
- Cookies travel in the `Cookie` header.
- Everything in a request is controlled by the client, so the server must validate it ([never trust the client](/t/never-trust-the-client)).
- HTTP/2 and HTTP/3 carry the same information in a binary form.

The reply is an [HTTP response](/t/http-response).
