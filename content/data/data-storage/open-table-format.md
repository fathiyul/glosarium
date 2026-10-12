---
title: "Open Table Formats (Iceberg, Delta, Hudi)"
summary: "Metadata layers that give files in a lake ACID transactions, schemas and time travel."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["Apache Iceberg", "Delta Lake", "Apache Hudi", "table formats", "Iceberg", "Delta"]
prereqs: ["parquet", "hive-partitioning"]
related: ["lakehouse", "file-compaction", "time-travel", "data-catalog-metastore", "partition-pruning", "small-files-problem"]
core: [data-engineer]
---

A pile of Parquet files in object storage is just files: no transactions, no safe updates, no reliable schema changes. An **open table format** (**Apache Iceberg**, **Delta Lake** and **Apache Hudi** are the main ones) adds a **metadata layer on top of the files** that makes them behave like a proper database table.

```
table "orders"
 ├── metadata: list of snapshots, schema, partition spec, which data files belong to each snapshot
 └── data files: part-001.parquet, part-002.parquet, ...   (immutable)
```

The metadata tracks exactly **which files make up the table at each point in time**. A change doesn't edit files in place. It writes new files and commits a new metadata version that points to them.

## What it gives you

- **ACID transactions**: readers see a consistent snapshot, and writers commit atomically. No more half-written partitions visible to queries.
- **Safe row-level updates, deletes and merges** (`MERGE INTO`, `DELETE`) on top of immutable files.
- **Schema evolution**: add, rename or drop columns without rewriting everything, with tracked column identity.
- **Time travel**: query the table as it was at a previous snapshot or time (`SELECT ... AS OF`), and roll back a bad write ([time travel](/t/time-travel)).
- **Partition management**: hidden partitioning and the ability to change the partitioning scheme later (in Iceberg), instead of baking it into folder names ([Hive partitioning](/t/hive-partitioning)).
- **Better performance**: file-level statistics let engines skip files ([predicate pushdown](/t/predicate-pushdown), [partition pruning](/t/partition-pruning)).
- **Multiple engines** can read and write the same tables (Spark, Flink, Trino, warehouses and others, depending on the format and the engine's support).
- **Concurrency control**: commits are validated optimistically, and conflicting writers retry.

## Maintenance you must do

Because every write creates new files and snapshots:

- **Compact small files** ([compaction](/t/file-compaction), [small files problem](/t/small-files-problem)).
- **Expire old snapshots** and **remove orphan files**, or storage grows forever (balance against how much time travel you want).
- Keep an eye on metadata size and the number of snapshots.

## Choosing and caveats

- The three have different histories and strengths, and their features and ecosystem support keep changing. Check which your **engines, catalog and cloud** support well before committing.
- A table format needs a **catalog** to find tables ([catalog and metastore](/t/data-catalog-metastore)).
- They are for **analytical** data. They're not a replacement for a transactional database serving an application ([OLTP vs OLAP](/t/oltp-vs-olap)).
- Interoperability between formats is improving, but you shouldn't assume it.

They're the technology behind the [lakehouse](/t/lakehouse) approach.
