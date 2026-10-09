---
title: "Partitioned Pipeline Runs"
summary: "Each run processing one time slice, like one day of data."
levels: { data-engineer: mid-level }
aliases: ["partitioned pipeline runs", "date-partitioned runs", "logical date runs", "run per partition", "data interval runs"]
prereqs: ["scheduling-pipelines", "hive-partitioning"]
related: ["idempotent-pipeline", "catchup-reruns", "backfill", "scheduling-pipelines", "hive-partitioning", "late-arriving-data"]
core: [data-engineer]
---

A **partitioned run** is a pipeline run responsible for **one slice of the data**, usually one time interval such as a single day. "The 2024-06-01 run" processes June 1st's data and writes to June 1st's output partition, and nothing else.

```python
def run(logical_date):                                   # passed in by the orchestrator, e.g. "2024-06-01"
    df = read_source(where=f"order_date = '{logical_date}'")
    result = transform(df)
    write(result, partition=f"order_date={logical_date}", mode="overwrite")   # replaces just this partition
```

Compare with a script that processes "everything since I last ran", using the current time. Partitioned runs have **parameters in, a defined slice out**.

## Why it's the standard design

- **Reruns are targeted**: if June 1st was wrong, rerun June 1st, and nothing else changes.
- **Backfills are easy**: run the same job for each date in a range ([backfill](/t/backfill), [catch-up and reruns](/t/catchup-reruns)).
- **Idempotent by construction**: overwriting a partition makes a rerun produce the same result ([idempotent pipelines](/t/idempotent-pipeline)).
- **Runs are independent**, so they can run **in parallel** for different dates.
- **Bounded work** per run: predictable runtime and cost.
- **Matches storage layout**: output partitions line up with [Hive-style partitions](/t/hive-partitioning), so queries prune well.

## Rules

- **Use the logical date, not "now".** `NOW()` inside a job makes a rerun for last week produce different results from the original. The orchestrator supplies the date ([scheduling pipelines](/t/scheduling-pipelines)).
- **Be clear which time defines the slice**: event date or load/ingestion date? ([event time vs processing time](/t/event-time-vs-processing-time))
- **Write only to your own partition.** A run that touches other partitions breaks independence.
- **Handle late data**: either reprocess the last few partitions each run, or schedule periodic corrections ([late-arriving data](/t/late-arriving-data)).
- **Make dependencies partition-aware**: the run for June 1st depends on upstream's June 1st, not "the latest".
- **Time zones**: define the day boundaries (usually UTC) and stick to them ([time zones](/t/timezone)).
- **Choose a sensible granularity.** Hourly runs give fresher data, but create more partitions and runs. Daily is common ([small files problem](/t/small-files-problem)).

## Exceptions

Some computations need all history (a full recompute of customer lifetime value) or can't be sliced cleanly. For those, use full rebuilds or incremental models with care ([incremental models](/t/incremental-models)).
