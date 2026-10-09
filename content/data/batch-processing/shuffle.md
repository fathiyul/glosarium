---
title: "Shuffle"
summary: "Redistributing data across machines by key, often the slowest step."
levels: { data-engineer: mid-level }
aliases: ["data shuffle", "shuffle stage", "shuffle operation", "exchange", "repartition shuffle"]
prereqs: ["apache-spark", "data-partitions-compute"]
related: ["data-skew", "broadcast-join", "spill-to-disk", "apache-spark", "distributed-computing", "data-partitions-compute"]
core: [data-engineer]
---

A **shuffle** is when a distributed engine must **redistribute data across machines so that rows with the same key end up together**. It happens for operations that need related rows in one place: `GROUP BY`, `JOIN`, `DISTINCT`, window functions and sorts. It's usually **the most expensive step** in a distributed job.

```
Before:   machine A: (US, 5) (ID, 3)      machine B: (ID, 7) (US, 2)      machine C: (SG, 4) (ID, 1)
                           │ shuffle by country: every machine sends rows to the machine responsible for that key
After:    machine A: all US rows          machine B: all ID rows          machine C: all SG rows
          → now each machine can sum its own countries
```

## Why it's expensive

- **Network transfer** of data between machines.
- **Disk I/O**: intermediate data is typically written to disk before being fetched.
- **Serialization and deserialization.**
- **A barrier**: the next stage can't start until the shuffle completes.
- **Memory and spilling** when partitions don't fit ([spill to disk](/t/spill-to-disk)).
- **Skew**: if one key has far more rows than the rest, one task gets overloaded while the others sit idle ([data skew](/t/data-skew)).

## Narrow vs wide

- **Narrow** operations (`filter`, `select`, `map`) work on each partition independently. No shuffle.
- **Wide** operations (`groupBy`, `join`, `repartition`, `orderBy`) need data from many partitions: a shuffle. Count the wide ones in a query plan to estimate its cost.

## Reducing shuffle cost

- **Filter and select early**, so less data moves.
- **Use a broadcast join** when one side is small: send the small table to every machine, and skip shuffling the big one ([broadcast joins](/t/broadcast-join)).
- **Aggregate before the shuffle** (partial/local aggregation, which most engines do automatically).
- **Handle skew**: salt hot keys, or use the engine's skew handling.
- **Pre-partition or bucket** data by the join key when the same joins repeat.
- **Tune the number of shuffle partitions.** Too few means huge partitions and spills. Too many means tiny tasks and overhead. In Spark, the default of 200 shuffle partitions is often wrong for your data size (adaptive execution can help).
- **Avoid unnecessary operations** like `repartition` or global sorts when you don't need them.

## How to see it

In the Spark UI (or your engine's query profile), look at stages separated by shuffles ("Exchange" in plans), the amount of shuffle data read and written, and tasks with outlier durations. If a job is slow, the shuffle is the first thing to check.
