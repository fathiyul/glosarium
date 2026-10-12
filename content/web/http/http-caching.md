---
title: "HTTP Caching"
summary: "Cache-Control, ETag and Last-Modified for reusing responses."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["browser caching", "Cache-Control header", "ETag", "Last-Modified", "HTTP cache", "cache headers"]
prereqs: ["http-headers"]
related: ["cache-control", "etag", "conditional-request", "cdn-caching", "browser-cache", "http-status-codes"]
core: [backend, frontend]
also: [caching]
---

HTTP lets responses be **stored and reused**, by the browser or by shared caches such as CDNs, so repeat requests are fast or never reach your server. You control it with response headers.

## Two questions the cache answers

**1. Is my stored copy still fresh?** (`Cache-Control`, a lifetime)

```http
Cache-Control: max-age=31536000, immutable
```

For the next year, reuse the copy without asking the server at all.

**2. If it's stale, has it actually changed?** (validators: `ETag` or `Last-Modified`)

```http
# First response
ETag: "v42-9f3a"

# Later request (the browser asks "do you still have this version?")
If-None-Match: "v42-9f3a"

# Server: nothing changed, so use your copy
HTTP/1.1 304 Not Modified
```

A `304` has no body, so it saves bandwidth, though it still costs a round trip ([conditional requests](/t/conditional-request), [ETag](/t/etag)).

## The `Cache-Control` directives to know

| Directive | Meaning |
|---|---|
| `max-age=N` | Fresh for N seconds |
| `no-cache` | **Can be stored**, but must be revalidated with the server before each use (the name misleads!) |
| `no-store` | Don't store it at all: for sensitive data |
| `private` | Only the user's browser may cache it, not shared caches like CDNs |
| `public` | Shared caches may store it |
| `immutable` | Never changes, so don't revalidate |
| `stale-while-revalidate=N` | Serve a stale copy while refreshing in the background |

## A practical strategy

- **Static assets with hashed filenames** (`app.8f3a2c.js`): cache for a year with `immutable`. A new build gets a new filename, so there's nothing to invalidate
  ([asset hashing](/t/asset-hashing)).
- **HTML pages**: `no-cache` (always revalidate) or a short `max-age`, so users pick up new deploys.
- **API responses**: decide per endpoint. User-specific data is `private` (or `no-store`). Public data can use a short `max-age`.
- **Sensitive data** (account pages, tokens): `no-store`.

## Gotchas

- **Caching problems are "invisible bugs"**: a user sees an old version, and you can't reproduce it. Check the [network tab](/t/network-tab) for "(disk cache)" and the headers.
- **Without any headers**, browsers may apply heuristic caching, so set them explicitly.
- **`Vary`** tells caches which request headers change the response (`Vary: Accept-Encoding`, `Accept-Language`). Missing it can serve the wrong variant.
- **Don't cache personalized responses in a shared cache.** Use `private`.
- **You can't recall a copy** that's sitting in a browser with a long `max-age`. That's why URLs, not headers, are the way to bust caches.

See [Cache-Control](/t/cache-control) and [CDN caching](/t/cdn-caching).
