---
title: "ETL / ELT"
summary: "Extracting, transforming and loading data between systems."
levels: { backend: mid-level, data-engineer: junior }
aliases: ["ELT", "extract transform load", "ETL pipeline", "data pipeline", "extract load transform"]
prereqs: ["sql", "csv-import-export"]
related: ["batch-vs-stream", "backfill", "upsert", "data-profiling", "mapreduce", "schema-registry"]
core: [data-engineer]
also: [transformation]
---

**ETL** stands for **Extract, Transform, Load**: the standard way to move data from the systems that create it (databases, APIs,
files) into a place where it can be analyzed, usually a data warehouse.

1. **Extract**: read data from the source.
2. **Transform**: clean and reshape it: fix types, remove duplicates, join sources, compute metrics.
3. **Load**: write it to the destination.

```
App database ─┐
SaaS APIs  ───┼─► extract ─► transform ─► load ─► warehouse ─► dashboards, reports
CSV files  ───┘
```

## ETL vs ELT

In **ELT**, you **load the raw data first** and transform it *inside the warehouse*, mostly with SQL.

| | ETL | ELT |
|---|---|---|
| Transform happens | Before loading, on a separate processing system | After loading, in the warehouse |
| Raw data kept? | Often not | Yes, so you can re-transform later |
| Typical today | Legacy and special cases | Common with modern cloud warehouses |

ELT became popular because storage is cheap, warehouses are powerful enough to transform large data themselves, and
keeping the raw data means you can fix your logic and rerun it ([backfill](/t/backfill)). Tools you'll hear about include
orchestrators such as Airflow, transformation tools such as dbt, and managed connectors. The tool names change; the
ideas don't.

## What makes a pipeline good

- **Idempotent**: rerunning it gives the same result, never duplicates ([upsert](/t/upsert), replacing whole partitions).
- **Incremental**: load only what's new or changed, tracked with a timestamp or an ID "watermark", instead of copying everything every time.
- **Observable**: row counts, run times and freshness are monitored, and failures alert someone.
- **Validated**: check the data before trusting it: uniqueness, nulls, ranges, referential integrity
  ([data profiling](/t/data-profiling)).
- **Handles schema changes**: sources add and rename columns without warning.
- **Documented lineage**: you can tell where a number came from.

Pipelines can run on schedules (batch) or continuously ([batch vs stream](/t/batch-vs-stream)). Garbage in a
dashboard usually comes from a small unnoticed problem upstream. Checking data at each stage pays for itself.
