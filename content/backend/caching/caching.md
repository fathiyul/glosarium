---
title: "Caching"
summary: "Keeping copies of data somewhere faster to avoid repeated work."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["cache", "caches", "cache layer", "Redis cache", "memoization"]
prereqs: ["db-index"]
related: ["cache-aside", "cache-invalidation", "ttl", "cache-hit-miss", "eviction-policy", "cache-stampede"]
core: [backend]
---

**Caching** means keeping a copy of a result somewhere faster, so you don't repeat expensive work. A page that needs 300 ms
of database queries can be served in 2 ms from memory.

```python
def get_product(product_id):
    key = f"product:{product_id}"
    cached = cache.get(key)              # 1. look in the cache
    if cached is not None:
        return cached                    # hit: fast
    product = db.query_product(product_id)   # miss: do the real work
    cache.set(key, product, ttl=300)     # 2. store it for 5 minutes
    return product
```

This is the **cache-aside** pattern ([cache-aside](/t/cache-aside)), the most common one.

## Caches exist at every level

| Layer | Examples |
|---|---|
| Browser | `Cache-Control` headers, local storage |
| CDN / edge | Static files, even whole pages ([CDN caching](/t/cdn-caching)) |
| Application memory | A local dictionary or LRU cache |
| Shared cache | Redis or Memcached, used by many app servers ([local vs distributed](/t/local-vs-distributed-cache)) |
| Database | Query and buffer caches, built into the engine |

## The cost: staleness

A cache can serve out-of-date data. The famous difficulty is **invalidation**: knowing when to throw a copy away
([cache invalidation](/t/cache-invalidation)). Common strategies:

- **A time-to-live** ([TTL](/t/ttl)): the entry expires after N seconds. Simple, and you accept some staleness.
- **Explicit invalidation**: delete or update the entry when the underlying data changes.

## Decide what to cache

Good candidates: **read-heavy, expensive to compute, and tolerant of slightly old data** (product pages, configuration, rendered
fragments). Poor ones: data that changes constantly, must be perfectly current (balances, stock when selling) or is
cheap to fetch.

## Things that go wrong

- **Wrong cache keys** that mix up users or tenants, which can leak data. Include everything the result depends on
  ([cache key design](/t/cache-key-design)).
- **Stampedes**: a popular entry expires, and hundreds of requests all recompute it ([cache stampede](/t/cache-stampede)).
- **Unbounded growth**: caches need limits and an [eviction policy](/t/eviction-policy).
- **Treating the cache as the source of truth**. It can be wiped at any time, so your app must work without it.
- **Not measuring.** Track the [hit rate](/t/cache-hit-miss). A cache with a low hit rate just adds complexity.

First make sure the slow thing can't be fixed directly (an index, a better query). Caching hides problems and adds
failure modes.
