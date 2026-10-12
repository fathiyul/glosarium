---
title: "Partitioned Tables (Hive-Style)"
summary: "Organizing files into folders like date=2024-06-01 so queries can skip data."
levels: { data-engineer: junior , data-scientist: junior }
aliases: ["Hive partitions", "partitioned tables", "partition folders", "key=value partitioning", "date partitioning", "partitioned data lake"]
prereqs: ["row-vs-columnar-formats", "partitioning"]
related: ["partition-pruning", "small-files-problem", "file-compaction", "landing-zone", "predicate-pushdown", "open-table-format"]
core: [data-engineer]
---

**Hive-style partitioning** organizes files into folders named `key=value`, so query engines can skip entire folders that can't
contain what the query wants.

```
orders/
  order_date=2024-06-01/
    part-0001.parquet
    part-0002.parquet
  order_date=2024-06-02/
    part-0001.parquet
  ...
```

The partition value lives in the **path**, not inside the files. A query engine reads the folder names as a column:

```sql
SELECT SUM(total) FROM orders WHERE order_date = '2024-06-02';
-- reads only the order_date=2024-06-02 folder
```

This skipping is [partition pruning](/t/partition-pruning). On a table covering years, that's the difference between reading one day's files and scanning all of them.

## Choosing the partition column

- **Pick something queries filter on** all the time, most often a **date**.
- **Moderate cardinality.** Partitioning by `user_id` creates millions of folders. Date by day, or by hour for huge streams, is typical.
- **Aim for sizeable files** in each partition (hundreds of MB is a common guideline). Too many partitions with tiny files is the
  [small files problem](/t/small-files-problem): slow listings and many tiny reads.
- Multiple levels are possible (`year=2024/month=06/day=01`, or `country=ID/date=...`), but each level multiplies the number of folders.

## Habits

- **Partition by event date** (when it happened) if queries ask about business time, or by **ingestion date** for raw data and
  replay ([landing zone](/t/landing-zone)).
- **Write whole partitions idempotently**: rerunning a day replaces that day's folder, so reruns and
  [backfills](/t/backfill) don't create duplicates.
- **Compact small files** periodically ([file compaction](/t/file-compaction)).
- **Always filter on the partition column.** A query without it scans everything.
- **Filter on the partition column itself.** Wrapping it in a function, or filtering only on a different column such as `order_ts`, may prevent pruning.

Newer [open table formats](/t/open-table-format) manage partition metadata themselves and avoid some of the pitfalls of
folder conventions. The same idea of splitting data to skip work appears in databases ([partitioning](/t/partitioning)).
