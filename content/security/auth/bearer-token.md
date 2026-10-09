---
title: Bearer Token
summary: A token that grants access to whoever presents it, sent in the Authorization header.
levels: { backend: junior, frontend: junior }
related: [jwt, access-token, api-key]
---

"Bearer" means *whoever bears (holds) this token gets access*, no further proof needed.
Like cash: if someone steals it, they can spend it.

It's sent in the `Authorization` header:

```http
GET /api/orders HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

The token itself can be a [JWT](/t/jwt) or an opaque random string the server looks up.
"Bearer" describes *how it's used*, not what's inside.

## Consequences

- **Always use HTTPS**, or anyone on the network can copy the token.
- **Never put tokens in URLs** (`?token=...`). URLs end up in server logs, browser history,
  and `Referer` headers.
- **Never log the `Authorization` header.** Check what your request logging middleware
  records.
- **Keep them short-lived**, so a leaked token stops working soon.
