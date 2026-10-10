---
title: "Cache Key Design"
summary: "Choosing keys so different data never collides."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["cache key", "cache key design", "cache keys"]
prereqs: ["cache-hit-miss", "ttl"]
related: ["cdn-caching", "cache-invalidation", "ttl"]
---

A **cache key** is what identifies a cached entry: two requests with the same key get the same cached response. Getting the key right is the difference between a fast, correct cache and one that serves wrong data or never hits.

The key must include everything that changes the response and nothing that doesn't:

- Include: the resource identity, query parameters that affect the result, relevant headers (`Vary: Accept-Language`, `Accept-Encoding`), and the user/tenant if the response is personalized.
- Exclude: irrelevant parameters (tracking IDs, ordering of the same set), and anything that would split equivalent requests into different entries.

```text
GET /products?category=shoes&page=2   → key: products|category=shoes|page=2
(ignore utm_source, which doesn't change the response)
```

Two failure modes:

- Key too broad (missing a varying input) → a **wrong** response is served (one user's data to another, a stale variant). Correctness bug.
- Key too narrow (including something irrelevant) → equivalent requests get separate entries, so the **hit rate** collapses and the cache does little. Performance bug.

The classic mistakes:

- Forgetting a varying dimension. Not including the locale, the tenant, or an auth header means the cache returns the wrong user's or language's data. This is the dangerous one.
- Including ephemeral or noisy inputs. Timestamps, random IDs, or parameter order in the key fragment the cache into uselessness.
- Caching personalized data under a shared key. A CDN/edge cache keyed only by URL will happily serve one user's page to another. Personalize the key or don't cache it.
- Ignoring normalization. `?a=1&b=2` and `?b=2&a=1` are the same request; if they produce different keys, you get duplicate entries. Normalize query parameters.
- Not versioning the key on schema change. If the cached value's shape changes, old entries are wrong; include a version in the key or invalidate.
- Assuming header handling is automatic. `Vary` and CDN behaviour must be set correctly; don't assume they vary on what you need.

**How to design it:** start from "what inputs change this response?", include exactly those, normalize and ignore the rest, and version it. Then verify both hit rate *and* correctness — a high hit rate that returns wrong data is worse than no cache. See [CDN caching](/t/cdn-caching) and [cache invalidation](/t/cache-invalidation).
