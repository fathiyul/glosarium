---
title: "Cache Stampede"
summary: "Many requests rebuilding the same expired item at once."
levels: { backend: senior, data-engineer: senior }
aliases: ["dogpile effect", "thundering herd cache", "cache dog-piling", "cache miss storm", "stampeding herd"]
prereqs: ["cache-aside", "ttl"]
related: ["thundering-herd", "request-coalescing", "cache-invalidation", "jitter", "ttl", "cache-warming"]
core: [backend]
---

A **cache stampede** (or dogpile) happens when a **popular cache entry expires** and **many requests miss it at the same moment**, so they **all recompute the same expensive value** simultaneously, slamming the database or backend. A cache meant to protect the backend ends up concentrating the load on it.

```
t=0   key "homepage-stats" expires
t=0+  5,000 requests/sec all see a miss
      → 5,000 identical expensive queries hit the database at once
      → it slows down → the recomputation takes longer → even more requests pile in → outage
```

The danger is highest for **hot keys with expensive recomputation**, and when many keys share the same TTL and expire together (after a deploy that cleared the cache, or a cache restart) ([cache warming](/t/cache-warming)).

## Mitigations

**1. Single flight (request coalescing)**: only one request recomputes, and the others wait for its result ([request coalescing](/t/request-coalescing)). Within one process, use an in-memory lock per key. Across servers, a distributed lock:

```python
def get_stats():
    value = cache.get("stats")
    if value is not None:
        return value
    if cache.set("stats:lock", "1", nx=True, ex=10):        # only one request acquires the lock
        try:
            value = compute_stats()
            cache.set("stats", value, ex=300)
            return value
        finally:
            cache.delete("stats:lock")
    time.sleep(0.05)                                        # others briefly wait, then re-check
    return cache.get("stats") or compute_stats_fallback()
```

(Handle the lock holder crashing: the lock needs an expiry, and waiters need a limit.)

**2. Stale-while-revalidate**: keep serving the old value for a while after expiry, and refresh it in the background, so no request waits on the recomputation.

**3. Early (probabilistic) refresh**: refresh a key shortly **before** it expires, with some randomness, so expiry never produces a thundering crowd.

**4. Jittered TTLs**: add randomness to expiry times (`300 + random(0, 60)` seconds), so many keys don't expire together ([jitter](/t/jitter)).

**5. Pre-warming**: fill the cache before traffic arrives (after a deploy or restart), and avoid clearing everything at once.

**6. Background refresh jobs** for the hottest keys: a scheduled job keeps them fresh, and requests never trigger recomputation.

**7. Protect the backend**: rate limits, circuit breakers and a degraded fallback (serve slightly stale or simplified data) if recomputation is overloaded.

## Related ideas

- **Thundering herd** is the broader pattern: many clients acting at once after an event ([thundering herd](/t/thundering-herd)). Retries without jitter cause the same effect.
- **Negative caching** of "not found" results prevents repeated misses for nonexistent keys ([negative caching](/t/negative-caching)).

Design review question: *"what happens when this key expires under peak load?"* If the answer is "all requests hit the database", add one of the above ([cache invalidation](/t/cache-invalidation)).
