---
title: "Cache Invalidation"
summary: "Removing stale data from a cache; famously one of the hard problems."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["invalidating caches", "cache expiry", "stale cache", "cache busting", "cache eviction vs invalidation"]
prereqs: ["caching"]
related: ["ttl", "cache-aside", "cache-consistency", "eviction-policy", "cache-stampede", "write-through-cache"]
core: [backend]
---

There's an old joke that the two hard things in computer science are naming and cache invalidation (and off-by-one errors). **Cache invalidation** means removing or updating cached data when the underlying data changes, so that readers don't see stale values. It's hard because it requires knowing **when** the source changed,
across all the places that cached it.

## The strategies

| Strategy | How | Trade-off |
|---|---|---|
| **Time-based (TTL)** | Entries expire after N seconds ([TTL](/t/ttl)) | Simple. You accept staleness up to N seconds, and some unnecessary refreshes |
| **Explicit invalidation** | When data changes, delete or update the cache key | Fresh, but you must find *every* affected key and never forget a code path |
| **Write-through** | Write to the cache and the database together ([write-through](/t/write-through-cache)) | Cache is always current. Writes are slower |
| **Versioned keys** | Include a version in the key (`product:7:v12`); bump it on change | Old entries just stop being used and expire. No deletion needed |
| **Event-driven** | Publish a "changed" event; subscribers drop their copies | Works across services. Adds infrastructure and ordering concerns |

```python
def update_product(product_id, data):
    db.update(product_id, data)
    cache.delete(f"product:{product_id}")             # invalidate after the write
    cache.delete("product-list:featured")             # ...and anything derived from it
```

## Why it goes wrong

- **Forgotten derived entries**: you invalidate `product:7` but not the list pages and search results that include it.
- **Races**: a reader fetches the old value, a writer updates the database and deletes the cache, then the reader stores the old value in the cache. Now it's stale until the TTL expires. Order of operations and short TTLs reduce, but don't eliminate, this
  ([cache consistency](/t/cache-consistency)).
- **Multiple caches**: browser, CDN, application and database caches each need invalidating.
- **Stampedes**: invalidating a hot key makes many requests recompute it at once ([cache stampede](/t/cache-stampede)).
- **Complex dependencies** between keys.

## Practical guidance

- **Always set a TTL**, even if you also invalidate explicitly. It's a safety net for the mistakes you'll make.
- **Prefer simple designs**: short TTLs for data that can be slightly stale, and explicit invalidation only for what must be fresh.
- **Keep the mapping** between data and cache keys small and centralized, so changes know what to invalidate.
- **Cache the right things.** Data that's cheap to compute or changes constantly may not be worth caching.
- **For static assets**, avoid invalidation entirely by changing the URL when the content changes (hashed filenames, see [asset hashing](/t/asset-hashing)).
- **Decide how stale is acceptable** for each cache, and say so in the code.

If you find yourself building an intricate invalidation system, reconsider whether the data should be cached, or whether the source can be made faster.
