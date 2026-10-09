---
title: "Batch Processing"
summary: "Processing a bounded chunk of data in one run."
levels: { data-engineer: junior }
aliases: ["batch jobs", "batch pipeline", "batch data processing", "bounded data processing"]
prereqs: ["etl"]
related: ["batch-vs-stream", "apache-spark", "single-node-engines", "distributed-computing", "data-partitions-compute", "transformations-vs-actions"]
core: [data-engineer]
---

**Batch processing** means running computation over a **bounded chunk of data**, such as yesterday's events, the whole customer table or a
folder of files, in a single run that has a start and an end. It's the traditional and still most common way to build data
pipelines.

```
00:00-23:59 events land in storage ─► 02:00 job runs on that day's partition ─► results table ready by 03:00
```

Typical batch work: nightly aggregations, rebuilding a reporting table, model training, monthly billing, backfilling history.

## Why it's the default

- **Simple mental model**: input in, output out.
- **Easy to rerun.** If it fails or the logic was wrong, run it again on the same input. This is more forgiving than a streaming
  system's state.
- **Efficient**: process lots of data at once, in big sequential reads, with compute only paid for while it runs.
- Fits most reporting needs, where "as of last night" is enough ([batch vs stream](/t/batch-vs-stream)).

## Engines

- A script with SQL or [pandas](/t/pandas), on one machine.
- [Single-node engines](/t/single-node-engines) like DuckDB or Polars for data that fits on one big machine.
- [Apache Spark](/t/apache-spark) and similar for data too large for one machine
  ([distributed computing](/t/distributed-computing)).
- Warehouse SQL (the transformation runs inside the warehouse).

## Designing good batch jobs

- **Process by partition**, such as one day at a time, so runs are bounded and reruns are targeted
  ([Hive partitioning](/t/hive-partitioning)).
- **Make them idempotent**: rerunning a day **replaces** that day's output rather than appending to it, so retries and
  [backfills](/t/backfill) don't create duplicates.
- **Parameterize the time window** (`--date 2024-06-01`) instead of using "now" inside the job. This is what makes backfills possible.
- **Handle late data**: decide how long to wait for stragglers, and whether to reprocess recent days.
- **Make them observable**: log row counts and durations, and check outputs, since a job that "succeeds" with empty output is a silent failure.
- **Mind the schedule**: dependencies, runtimes growing over time, and the deadline when someone needs the result.

When freshness in seconds matters, you want streaming instead. See [batch vs streaming ingestion](/t/batch-vs-streaming-ingestion) for the
ingestion side.
