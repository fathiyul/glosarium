---
title: "Lakehouse"
summary: "Warehouse-style tables and transactions on top of cheap lake storage."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["data lakehouse", "lakehouse architecture", "lake house"]
prereqs: ["data-lake", "data-warehouse"]
related: ["open-table-format", "data-lake", "data-warehouse", "medallion-architecture", "compute-storage-separation", "data-catalog-metastore"]
core: [data-engineer]
---

A **lakehouse** combines the two older ideas: the **cheap, open, flexible storage of a [data lake](/t/data-lake)** with the **reliability and performance features of a [data warehouse](/t/data-warehouse)**: transactions, schemas, fast SQL. The term was popularized by Databricks, and the approach is built into
several platforms.

```
        files in object storage (Parquet)
                 ▲
   open table format (metadata, transactions, schema, time travel)
                 ▲
   query engines: SQL, Spark, ML, BI tools, all reading the same tables
```

## The problem it addresses

Teams often ran both: a lake for raw data and ML, and a warehouse for BI. That meant two copies of data, pipelines to move between them, two sets of access rules and arguments about which numbers were right. A lakehouse aims to keep **one copy** that serves both.

## What makes it possible

- **Open file formats** (mostly [Parquet](/t/parquet)) on cheap object storage.
- An **[open table format](/t/open-table-format)** (Apache Iceberg, Delta Lake, Apache Hudi) on top of those files, giving **ACID transactions, schema enforcement and evolution, time travel and row-level updates and deletes**.
- A **catalog** that registers tables and their locations ([catalog and metastore](/t/data-catalog-metastore)).
- **Separation of storage and compute**: engines scale independently from the data ([storage and compute separation](/t/compute-storage-separation)).
- **Fast query engines** with the usual optimizations: columnar reads, pruning, caching ([partition pruning](/t/partition-pruning), [predicate pushdown](/t/predicate-pushdown)).

Data is commonly organized in layers from raw to curated ([medallion architecture](/t/medallion-architecture)).

## Benefits

- Less duplication and fewer movements of data.
- Many tools (SQL, Spark, Python, ML) can work on the same tables.
- Openness: your data isn't locked inside one vendor's proprietary storage.
- Handles structured and semi-structured data, and supports streaming and batch.

## Things to be realistic about

- It's an **architecture and a marketing term**, and different vendors implement it differently, with varying maturity. Check specifics for the features you need (concurrent writes, governance, performance).
- You take on **table maintenance** (compaction, snapshot cleanup) ([compaction](/t/file-compaction), [small files](/t/small-files-problem)).
- A good warehouse may still outperform for pure BI workloads. The lakehouse's strength is flexibility.
- **Governance and quality** don't come automatically. You still need them ([data governance](/t/data-governance)).

Choose based on your workloads, your team's skills and your tolerance for operational work.
