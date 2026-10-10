---
title: "Cache Consistency"
summary: "Keeping cached data in line with the source of truth."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["cache consistency", "cache coherence", "keeping cache in sync"]
prereqs: ["cache-invalidation", "ttl"]
related: ["ttl", "write-through-cache", "cache-aside", "eventual-consistency"]
---

**Cache consistency** is the problem of keeping cached data in step with the source of truth. A cache holds a copy; when that copy becomes wrong (the underlying data changed), the cache is stale and serves outdated values. There is no free way to avoid this — only strategies that bound how stale, or how often, the cache can be.

The main strategies:

- TTL — entries expire after a set time, so staleness is bounded by the TTL, not eliminated. Simple and robust (see [TTL](/t/ttl)).
- Invalidation on write — when the source changes, delete or update the cache entry. Faster freshness, but you must invalidate *every* place the data appears, and races can leave stale values.
- Write-through / write-behind — writes go through the cache to the source (see [write-through cache](/t/write-through-cache)), so the cache is updated on write.
- Cache-aside — the app loads into the cache on a miss and invalidates on write; the common default.

```text
write to DB → invalidate cache key → next read reloads fresh
```

The classic mistakes:

- Assuming a cache can be perfectly consistent. It can't, cheaply. Decide how much staleness is acceptable and set TTLs/invalidation accordingly. Consistency is a degree, not a switch.
- Invalidation missing a location. Data cached under several keys (or in the CDN, a local cache, *and* a shared cache) must be invalidated everywhere, or one copy stays stale. This is the hard part.
- The read-modify-write race. "Invalidate then reload" and "reload then invalidate" can interleave so a stale value gets written back after invalidation. A common subtle bug; version keys or use write-through to avoid it.
- Long TTLs where freshness matters. A long TTL with no invalidation means users see old data for a long time. Match TTL to how much staleness the use case allows.
- Not versioning keys. Including a version in the cache key lets you "invalidate" by bumping the version, avoiding deletion races — a robust technique.
- Forgetting per-user or per-tenant staleness. A shared key with personalized data is a consistency *and* a security problem (see [cache key design](/t/cache-key-design)).
- Treating stale reads as rare. Under high write rates they're common; design the UI and logic to tolerate a brief stale window, or avoid caching that data.

**How to think about it:** accept that caching trades consistency for speed, and choose a strategy whose staleness bound you can live with — short TTLs for volatile data, invalidation for important updates, versioned keys to avoid races. State the accepted staleness explicitly. If you need strong consistency, don't cache that path (or cache only immutable data). See [cache-aside](/t/cache-aside) and [eventual consistency](/t/eventual-consistency).
