---
title: "Content Negotiation"
summary: "Client and server agreeing on format and language through Accept headers."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["content negotiation", "accept headers", "conneg"]
prereqs: ["http", "mime-type"]
related: ["compression", "etag", "api-versioning"]
---

**Content negotiation** is how an HTTP client and server agree on *which representation* of a resource to exchange: what format (`Accept: application/json`), language (`Accept-Language: fr`), or encoding (`Accept-Encoding: gzip`). The server picks the best match it supports and says what it chose (`Content-Type`, `Content-Language`, `Content-Encoding`).

```text
Accept: application/json, application/xml;q=0.9
  → server: Content-Type: application/json   (client's preference honoured)
```

The `q` values express preference weights; the server may also redirect or default when nothing matches (`406 Not Acceptable` is the strict answer, rarely used). Caches must key on the negotiated dimensions — that's what `Vary: Accept-Encoding` declares — or they'll serve the wrong variant.

The classic mistakes:

- Ignoring `Vary`. A cache that stores the gzipped response and serves it to a client that can't decode it (or the English page to a French user) is a negotiation bug. Vary on every dimension you negotiate.
- Negotiating what URLs should distinguish. Major variants (v1 vs v2 of an API, mobile vs desktop pages) are usually clearer as distinct URLs than as negotiated dimensions. Negotiate encodings and languages; version with URLs or explicit parameters.
- Forgetting server-driven limits. Browsers send long Accept lists; servers should have a deterministic preference order rather than naively picking the client's first choice.
- Assuming the client sends useful headers. Many API clients send `Accept: */*` — negotiation then falls back to server defaults, which must be sane.
- Double negotiation confusion. Format (media type) and encoding (compression) are independent axes; a response can be JSON *and* gzipped. Don't conflate `Content-Type` with `Content-Encoding`.
- Breaking caches with user-agent sniffing. Varying responses on User-Agent fragments caches badly. Prefer explicit, cacheable dimensions.

**How to use it:** honour the standard headers with a clear server preference order, emit matching `Vary`, and keep major variants in URLs. Negotiation handles the small dimensions elegantly; it shouldn't carry your versioning strategy — see [API versioning](/t/api-versioning).
