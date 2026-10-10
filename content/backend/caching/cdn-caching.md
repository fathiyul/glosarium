---
title: "CDN Caching"
summary: "Caching content on edge servers near users."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
also: [web-performance]
aliases: ["cdn caching", "edge caching", "content delivery caching"]
prereqs: ["cdn", "cache-hit-miss"]
related: ["cache-key-design", "cache-invalidation", "ttl"]
---

A **CDN** caches your content at **edge** locations around the world, so a user's request is served from a nearby point of presence rather than your origin. It cuts latency, absorbs traffic spikes, and offloads your servers — for static assets almost always, and for cacheable API responses sometimes.

The mechanics are controlled by cache headers:

- `Cache-Control` — how long (`max-age`) a response may be cached, and by whom (`public`/`private`).
- Cache keys — what makes two requests "the same" (usually URL + query, plus `Vary` headers) (see [cache key design](/t/cache-key-design)).
- Invalidation / purge — forcibly remove cached entries when content changes (see [cache invalidation](/t/cache-invalidation)).

```text
Cache-Control: public, max-age=31536000, immutable   ← hashed static asset
Cache-Control: public, max-age=60                     ← short-lived, may change
Cache-Control: no-store                               ← never cache (sensitive)
```

The classic mistakes:

- Caching HTML that must not be cached. A page with user-specific data cached publicly leaks one user's content to another. Use `private`/`no-store` for personalized responses.
- Long TTLs on content that changes. A year-long cache on a file whose URL stays the same means visitors see stale versions. Only use long TTLs with immutable, content-hashed URLs (the fingerprinting pattern).
- Forgetting query strings and `Vary`. A cache key that ignores a parameter (or a header like `Accept-Encoding`) serves the wrong variant to someone. Include what affects the response.
- Relying on purge as the primary strategy. Purges are useful but not instant everywhere and can be flaky; prefer versioned URLs plus sensible TTLs so stale content ages out anyway.
- Caching sensitive or authenticated responses. Shared caches must never hold per-user data without the right directives; a mis-set header is a data leak.
- Assuming the CDN caches by default. Not everything is cacheable; the CDN's behaviour depends on headers and configuration. Verify with cache-status headers.
- Ignoring the origin-fetch cost on a miss. On a cache miss the CDN hits your origin; a stampede of misses can still load your servers (see [thundering herd](/t/thundering-herd)).

**How to use it:** set deliberate cache headers — long TTLs with content-hashed filenames for static assets, short or no caching for dynamic/personalized content — design cache keys to include what varies, and use invalidation as a supplement to expiry. It's usually the single biggest latency and cost win for front-end delivery. See [content negotiation](/t/content-negotiation) and [TTL](/t/ttl).
