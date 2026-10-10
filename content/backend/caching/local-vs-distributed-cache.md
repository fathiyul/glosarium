---
title: "In-Process vs Distributed Cache"
summary: "A cache in your app's memory vs a shared one like Redis."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["in-process cache", "local cache", "distributed cache"]
prereqs: ["cache-hit-miss", "eviction-policy"]
related: ["redis", "cache-consistency", "eviction-policy"]
---

There are two places to cache: **inside the application process** (a local map, an in-memory library) and in a **shared, distributed** cache service (like Redis) that all instances use. Each has a very different profile.

- In-process cache — stored in the app's own memory. Access is essentially free (no network), but it's **per instance**: each app server has its own copy, so they can disagree, and the data is lost when the instance restarts. Capacities compete with the app's own memory.
- Distributed cache — a separate service shared by all instances. Access costs a network hop (fast, but not free), but all instances see the same data, it survives app restarts, and its capacity is independent of the app.

```text
in-process:   fastest access, per-instance, stale across instances, lost on restart
distributed:  one network hop, shared, survives restarts, independent capacity
```

The classic mistakes:

- Using an in-process cache for data that must be consistent across instances. One instance updates; the others serve stale values until they expire. If correctness needs a single view, use a distributed cache (or short TTLs and accept staleness).
- Ignoring the stampede on restart. When an instance restarts, its in-process cache is empty, and it hammers the database until refilled. A distributed cache survives this better (see [cache warming](/t/cache-warming)).
- Unbounded in-process caches. A local map with no size limit grows with distinct keys and exhausts the app's heap (a very common memory leak). Bound it and evict (see [eviction policy](/t/eviction-policy)).
- Caching everything distributed, even tiny hot data. Some data is so hot and small that fetching it across the network repeatedly is slower than a local copy. A small local cache in front of the distributed one (a two-level cache) helps.
- Forgetting the network cost. A distributed cache round trip, done per request for many keys, adds latency; batch or use pipelining (see [pipelining](/t/pipelining)).
- Assuming a distributed cache is durable. Usually it's not; it's a cache. Persistence and HA are separate concerns (see [Redis persistence](/t/redis-persistence)).

**How to choose:** in-process for small, hot, per-instance-tolerant data (config, reference tables) where the speed matters and staleness is fine. Distributed for shared, larger, must-be-consistent caches (sessions, computed results across instances). Many systems use both: a tiny local cache for the hottest keys in front of a shared cache. Match the choice to the consistency and capacity you need.
