---
title: "MapReduce"
summary: "Processing huge datasets by mapping in parallel and then reducing the results."
levels: { backend: senior, data-engineer: mid-level }
also: [batch-processing]
aliases: ["mapreduce", "map-reduce", "map reduce"]
prereqs: ["distributed-batch-processing", "batch-processing"]
related: ["distributed-batch-processing", "stream-windowing", "data-locality"]
---
**MapReduce** is the foundational batch pattern: map (transform each input record independently, emitting key-value pairs), shuffle (group by key across machines), reduce (aggregate each group). Simplicity plus fault tolerance (re-run failed pieces) made it the big-data workhorse; modern engines keep its shape while adding iteration, streaming and SQL.

```text
map:    (line) → [(word, 1), …]        (parallel, stateless)
shuffle: group "the" → [1,1,1,…]        (network-heavy, the cost centre)
reduce: (word, counts) → total          (parallel per key)
```

Its constraints teach distributed thinking: no shared state between mappers (partition the input), minimise shuffle (combine locally first), handle skew (hot keys stall reducers), and accept batch latency (minutes-to-hours, not interactive).

The classic mistakes:

- Iterative algorithms naively. Each iteration re-reading input and re-shuffling multiplies cost; iterative engines (Spark caching, specialised ML systems) exist for loops.
- Shuffle-heavy design. Global sorts and joins on raw data move mountains; filter, project and pre-aggregate before shuffling.
- Skew ignorance. One hot key's reducer runs for hours while hundreds idle. Salt, split, or broadcast-join skewed keys.
- Small files and tasks. Millions of tiny splits drown scheduling overhead; coalesce to meaty partitions (tens-to-hundreds of MB).
- Interactive expectations. Ad-hoc queries over MapReduce batch wait minutes; serve exploration from interactive engines, batch from batch.
- Stateful mappers. Mappers depending on shared mutable state break parallelism and fault tolerance. Pure functions of their split, always.
- Recomputing instead of checkpointing. Long pipelines rerun from scratch on late failure; checkpoint intermediate outputs at stage boundaries.

**Its place:** the pattern behind batch thinking — partition, compute locally, shuffle sparingly, aggregate. Engines evolved; the shape endures wherever bounded data meets parallel compute.
