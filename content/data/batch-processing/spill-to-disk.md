---
title: "Spill to Disk"
summary: "Running out of memory and writing intermediate data to disk."
levels: { data-engineer: senior }
aliases: ["disk spill", "spilling", "external sort", "out of core"]
prereqs: ["out-of-memory", "shuffle"]
related: ["shuffle", "data-skew", "out-of-memory", "apache-spark", "broadcast-join", "query-plan"]
---

Spilling to disk is what an engine does when an operation needs more memory than it has: it writes intermediate data to disk and reads it back later. It's a safety valve that lets a job finish instead of failing with [out of memory](/t/out-of-memory).

**The classic mistake is trusting a job that passed on a sample.** A `GROUP BY` with millions of distinct keys, a sort bigger than the task's memory, or a hash join that doesn't fit will spill on full data even though it looked fine in a test. Spilling turns memory-speed work into disk-speed work and can make a job several times slower.

## Where it happens

- Sorts that don't fit in memory become external sorts, writing runs to disk and merging them.
- Hash joins and hash aggregations spill the build side when the table is too large.
- Shuffles ([shuffle](/t/shuffle)) write partition data to local disk before it's fetched.
- Engines differ in when they spill and how they name it, but Spark, Hive/MapReduce, Presto/Trino and most analytical databases all do it.

## How to see it

Engine UIs and metrics expose it directly — for example Spark reports "spill (memory)" and "spill (disk)" per task, and query plans show external sorts or hash operators. A single task with far more spill than its peers usually points to [data skew](/t/data-skew): one oversized partition spills while the others don't.

## Reducing it

- Give tasks more memory, or split the work into more, smaller partitions.
- Pre-aggregate or filter earlier so less data reaches the heavy operation.
- Use a [broadcast join](/t/broadcast-join) when one side is small, so the big side isn't shuffled.
- Reduce the number of distinct keys where you can, and fix skew.
- Rewrite the query if the [query plan](/t/query-plan) shows a plan that was never going to fit.

## When it's fine

Some spilling is normal and healthy: large sorts on a shared cluster are supposed to use disk rather than demand huge memory. Only treat it as a problem when it dominates runtime, fills the local disk, or happens for every task. Spilling is a symptom; the fix is usually a smaller working set per task, not just more hardware.
