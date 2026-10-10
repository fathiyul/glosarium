---
title: "Cache-Control"
summary: "The header that directs how responses may be cached."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["cache-control", "http caching headers", "cache headers"]
prereqs: ["http", "cdn"]
related: ["etag", "conditional-request", "cdn-caching"]
---

**Cache-Control** is the HTTP header through which a server declares a response's cacheability: whether it may be stored, by whom, and for how long. Browsers, CDNs and proxies all obey it, so one header controls the whole caching chain.

```text
Cache-Control: public, max-age=31536000, immutable   # hashed static asset
Cache-Control: private, max-age=0, must-revalidate   # personal, always check
Cache-Control: no-store                               # never store (sensitive)
```

The vocabulary: `public` (shared caches may store) vs `private` (only the browser) vs `no-store` (nobody); `max-age` (freshness lifetime in seconds); `must-revalidate`/`no-cache` (stale content needs revalidation, where `no-cache` confusingly *does* allow storage); `immutable` (this URL's bytes will never change — skip revalidation entirely).

The classic mistakes:

- Caching personalised content as public. A `public, max-age=3600` on a page containing one user's data serves it to others. Personal responses need `private` or `no-store`.
- Long max-age without immutable URLs. A year-long cache on `/app.js` (same name, changing bytes) strands users on stale code. Long lifetimes belong only with content-hashed filenames; HTML entry points stay short.
- Thinking `no-cache` means "don't cache." It means "store but revalidate every time" — still a conditional request per use. `no-store` is the actual "don't keep this."
- No validators to back revalidation. Revalidation needs an [ETag](/t/etag) or Last-Modified, or every check downloads fully. Pair the directives with validators.
- Forgetting intermediaries. A CDN between you and the user applies these headers too — `s-maxage` exists precisely to give shared caches a different lifetime than browsers.
- Caching error responses. A `500` cached for an hour turns a blip into an outage. Set short or no caching on errors.
- Assuming headers alone suffice. Caching behaviour also depends on method (only GET-like responses cache), status codes, and `Vary` — the header is the policy, not the whole mechanism.

**The discipline:** immutable hashed assets get long public lifetimes; HTML gets short ones; personal data gets `private`/`no-store`; everything revalidatable gets an ETag. Cache-Control is a small header with outsized power over latency, cost and correctness.
