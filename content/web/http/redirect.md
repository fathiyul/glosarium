---
title: "Redirect"
summary: "Sending a client to a different URL."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["HTTP redirect", "URL redirect", "redirection"]
prereqs: ["http-3xx"]
related: ["http-3xx", "https", "open-redirect", "url", "hsts"]
---

A redirect tells the client to go to a different URL. The server responds with a 3xx status code and a `Location` header, and the browser (or HTTP client) automatically makes a new request there.

```http
GET /old-pricing HTTP/1.1

HTTP/1.1 301 Moved Permanently
Location: /pricing
```

To the user, the address bar just changes. Which status code you use matters ([3xx codes](/t/http-3xx)): 301 and 308 for permanent moves, 302 and 307 for temporary ones, and 303 after a form submission.

## Everyday reasons

- **Moved or renamed pages**, so old links and bookmarks keep working, and search engines transfer ranking.
- **HTTP to HTTPS**, and `www` to non-`www` (or the reverse) ([HTTPS](/t/https), [HSTS](/t/hsts)).
- **After login or logout**: send the user to where they were going.
- **After a form post**: redirect to a result page, so refresh doesn't resubmit.
- **Short links and tracking links.**
- **URL shorteners and campaigns.**

## Types you may see

- **Server-side** (HTTP status codes): the standard, as above.
- **Client-side**: JavaScript (`window.location = ...`), or an HTML meta refresh. They're slower and weaker for search engines.
- **Router redirects** inside single-page apps ([client-side routing](/t/client-side-routing)).

## Common problems

- **Redirect loops**: A sends to B, and B back to A. Usually conflicting HTTPS, `www` or login rules.
- **Chains** with several hops slow loading. Link straight to the final URL.
- **A cached 301** that you got wrong can stick in browsers. Test with a temporary code first.
- **Losing the request body or method** with the wrong code (302 turning a `POST` into a `GET`).
- **Open redirect vulnerability**: redirecting to a URL from `?next=` without checking lets attackers send victims to malicious sites ([open redirect](/t/open-redirect)). Allow only your own paths or a fixed list.
- **Cross-site redirects** may drop credentials or cookies.

In `curl`, use `-L` to follow redirects, and `-i` to see the `Location` header ([curl](/t/curl)).
