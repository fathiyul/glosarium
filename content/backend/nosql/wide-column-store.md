---
title: "Wide-Column Store"
summary: "Databases like Cassandra built for massive write volume."
levels: { backend: senior, data-engineer: senior }
aliases: ["wide-column store", "wide column database", "column family database"]
prereqs: ["key-value-store", "partitioning"]
related: ["eventual-consistency", "cap-theorem", "partitioning", "key-value-store"]
---

A **wide-column store** (column-family database) — Cassandra, HBase and similar — stores rows identified by a **partition key**, with each row holding many columns (a "wide" row), grouped into column families. It's built for huge scale and high write throughput across many machines, and it's a step up from a plain key-value store: you can have many columns per key and query by key ranges.

```text
partition key → row of many columns
query: "all readings for sensor X between t1 and t2"  (by key + clustering range)
```

The design centres on partitions: data is distributed by partition key, replicated for durability, and queried efficiently by that key (and a clustering range within it). This makes it excellent for very large, write-heavy, time-ordered or per-entity data — events, messages, sensor readings, activity feeds.

The classic mistakes:

- Querying by non-key columns. A wide-column store is fast by partition key; ad-hoc queries on other columns often require full scans or a carefully designed secondary index. Model around access patterns (see [access pattern design](/t/access-pattern-design)).
- Hot partitions. All traffic to one partition key (a "celebrity" row) overloads a node. Distribute keys well.
- Assuming strong consistency everywhere. These stores typically offer **tunable consistency** — you choose how many replicas must respond — and often favour availability. Reads may be eventually consistent; know your settings ([CAP theorem](/t/cap-theorem), [eventual consistency](/t/eventual-consistency)).
- Modelling relationally. Normalising and joining doesn't fit; denormalise and duplicate for each query. If you need joins, use a relational or distributed-SQL store.
- Ignoring tombstone/delete cost. Deletes are often tombstones that linger; heavy delete patterns can degrade performance if not compacted/expired properly.
- Not planning for repairs and operations. Managing a large cluster (repairs, compaction, rebalancing) is real operational work — a reason managed offerings are common.

**When to use it:** for very large, write-heavy, key-accessed datasets that must scale horizontally — time-series-like events, feeds, per-user data at massive volume — where eventual consistency is acceptable. For strong consistency and ad-hoc queries, a relational or [distributed SQL](/t/distributed-sql) database fits better; for simple key→value, a [key-value store](/t/key-value-store) may suffice. Match the store to the access pattern and the consistency you need.
