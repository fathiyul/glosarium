---
title: "Read-Heavy vs Write-Heavy"
summary: "How the dominant traffic shape drives the design."
levels: { backend: senior }
aliases: ["read-heavy vs write-heavy", "read write ratio", "workload shape"]
prereqs: ["sharding", "cache-hit-miss"]
related: ["sharding", "leader-follower", "lsm-tree"]
---
**Read-heavy vs write-heavy** is the workload question that shapes storage, caching and replication: read-heavy (100:1 — catalogues, feeds, content) rewards replicas, caches and denormalisation; write-heavy (1:1 or write-dominant — telemetry, ledgers, messaging) rewards partitionable ingestion, append-optimised structures and minimal read-time work.

```text
read-heavy:   replicas + caches + precompute (writes can be slow)
write-heavy:  partition + append + batch (reads assemble on demand)
```

Most systems aren't one or the other uniformly — hot paths differ per feature — so the question repeats per workload: the product catalogue reads heavy while its clickstream writes heavy, and each gets its own shape.

The classic mistakes:

- One architecture for both. A single store tuned halfway serves neither workload well. Separate shapes per workload (even within one product).
- Caching write-heavy paths. High-churn data defeats caches (constant invalidation, low hit rates) while adding complexity. Cache reads; stream writes.
- Normalising read-heavy data. Join-per-request at 100:1 ratios burns the database for purity. Denormalise what reads need.
- Ignoring the ratio's drift. Features evolve (analytics added to a CRUD app); yesterday's read-heavy table becomes today's write firehose. Re-measure per feature, periodically.
- Synchronous secondary writes. Updating search indexes, caches and warehouses inline on the write path couples availability and latency. Write behind, stream aside.
- Benchmarking the wrong mix. Load tests at 50/50 mislead both shapes. Test at production ratios — or the capacity plan is fiction.

**How to use it:** ask the ratio per workload, shape storage, caching and replication to the answer, and re-ask as features evolve. Workload shape is the root decision storage design grows from.
