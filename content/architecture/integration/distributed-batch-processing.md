---
title: "Distributed Batch Processing"
summary: "Engines like Spark that split big jobs across many machines."
levels: { backend: senior, data-engineer: mid-level }
also: [batch-processing]
aliases: ["distributed batch processing", "batch compute cluster", "batch jobs distributed"]
prereqs: ["batch-processing", "sharding"]
related: ["mapreduce", "stream-processing", "data-locality"]
---
**Distributed batch processing** crunches huge datasets by splitting work across many machines: partition the input, compute in parallel, shuffle intermediate results, aggregate — the MapReduce-shaped pattern behind Hadoop, Spark and modern dataframes. Throughput comes from parallelism; fault tolerance from re-execution of failed partitions.

```text
input splits → map (parallel) → shuffle/sort → reduce (parallel) → output
failed partition → recompute from lineage (not whole-job restart)
```

Design centres on data movement (shuffle is the expensive step — minimise and colocate), skew (uneven partitions stall on stragglers), and the batch/stream boundary (bounded historical backfills vs unbounded live streams often share engines now).

The classic mistakes:

- Shuffling everything. Global repartitioning when local aggregation would do multiplies network traffic hundredfold. Combine locally before shuffling (map-side aggregation).
- Skew blindness. One giant key's partition runs for hours while hundreds idle. Salt hot keys, split skewed joins (broadcast the small side), monitor partition sizes.
- Tiny-file fragmentation. Millions of small files murder scheduling and metadata; coalesce inputs (and outputs) to sane chunk sizes.
- No idempotence. Retried partitions double-writing unguarded outputs corrupt datasets. Write idempotently (deterministic paths, atomic commits, overwrite semantics).
- Treating batch as streaming. Hourly jobs papering over needs for minutes-fresh data accumulate scheduling debt; use stream processing where freshness demands it.
- Resource static allocation. Fixed giant clusters for spiky jobs waste enormously; ephemeral job-scoped clusters (or serverless batch) match spend to work.
- Untested at scale. Logic verified on samples breaks on skew, nulls and encoding edge cases at full volume. Test on representative slices, validate outputs statistically.

**When to use it:** bounded, high-volume transformations where minutes-to-hours latency suffices — ETL, backfills, training data, reports. Streaming serves freshness; batch serves completeness and economy.
