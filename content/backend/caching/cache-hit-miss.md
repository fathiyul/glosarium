---
title: "Cache Hit and Miss"
summary: "Whether the requested data was found in the cache."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["cache hit", "cache miss", "hit ratio"]
prereqs: ["caching"]
related: ["ttl", "caching", "redis", "http-caching"]
---

A cache hit happens when the data you ask for is already in the cache, so you can return it without going to the source. A cache miss happens when it isn't, so you fetch it from the source, usually store it in the cache, and then return it.

```python
def get_product(product_id):
    cached = cache.get(f"product:{product_id}")
    if cached is not None:       # hit
        return cached
    product = db.load_product(product_id)   # miss: go to the source
    cache.set(f"product:{product_id}", product, ttl=300)
    return product
```

The hit ratio is the share of requests that were hits. A higher ratio usually means less load on the source, although how much it helps depends on how expensive each miss is.

The classic mistake is treating a high hit ratio as proof the cache works. If the cached data is stale, a hit returns the wrong answer quickly. Check what you cache and how long it stays valid, using [TTL](/t/ttl), and make sure a change to the source eventually reaches the cache.
