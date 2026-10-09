---
title: "CORS"
summary: "Cross-Origin Resource Sharing: how a server lets browsers call it from other origins."
levels: { backend: mid-level, frontend: junior }
aliases: ["Cross-Origin Resource Sharing", "cross-origin requests", "CORS error"]
prereqs: ["origin", "same-origin-policy", "http-headers"]
related: ["same-origin-policy", "preflight-request", "origin", "http-headers", "network-tab", "http-methods"]
core: [backend, frontend]
also: [web-security]
---

**CORS** is how a server tells the *browser* which other websites are allowed to call it. Without
it, the browser blocks a page from reading responses from a different **origin** (scheme + host
+ port) than its own. That default protection is the [same-origin policy](/t/same-origin-policy).

You meet it as this console error:

```
Access to fetch at 'https://api.example.com/orders' from origin 'https://app.example.com'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present.
```

## How it works

Your frontend at `https://app.example.com` calls an API at `https://api.example.com`. Those are
different origins, so the browser asks the API for permission through headers:

```
Access-Control-Allow-Origin: https://app.example.com
```

If the response allows your origin, the browser lets your code read it. If not, it hides the
response from your JavaScript.

## Preflight

For "non-simple" requests (such as a `PUT`/`DELETE`, a JSON `Content-Type`, or a custom header
such as `Authorization`) the browser first sends an `OPTIONS` request, a
[preflight](/t/preflight-request), asking what's allowed:

```
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

Only if that answer is OK does it send the real request.

## Things people get wrong

- **CORS is enforced by the browser, not the server.** `curl` or Postman never hits it. The
  server did respond; the browser refused to *show* it. So "it works in Postman" tells you
  nothing.
- **The fix is on the server** (the API), not in frontend code. Adding headers to your
  `fetch` call won't help.
- **`Access-Control-Allow-Origin: *`** allows any site, but can't be combined with cookies or
  credentials. For credentialed requests, name the exact origin and send
  `Access-Control-Allow-Credentials: true`.
- **Don't echo back whatever origin was sent** without checking it against an allow-list.
- **Errors in the server can look like CORS errors**: a 500 response without CORS headers is
  reported as a CORS failure. Check the [network tab](/t/network-tab).

During development, a dev-server proxy avoids cross-origin calls. CORS also doesn't protect your
API from non-browser clients, so keep authentication in place.
