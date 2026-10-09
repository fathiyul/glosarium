---
title: "Cache-Aside"
summary: "The app checks the cache, then the database, then fills the cache."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["lazy loading cache", "look-aside cache", "cache aside pattern", "read-aside caching"]
prereqs: ["caching"]
related: ["read-through-cache", "write-through-cache", "write-behind-cache", "cache-invalidation", "ttl", "cache-stampede"]
core: [backend]
---

**Cache-aside** (also called lazy loading) is the most common caching pattern. **The application itself manages the cache**: it checks the cache first, and on a miss, loads from the database and **fills the cache** for next time.

```python
def get_user(user_id):
    key = f"user:{user_id}"
    user = cache.get(key)                       # 1. look in the cache
    if user is not None:
        return user                             #    hit
    user = db.query_user(user_id)               # 2. miss: read from the source of truth
    if user is not None:
        cache.set(key, user, ttl=300)           # 3. store it for later
    return user

def update_user(user_id, data):
    db.update_user(user_id, data)               # write to the database first
    cache.delete(f"user:{user_id}")             # then invalidate: the next read reloads it
```

The cache sits **beside** the database, not in front of it. The application talks to both.

## Why it's popular

- **Simple and flexible**: it works with any cache and any database.
- **Only caches what's actually requested**, so the cache fills with useful data.
- **Resilient**: if the cache is down, the app still works (slower), since it falls back to the database.

## Drawbacks

- **The first request is slow** (a miss costs a cache check plus the database read). Cold caches after a restart cause a burst of misses ([cache warming](/t/cache-warming)).
- **Stale data is possible**: after a database change, until the entry is deleted or expires. Set a TTL as a safety net ([cache invalidation](/t/cache-invalidation)).
- **Race condition**: a slow reader can store an old value after a writer invalidates it. Short TTLs limit the damage ([cache consistency](/t/cache-consistency)).
- **Code in every read path** (unless you wrap it in a helper).
- **Stampedes**: when a popular entry expires, many requests miss at once and hit the database ([cache stampede](/t/cache-stampede)).

## Details that matter

- **Write to the database first, then invalidate** (delete) the cache. Deleting is safer than updating the cache entry, which could race.
- **Cache "not found" results** briefly too, so repeated lookups for missing IDs don't hit the database every time ([negative caching](/t/negative-caching)).
- **Design keys carefully**, including everything the value depends on ([cache key design](/t/cache-key-design)).
- **Measure the hit rate** ([hit and miss](/t/cache-hit-miss)).

Alternatives move the logic into the cache layer: [read-through](/t/read-through-cache) (the cache loads data itself) and [write-through](/t/write-through-cache) (writes go through the cache).
