---
title: "Cache Warming"
summary: "Filling a cache before traffic arrives."
levels: { backend: senior, data-engineer: senior }
aliases: ["cache warming", "warming the cache", "cache preload"]
prereqs: ["cache-hit-miss", "local-vs-distributed-cache"]
related: ["thundering-herd", "cache-hit-miss", "local-vs-distributed-cache"]
---

**Cache warming** is pre-populating a cache with the data it will need *before* real traffic hits it, so the system starts with hits rather than misses. A cold cache — after a deploy, a restart, or a scale-up — sends the first wave of requests to the database, which can overwhelm it. Warming avoids that **cold start**.

```text
deploy → run warmup: load top N keys → serves traffic with warm cache
```

Warming is usually a script or startup step that fetches the most-requested items (top products, popular config, hot keys) and puts them in the cache. Sometimes it's a scheduled job that refreshes the hot set; sometimes the app warms a local cache on boot.

The classic mistakes:

- Assuming the cache is warm after a restart. An in-process cache is empty on restart; a distributed cache survives restarts but may have expired entries. New instances especially start cold. Warm them.
- Warming the wrong keys. Warming randomly or the whole dataset is wasteful; warm the keys most likely to be requested (popular items, recently accessed, high-traffic endpoints). Use access logs to pick them.
- Letting warming itself overload the source. Fetching everything at once from the database is a stampede of its own. Throttle the warmup and spread it out.
- Forgetting the miss cost during warm. Between deploy and warm completion, traffic still hits a partly-cold cache; ensure the database can survive the transition (see [thundering herd](/t/thundering-herd)).
- Over-relying on it. A cache should tolerate misses; warming is an optimisation, not a substitute for handling cold starts gracefully. The system must survive the cache being empty.
- Warming stale data. If the warmup loads values that are already outdated, you start with stale entries. Source warm data from the current state.
- No warm path for new instances. Autoscaling adds cold instances during peak traffic; without a warm step, each new instance spikes the database.

**When to use it:** when cold-start misses would overload the source — high-traffic services after deploy/restart, caches of expensive-to-recompute data, systems with predictable hot keys. It smooths the transition from deployment to steady serving. Combined with request collapse (see [thundering herd](/t/thundering-herd)) and sensible TTLs, it keeps a cache fast from the first request. See [cache hit/miss](/t/cache-hit-miss).
