---
title: "Broadcast Join"
summary: "Sending a small table to every worker to avoid shuffling the big one."
levels: { data-engineer: senior }
aliases: ["broadcast hash join", "broadcast join Spark", "map-side join", "replicated join"]
prereqs: ["shuffle", "join"]
related: ["shuffle", "data-skew", "apache-spark", "distributed-computing", "data-partitions-compute", "spill-to-disk"]
core: [data-engineer]
---

In a distributed engine, a normal join of two big tables needs a **[shuffle](/t/shuffle)**: both sides are repartitioned across the network by the join key, which is expensive. A **broadcast join** avoids shuffling the large table when the **other table is small**: the engine **sends a full copy of the small table to every worker**, and each worker joins its local part of the big table against it, with no network movement of the big side.

```
Shuffle join:    big table ──shuffle by key──►┐
                 small table ─shuffle by key─►┴► join
Broadcast join:  small table ─copy to every worker─► each worker joins its own slice of the big table locally
```

```python
from pyspark.sql.functions import broadcast

result = orders.join(broadcast(countries), "country_code")     # 'countries' is small
```

```sql
SELECT /*+ BROADCAST(c) */ o.*, c.country_name
FROM orders o JOIN countries c ON o.country_code = c.code;
```

## Why it's fast

- **No shuffle of the big table**, which is usually the dominant cost.
- The small table is held in memory as a **hash table**, so each lookup is quick.
- It also helps with [data skew](/t/data-skew): there's no repartitioning by a hot key.

## When to use it

- **Fact table joined to a small dimension or lookup table** (countries, product categories, configuration): the classic star-schema pattern.
- Filtering a big table by a **small list of values**.

## Limits and risks

- **The small side must fit in memory on every worker**, and be sent to all of them. "Small" is relative to your cluster: engines have a size threshold for automatic broadcasting (Spark's default is around 10 MB, configurable). Forcing a broadcast of something large causes **out-of-memory errors** and long network transfers.
- **The size check relies on statistics.** If estimates are wrong (a filtered "small" table is estimated big, or a "small" one is actually large), the engine may choose a poor plan. Check the query plan, and add a hint if you know better.
- **It works for equality-style joins** best. Some join types or conditions aren't supported.
- **The big table can't be the broadcast side** (for outer joins, which side may be broadcast depends on the join type).
- **Repeated broadcasts** across multiple joins add memory pressure.

## How to check

Look at the query plan (`explain`) for "BroadcastHashJoin" versus "SortMergeJoin" (a shuffle-based join), and at the amount of shuffle in the job UI. If a join between a big and a small table is slow, a broadcast is often the fix ([Apache Spark](/t/apache-spark)).

Keep the small table small: select only the needed columns and filter it first, so it qualifies for broadcasting.
