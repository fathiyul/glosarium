---
title: "Key-Range vs Hash Partitioning"
summary: "Splitting data by ranges of keys vs by hashed keys."
levels: { backend: senior, data-engineer: mid-level }
aliases: ["key-range partitioning", "hash partitioning", "range vs hash partitioning"]
prereqs: ["partitioning", "sharding"]
related: ["table-partitioning", "query-plan", "sharding"]
---

When data is split across partitions (or shards), you choose how to decide which partition a row belongs to. The two classic strategies are **range** and **hash**.

- Key-range partitioning assigns rows by an ordered range of the key: partition by month (`2026-01`, `2026-02`) or by id range. Rows are co-located by order, so range queries (a date span, an id range) hit one or few partitions and can be scanned efficiently.
- Hash partitioning applies a hash function to the key and assigns by the hash. It spreads keys **evenly** across partitions, avoiding hot spots on naturally-clustered keys — but destroys ordering, so a range query must touch every partition.

```text
range: key 1..1000 → P1, 1001..2000 → P2   (ordered, easy ranges, can skew)
hash:  hash(key) % N → any partition       (even spread, no ranges)
```

The classic mistakes:

- Range partitioning on a hot, monotonic key. Partitioning by an auto-increment id or a timestamp sends all new writes to the *last* partition — a write hot spot while earlier partitions idle. Hash the key, or partition by something that spreads writes.
- Hashing when you need range queries. If queries are "everything in this date range", hashing forces a scan of all partitions. Range partitioning keeps those queries cheap. Match the strategy to the query pattern.
- Forgetting the "remaining" range. Range partitions must cover the whole key space, including the newest values; a partition for "future" data prevents rows from landing nowhere.
- Rebalancing pain. Changing the number of hash partitions reshuffles keys (see [consistent hashing](/t/consistent-hashing)); range partitions are easier to split/merge. Plan for growth.
- Ignoring skew from the key distribution. Even a hash can be uneven if the hash or key set is poor; monitor partition sizes.
- Confusing partitioning with sharding. Partitioning can be *within* one database (for manageability) or *across* machines (sharding). The range/hash choice applies to both, but the distributed case adds network and consistency concerns (see [sharding](/t/sharding)).

**How to choose:** range when queries are range-oriented and writes aren't concentrated on one end (or you can tolerate it, e.g. time-series where you write to the newest and query by range — a common pairing with [table partitioning](/t/table-partitioning) and retention). Hash when you need even distribution and your queries are point/equality lookups. The query pattern decides — see [partitioning](/t/partitioning).
