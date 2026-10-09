---
title: "Data Skew"
summary: "A few keys holding most of the data, so one task runs forever."
levels: { data-engineer: senior }
aliases: ["skewed data", "skew", "key skew", "hot key", "data skew in Spark", "skewed join"]
prereqs: ["shuffle", "data-partitions-compute"]
related: ["shuffle", "broadcast-join", "hot-partition", "spill-to-disk", "apache-spark", "distributed-computing"]
core: [data-engineer]
---

**Data skew** is when data is **unevenly distributed across partitions**, typically because a **few keys account for a huge share of the rows**. Distributed jobs divide work by key, so one task receives most of the data, while the others finish quickly and sit idle. The whole job then takes as long as the slowest task.

```
Partition 1: 2 MB    Partition 2: 3 MB    Partition 3: 4 MB    Partition 4: 9 GB  ← the straggler
job time = time of partition 4
```

## Where it comes from

- **Hot entities**: one huge customer, a popular product, a bot generating most of the traffic.
- **Null or default keys**: millions of rows with `NULL`, `0`, `-1` or `"unknown"` all grouped together. A very common culprit.
- **Natural imbalance**: country, language or category distributions that are far from uniform.
- **Bad partitioning choice**: a column with few distinct values or a timestamp that clusters.
- **Join keys with very uneven multiplicity.**

## How to spot it

- In the job UI, **one or a few tasks run far longer** or process far more data than the rest (look at the task duration and shuffle read distribution, with the max far above the median).
- **Out-of-memory errors or spills** on specific tasks ([spill to disk](/t/spill-to-disk)).
- A stage stuck at "199 of 200 tasks complete" for a long time.
- Query-level stats show a key with enormous counts: `SELECT key, COUNT(*) ... GROUP BY key ORDER BY 2 DESC LIMIT 20`.

## Fixes

| Technique | How it helps |
|---|---|
| **Filter or handle nulls and defaults separately** | Process the junk key on its own, or drop it if it's meaningless |
| **[Broadcast join](/t/broadcast-join)** | If one side is small, avoid shuffling by key entirely |
| **Salting** | Add a random suffix to hot keys so their rows spread over several partitions, then combine results. For joins, replicate the other side across the salts |
| **Two-stage aggregation** | Pre-aggregate with a salted key, then aggregate again without it |
| **Adaptive query execution** | Some engines (Spark 3+) detect skewed partitions at runtime and split them automatically. Enable and check it |
| **Choose a better partition or join key** | One with higher cardinality and more even spread |
| **Isolate the hot keys** | Handle the few huge keys with a special path (broadcast or separate job), and the long tail normally |
| **Increase parallelism carefully** | More partitions don't help if one key is still one partition |

```python
# salting a skewed aggregation (sketch)
from pyspark.sql import functions as F
salted = df.withColumn("salt", (F.rand() * 10).cast("int"))
partial = salted.groupBy("user_id", "salt").agg(F.sum("amount").alias("partial"))
final = partial.groupBy("user_id").agg(F.sum("partial").alias("amount"))
```

## Habits

- **Profile key distributions before big joins** ([data profiling](/t/data-profiling)).
- **Treat null keys explicitly**, and check them.
- **Monitor job stage times**, not just totals.
- Don't confuse it with a **small-files** or a **cluster-size** problem (adding machines won't fix a single oversized task) ([shuffle](/t/shuffle), [small files](/t/small-files-problem)).

The same idea applies to databases and streams: **hot partitions** ([hot partition](/t/hot-partition)) overload one shard or partition while others idle.
