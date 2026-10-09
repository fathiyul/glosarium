---
title: Cookie
summary: A small piece of data the server asks the browser to store and send back automatically on later requests.
levels: { backend: junior, frontend: junior }
related: [session, csrf, samesite-cookie]
core: [frontend]
also: [http, browsers]
---

The server sets a cookie with a response header:

```http
Set-Cookie: session_id=k3j2...9x; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=86400
```

From then on the browser attaches it to every matching request:

```http
Cookie: session_id=k3j2...9x
```

That automatic sending is what makes [sessions](/t/session) work, and also what makes
[CSRF](/t/csrf) possible.

## Attributes that matter for auth

| Attribute | What it does | Use it? |
|---|---|---|
| `HttpOnly` | JavaScript can't read the cookie, so an XSS bug can't steal it | Always, for auth cookies |
| `Secure` | Only sent over HTTPS | Always in production |
| `SameSite` | Limits sending on cross-site requests ([details](/t/samesite-cookie)) | `Lax` is a good default |
| `Max-Age` / `Expires` | When it expires; without it, it's deleted when the browser closes | Set deliberately |
| `Domain` / `Path` | Which URLs receive it | Keep as narrow as possible |

A login cookie without `HttpOnly` and `Secure` is one of the most common findings in
security reviews.
