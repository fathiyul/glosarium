---
title: "Hot Partition"
summary: "One shard getting far more traffic than the others."
levels: { backend: senior }
aliases: ["hot partition", "hot shard", "hot key"]
prereqs: ["sharding", "partitioning"]
related: ["sharding", "key-range-vs-hash-partitioning", "load-shedding"]
---
A **hot partition** (hot shard/key) receives disproportionate traffic — one celebrity, one viral post, one giant tenant — overwhelming its node while siblings idle. Partitioning spreads *average* load evenly; skew concentrates the *actual* load, and averages don't serve requests.

```text
100 shards, even keys → 1% each ✓
one viral key → its shard takes 1000× while others idle ✗
```

Mitigations layer: split hot keys (append random suffixes, aggregate partials), replicate hot data widely (read replicas, edge caching), cache in front (absorb the flood), queue and shed (protect the shard), and redesign keys (composite keys spreading what one key concentrated).

The classic mistakes:

- Assuming even distribution. Hashing spreads keys, not traffic — Zipfian reality (a few keys dominate) breaks every uniform assumption. Design for skew, not averages.
- Single-row counters. A global counter row serialises all increments; shard counters (per-node partials, periodic rollup) parallelise.
- Cache stampede on the hot key. The hot key's cache entry expiring unleashes the flood at once; stagger TTLs and single-flight misses.
- Throttling the victim's neighbours. Blanket limits punish healthy partitions for one hotspot's sins. Shed precisely at the hot key.
- Ignoring write hotspots. Reads cache; writes don't — a hot write key needs splitting or queuing, not just replicas.
- Static partitioning forever. Traffic shapes shift (virality, tenant growth); rebalancing and key redesign must be operational routine, not emergency refactors.
- Blaming the database. Hot partitions are a key-design problem surfacing in whatever store holds the keys. Fix the keys, not the engine.

**How to handle it:** detect skew (per-partition metrics, not averages), split or replicate the hot key, cache reads, queue writes, and keep rebalancing routine. Partitioning handles volume; hotspots need explicit design.
