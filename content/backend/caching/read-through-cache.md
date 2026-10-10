---
title: "Read-Through Cache"
summary: "The cache itself loads missing data from the database."
levels: { backend: senior, data-engineer: senior }
aliases: ["read-through cache", "read through cache", "readthrough cache"]
prereqs: ["cache-aside", "cache-hit-miss"]
related: ["write-through-cache", "cache-aside", "cache-consistency"]
---

A **read-through cache** sits in front of the source of truth and loads entries **on a miss** itself: the application asks the cache, and if the value isn't there, the cache fetches it from the source, stores it, and returns it. The app doesn't manage the load logic — the cache does.

```text
app → cache.get(key)
        hit  → return value
        miss → cache loads from DB, stores, returns
```

It's a variant of [cache-aside](/t/cache-aside), where the difference is *who* does the loading. In cache-aside, the application loads from the source and writes to the cache; in read-through, the cache library/component handles the load. Both leave the app code simple and keep misses from hitting the source repeatedly, but read-through centralises the load logic.

The classic mistakes:

- Confusing read-through with write-through. Read-through is about *loading on read*. Writes need their own strategy — write-through or write-behind — or the cache goes stale after a write (see [write-through cache](/t/write-through-cache)).
- Assuming it handles invalidation. Read-through fills on miss; it doesn't automatically invalidate on update. You still need a write strategy and a TTL. Stale data after a write is the common result of a read-through-only cache.
- Overlooking the miss cost cluster. On a miss, the cache queries the source; many simultaneous misses for the same key cause a stampede (see [thundering herd](/t/thundering-herd)). Single-flight/dedup within the cache helps.
- Caching errors as values. If the load fails, storing the failure under the key poisons the cache. Distinguish "not found" (see [negative caching](/t/negative-caching)) from "load failed".
- Ignoring key design. The read-through key must include everything that varies; a wrong key serves wrong data (see [cache key design](/t/cache-key-design)).
- Assuming the library caches everything. Read-through only helps for keys you actually request and that fit the cache's size/eviction; a miss-heavy access pattern gains little.

**When to use it:** when you want the cache to own the load logic and keep application code clean — common in caching libraries and ORM second-level caches. Pair it with a write strategy so updates don't leave stale entries. It's a convenience over plain cache-aside, and the correctness rules (keys, TTL, invalidation, stampede) are the same.
