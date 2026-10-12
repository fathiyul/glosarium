---
title: "Idempotent Pipelines"
summary: "Pipelines that produce the same result when rerun, so retries and backfills are safe."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["idempotent pipelines", "idempotent jobs", "idempotent data pipeline", "rerunnable pipeline", "safe to rerun"]
prereqs: ["pipeline-dag", "upsert"]
related: ["pipeline-retries", "backfill", "partitioned-runs", "upsert", "deduplication", "catchup-reruns"]
core: [data-engineer]
---

An **idempotent pipeline** produces **the same result no matter how many times you run it** for the same input. Run it twice, or retry half of it, and you don't get duplicates, double counts or corrupted data. This is the most important property of a reliable data pipeline, because **retries, reruns and backfills are guaranteed to happen**.

## The classic failure

```sql
-- NOT idempotent: appends every time it runs
INSERT INTO daily_revenue SELECT order_date, SUM(total_cents) FROM orders WHERE order_date = '2024-06-01' GROUP BY 1;
-- retry after a partial failure, and 2024-06-01 now has two rows → revenue is doubled
```

## Techniques

**1. Replace the output for the slice you process** (overwrite the partition):

```sql
DELETE FROM daily_revenue WHERE order_date = '2024-06-01';
INSERT INTO daily_revenue SELECT ... WHERE order_date = '2024-06-01';
-- or a single "insert overwrite partition" operation, where the engine supports it; ideally in one transaction
```

**2. Upsert by key** ([upsert](/t/upsert), [merge](/t/append-vs-merge)): same input, same rows, rerun overwrites.

**3. Deterministic logic**: avoid dependence on the current time (`NOW()`), randomness or the arrival order. Take the run's **logical date** as a parameter ([partitioned runs](/t/partitioned-runs)).

**4. Write to a temporary location, then swap**, so a failed run never leaves half-written results visible.

**5. Unique, stable IDs** and deduplication where inputs may repeat ([deduplication](/t/deduplication)).

**6. Idempotent side effects**: use idempotency keys when calling external systems, so a retry doesn't send two emails or charge twice.

## Why it enables everything else

- **Retries are safe** ([pipeline retries](/t/pipeline-retries)).
- **Backfills and reruns are safe**: reprocess any date range after a bug fix ([backfill](/t/backfill), [reruns](/t/catchup-reruns)).
- **Recovery is simple**: when something breaks, rerun it instead of hand-editing data.
- **Orchestrator features** (retry, rerun a failed task) work without fear.

## Test it

Run the pipeline twice on the same input, and compare outputs (row counts, totals, checksums). If the second run changes anything, it isn't idempotent. Also try killing it halfway and rerunning.

## Caveats

- Idempotent doesn't mean "no change": the second run overwrites with identical results.
- Be careful with incremental logic and late-arriving data, where "the same input" may have changed ([incremental models](/t/incremental-models)).
- External, non-reversible actions can only be made idempotent with the other system's help.
