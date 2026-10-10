---
title: "Table Partitioning"
summary: "Splitting one huge table into smaller physical pieces, e.g. by month."
levels: { backend: senior, data-engineer: mid-level }
also: [data-storage]
aliases: ["table partitioning", "partitioned table", "database partitioning"]
prereqs: ["partitioning", "database"]
related: ["key-range-vs-hash-partitioning", "query-plan", "db-index"]
---

**Table partitioning** splits one logical table into several physical partitions (by range, hash or list), while queries still see a single table. The database routes each row to a partition and, for a query, uses **partition pruning** to touch only the partitions that can match — so a query for one month doesn't scan years of data.

```text
events partitioned by month:
  events_2026_01, events_2026_02, ...
query WHERE created_at >= '2026-02-01' → only reads Feb onward (pruning)
```

Why it helps:

- Manageable size — each partition is smaller; indexes and maintenance operate per partition.
- Pruning — range queries on the partition key skip irrelevant partitions entirely.
- Cheap retention — dropping an old partition is instant (`DROP TABLE events_2025_01`), versus a slow mass `DELETE` of millions of rows.
- Maintenance — you can vacuum, reindex or back up partition by partition.

The classic mistakes:

- Partitioning by a key your queries don't filter on. Pruning only works when queries include the partition key. Partition by `created_at` but query by `user_id`, and you scan every partition. Match the key to the query.
- Forgetting that pruning needs the predicate. A query with a function-wrapped column (`WHERE date_trunc('month', created_at) = ...`) or an incompatible type may not prune. Keep predicates simple and sargable.
- Too many tiny partitions. Thousands of partitions add planning overhead and complexity. Aim for a manageable number.
- Assuming partitioning fixes a bad index. It complements indexing; a well-indexed partition is still needed for efficient access within it.
- Ignoring the "default" partition and boundaries. New data must have a partition to land in; a missing future partition errors inserts or dumps everything into a catch-all.
- Confusing partitioning with sharding. Partitioning is often *within one database* (for manageability/pruning); [sharding](/t/sharding) spreads across machines. Partitioning doesn't add write capacity by itself.
- Not planning maintenance. Partition lifecycle (create ahead, drop old) needs automation, or you'll hit missing-partition errors.

**When to use it:** for very large tables where range queries are common and retention matters — events, logs, metrics, time-ordered records. Combined with [range partitioning](/t/key-range-vs-hash-partitioning), dropping old partitions makes time-based retention cheap. For smaller tables, it's unnecessary complexity — see [partitioning](/t/partitioning).
