---
title: "Thundering Herd"
summary: "Many clients waking up and hitting a resource at the same moment."
levels: { backend: senior, data-engineer: senior }
aliases: ["thundering herd", "cache stampede", "dogpile"]
prereqs: ["cache-hit-miss", "backpressure"]
related: ["cache-warming", "ttl", "load-shedding", "negative-caching"]
---

A **thundering herd** (cache stampede, dogpile) happens when many requests miss the same cache entry at once and all go to the source simultaneously. It typically strikes when a popular entry expires, when a cache is invalidated, or after a restart — a large burst of identical requests, all finding nothing, all doing the same expensive work.

```text
key expires at 12:00:00
12:00:00  2,000 requests miss → 2,000 database queries for the same row
→ database overloads
```

Instead of one request recomputing the value, thousands do.

The classic mistakes:

- Letting every miss reload independently. No coordination means N simultaneous identical loads. This is the core of the herd.
- Synchronised expiry. If a batch of keys (or a whole cache) expires at the same instant, they herd together. Add **jitter** to TTLs so expiries spread out.
- Invalidating hot keys with no protection. A mass invalidation of popular keys exposes the source to a stampede. Invalidate selectively, or re-populate proactively.
- No request collapse. See it as many requests for the same key; the fix is **single-flight** — only the first request loads, the rest wait for that result. Many caching libraries offer this.
- Serving hard failures instead of stale data. If reload fails, returning an error makes the outage worse. **Stale-while-revalidate** — serve the slightly stale value while one request refreshes it — absorbs the burst.
- Ignoring cold starts. After deploy/restart, an empty cache means every key is a first miss; warming (see [cache warming](/t/cache-warming)) and staggered startup reduce the herd.
- Assuming one layer. The herd can hit a shared cache, then the database, then a downstream service — each layer amplifying. Protect the most expensive layer.

How to defend: collapse concurrent misses for the same key (single-flight), add jitter to expiries, serve stale while refreshing, warm hot keys, and bound how fast misses can hit the source (see [backpressure](/t/backpressure)). A cache is supposed to protect the source; a stampede turns it into an amplifier — exactly backwards. Handling it is table stakes for any cache serving popular keys. See [load shedding](/t/load-shedding).
