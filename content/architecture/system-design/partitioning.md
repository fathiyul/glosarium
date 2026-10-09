---
title: "Partitioning"
summary: "Dividing data into parts, within one machine or across many."
levels: { backend: senior, data-engineer: junior }
aliases: ["data partitioning", "table partitioning", "horizontal partitioning", "partition key"]
prereqs: ["db-index", "relational-database"]
related: ["sharding", "shard-key", "hot-partition", "topics-partitions", "rebalancing", "data-locality"]
also: [database-operations, data-storage]
core: [data-engineer]
---

**Partitioning** means splitting a large dataset into smaller parts (partitions) by some rule, so each part is easier to
store, query and manage. The word is used at two scales:

- **Within one database**: a single big table is split into pieces, such as one per month.
- **Across machines**: the pieces live on different servers (that's [sharding](/t/sharding)).

```sql
-- PostgreSQL-style declarative partitioning
CREATE TABLE events (
    id         BIGINT,
    created_at TIMESTAMPTZ NOT NULL,
    payload    JSONB
) PARTITION BY RANGE (created_at);

CREATE TABLE events_2024_06 PARTITION OF events
    FOR VALUES FROM ('2024-06-01') TO ('2024-07-01');
```

## How to split

| Method | Rule | Good for |
|---|---|---|
| **Range** | By value ranges (dates, ID ranges) | Time-series and logs, easy to expire old data |
| **Hash** | By a hash of the key | Even spread when there's no natural range |
| **List** | By explicit values (region = 'EU') | Data with clear categories |

## Why do it

- **Partition pruning**: a query with `WHERE created_at >= '2024-06-01'` reads only the relevant partitions, not the
  whole table. This speeds up queries on huge tables.
- **Cheap data lifecycle**: dropping or archiving an old month is instantly `DROP TABLE events_2023_01`, not a slow
  `DELETE` of millions of rows.
- **Maintenance**: indexing, vacuuming and backups work on smaller pieces.
- **Parallelism and scale** when partitions are spread over machines.

## In data engineering

Files in a data lake are often laid out by partition (`events/date=2024-06-01/part-0001.parquet`) so engines read only the
days they need, and so a pipeline can rewrite one day without touching the rest
([backfill](/t/backfill)). Message systems partition topics to scale consumers ([topics and partitions](/t/topics-partitions)).

## Choosing the partition key

The key decides everything:

- It should appear in **most queries' filters**, or pruning won't help.
- It should spread data and traffic **evenly**. A bad key creates a [hot partition](/t/hot-partition) that takes a
  disproportionate share.
- Too many tiny partitions create overhead of their own.
- Some databases require the partition key to be part of the primary key or unique constraints.

Partitioning isn't always needed. Good indexes solve many "slow big table" problems first.
