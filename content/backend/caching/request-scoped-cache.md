---
title: "Request-Scoped Caching"
summary: "Caching within a single request to avoid repeated lookups."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["request-scoped cache", "per-request cache", "request cache"]
prereqs: ["cache-hit-miss", "eager-vs-lazy-loading"]
related: ["cache-hit-miss", "eager-vs-lazy-loading", "connection-pooling"]
---

A **request-scoped cache** stores values for the duration of one request, so the same lookup isn't repeated within that request and thrown away when it ends. It's a lightweight **dedupe** layer: fetch a user once, and every later reference in the same request reads the cached value instead of querying again.

```text
request handler:
  user = cache.get_or_load(user_id)   # first call queries
  ... later ...
  user = cache.get_or_load(user_id)   # second call hits the cache, no query
```

It's especially useful for the N+1 problem: if several parts of the request need the same related row, the request cache collapses the repeated reads. Unlike a shared cache, it needs no invalidation across requests — it dies with the request, so it can't go stale between requests.

The classic mistakes:

- Using a long-lived cache for request data. A request cache must be request-scoped; making it longer-lived reintroduces staleness and invalidation. Its safety comes precisely from its short life.
- Assuming it fixes N+1 across requests. It dedupes *within* one request; a loop that fires one query per item in the same request is fixed, but the same N+1 across many requests isn't. Eager loading is the broader fix (see [eager vs lazy loading](/t/eager-vs-lazy-loading)).
- Caching mutable objects and mutating them. If the cached object is shared within the request and one part modifies it, another sees the change (or doesn't, depending on copies). Be clear whether cached values are treated as read-only.
- Caching the wrong thing. Caching a value that the request itself changes (then reading the stale cache) causes confusing bugs. Cache immutable-for-the-request data, or update the cache on write.
- Forgetting to clear on rollback. If the request transaction rolls back, a request cache holding freshly written data is now wrong for any retry within the same scope. Scope carefully.
- Over-engineering. A request cache can usually be a simple map in the request context (see [request context](/t/request-context)); it doesn't need the machinery of a distributed cache.

**When to use it:** whenever a request repeatedly fetches the same data — the classic N+1, or several layers needing the same config/entity. It's cheap, safe (by virtue of its lifetime), and effective. It complements, rather than replaces, a shared cache: the request cache reduces work *within* a request; the shared cache reduces work *across* requests. See [cache hit/miss](/t/cache-hit-miss).
