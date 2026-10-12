---
title: "Single-Node Engines (DuckDB, Polars)"
summary: "Fast local processing that often makes a cluster unnecessary."
levels: { data-engineer: junior , data-analyst: mid-level , data-scientist: junior }
aliases: ["DuckDB", "Polars", "single-machine data processing", "local analytics engines", "in-process analytics"]
prereqs: ["dataframe", "row-vs-columnar-formats"]
related: ["apache-spark", "pandas", "distributed-query-engine", "batch-processing", "dataframe", "spill-to-disk"]
core: [data-engineer]
---

**Single-node engines** process data on **one machine**, but do it fast enough that many jobs people assume need a cluster don't. Two
popular examples:

- **DuckDB**: an in-process analytical SQL database. You query files directly. No server to run.
- **Polars**: a DataFrame library written in Rust, with a lazy, parallel query engine.

```python
import duckdb

duckdb.sql("""
    SELECT country, SUM(amount) AS revenue
    FROM 'orders/*.parquet'
    GROUP BY country
    ORDER BY revenue DESC
""").show()
```

```python
import polars as pl

(pl.scan_parquet("orders/*.parquet")
   .filter(pl.col("status") == "paid")
   .group_by("country").agg(pl.col("amount").sum())
   .collect())
```

## Why they're fast

- **Columnar and vectorized**: they read only the needed columns and process data in batches, using all CPU cores
  ([row vs columnar](/t/row-vs-columnar-formats)).
- **They query files in place** (Parquet, CSV, JSON) without a load step.
- **Out-of-core execution**: many can spill to disk when data exceeds memory ([spill to disk](/t/spill-to-disk)), so
  "bigger than RAM" doesn't automatically mean "needs Spark".
- **No cluster overhead**: no scheduling, network shuffles or serialization between machines.

## Why this matters

Modern machines have many cores, lots of memory and fast disks. A great deal of analytical data, often hundreds of gigabytes, can be
processed on a single powerful machine, which is far simpler to run, debug and pay for than a cluster. A cluster brings
operational complexity: configuration, failures, data movement and cost ([Apache Spark](/t/apache-spark)).

## When to reach for a cluster instead

- Data or processing truly exceeds a single machine's memory, disk or time budget.
- You need to **scale out** continuously as data grows, or share one engine across many concurrent users and jobs
  ([distributed query engines](/t/distributed-query-engine)).
- Your platform already standardizes on one.

## Practical advice

- **Start on one machine.** Measure. Add distribution when you have evidence you need it.
- Compare options on **your** data and queries. Benchmarks vary widely with workload.
- They're also excellent for local development, testing pipelines and ad-hoc analysis ([DataFrames](/t/dataframe)).
- They're not a replacement for a shared warehouse with concurrency, access control and governance. They complement it.
