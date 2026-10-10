---
title: "Data Locality"
summary: "Keeping data close to where it's processed."
levels: { backend: senior, data-engineer: mid-level }
also: [batch-processing]
aliases: ["data locality", "locality of reference", "colocation"]
prereqs: ["sharding", "partitioning"]
related: ["sharding", "cache-locality", "edge-rendering"]
---
**Data locality** is keeping computation near the data it touches: querying the shard that holds the rows, caching hot keys on the app host, rendering at the edge near users, processing partitions where they're stored. Distance costs — network hops, serialisation, cross-shard coordination — so co-locating work with data removes whole categories of latency and failure.

```text
compute far:  app → network → data → network → app (2 hops + failures)
local:        compute where the data lives (no hops)
```

It appears at every scale: CPU caches (see [cache locality](/t/cache-locality)), database partitioning (queries routed to the owning shard), stream processing (partition-local aggregation), CDNs and edge compute (serve near users), even team structure (owners near their data's consumers).

The classic mistakes:

- Scatter-gather by default. Fanning every query to all shards when one holds the answer multiplies load by the shard count. Route by key; reserve scatter for genuine cross-shard needs.
- Caches far from callers. A "shared cache" across regions adds a network hop to every hit — sometimes slower than the database it fronts. Cache near, share deliberately.
- Ignoring the coordination tax. Cross-partition transactions and joins pay consensus and transfer costs; design boundaries so the common path stays local.
- Locality vs balance. Pinning hot keys to one node overloads it (see [hot partition](/t/hot-partition)); pure locality without rebalancing creates hotspots. Co-locate, then spread heat.
- Edge without invalidation. Pushing data to the edge without a freshness story serves stale answers fast. Local copies need coherence plans.
- Premature colocation. Merging services "for locality" before measuring recreates the monolith's coupling. Localise the measured hot path, not the architecture.

**How to apply it:** measure where data crosses boundaries, move the smaller side (usually compute to data), keep hot paths partition-local, and plan coherence for every copy. Distance is a cost — spend it only where the design earns it back.
