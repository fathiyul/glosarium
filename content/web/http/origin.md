---
title: "Origin"
summary: "Scheme + host + port: the browser's security boundary."
levels: { backend: mid-level, frontend: junior }
aliases: ["web origin", "same origin", "origin header"]
prereqs: ["url"]
related: ["same-origin-policy", "cors", "cookie", "url", "https"]
---

An origin is the combination of a URL's scheme, host and port. It's the unit the browser uses for its security rules.

```
https://app.example.com:443/path?q=1
└─┬─┘   └──────┬──────┘ └┬┘
scheme       host       port      → origin: https://app.example.com:443
```

The path and query are not part of the origin. Default ports (443 for `https`, 80 for `http`) are implied.

## Same origin or not

Compared with `https://app.example.com`:

| URL | Same origin? | Why |
|---|---|---|
| `https://app.example.com/other` | yes | only the path differs |
| `http://app.example.com` | no | different scheme |
| `https://api.example.com` | no | different host |
| `https://app.example.com:8443` | no | different port |

## What depends on it

- **The [same-origin policy](/t/same-origin-policy)**: a page can freely read data only from its own origin.
- **[CORS](/t/cors)**: a server explicitly allows other origins through headers.
- **Storage**: `localStorage` and IndexedDB are separate per origin ([localStorage](/t/local-storage)).
- **Cookies** use a related but different idea: site and domain rules, not origin ([cookies](/t/cookie), [SameSite](/t/samesite-cookie)).
- **`postMessage`** between windows checks origins.
- **The `Origin` request header** tells a server which origin made a cross-origin request:

```http
Origin: https://app.example.com
```

Servers use it to decide whether to allow the request, and to defend against forged requests ([CSRF](/t/csrf)).

## Practical points

- **`localhost:3000` and `localhost:8000` are different origins**, which is why local frontend and API setups hit CORS errors.
- **Don't trust the `Origin` header** from non-browser clients. It can be forged. It protects users in browsers.
- **Allow-lists** of origins should be exact, not "anything ending with example.com".
- Don't confuse origin with **site** (the registrable domain, such as `example.com`), which has a wider scope.
