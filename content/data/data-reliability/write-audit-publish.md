---
title: "Write-Audit-Publish"
summary: "Writing to a staging table, validating it, then swapping it into production."
levels: { data-engineer: senior , data-scientist: senior }
aliases: ["WAP", "write audit publish", "staging then swap", "audit before publish", "blue-green tables"]
prereqs: ["data-tests", "idempotent-pipeline"]
related: ["data-tests", "circuit-breaker-data", "open-table-format", "data-incident", "data-observability", "partitioned-runs"]
core: [data-engineer]
---

**Write–Audit–Publish (WAP)** is a pipeline pattern that makes sure **bad data never reaches consumers**: you **write** new data to a place consumers can't see, **audit** it with data quality checks, and only if it passes, **publish** it to the production table. If it fails, production keeps serving the previous good data.

```
1. WRITE    → load new results into a staging table / hidden branch / temporary partition
2. AUDIT    → run tests: row counts, uniqueness, not-null, ranges, reconciliation with the source
3. PUBLISH  → if all pass, make it live atomically (swap the table or partition, fast-forward a branch)
              if not, stop, alert and leave production untouched
```

Compare with the usual pattern of writing directly into the production table and testing afterwards. By the time a test fails, dashboards and downstream jobs have already read the bad data, and cleanup means incident response ([data incidents](/t/data-incident)).

## Ways to implement the "isolation" and "publish" steps

- **Staging table + swap**: write to `orders_staging`, test it, then `ALTER TABLE ... RENAME` (or `CREATE OR REPLACE`) to swap it in, in one atomic operation. Some warehouses have a swap command.
- **Partition exchange**: build a new partition separately, validate, then exchange it into the table.
- **Table-format branches**: some [open table formats](/t/open-table-format) support **branches** or snapshot references. You write to a branch, audit it, and **fast-forward** the main branch to include it. Consumers reading the main branch see old data until publish.
- **Blue-green tables or views**: consumers read a view pointing at version A. Build version B, audit it, then repoint the view.

```sql
-- Example shape: staging table, audit, swap (syntax differs by warehouse)
CREATE TABLE analytics.orders_staging AS SELECT ... ;
-- audit: each query should return zero rows
SELECT order_id FROM analytics.orders_staging GROUP BY order_id HAVING COUNT(*) > 1;
SELECT * FROM analytics.orders_staging WHERE total_cents < 0;
-- publish
ALTER TABLE analytics.orders_staging SWAP WITH analytics.orders;       -- warehouse-specific atomic swap
```

## What to audit

- **Structure**: expected columns and types ([schema drift](/t/schema-drift)).
- **Volume**: row counts within a normal range, and not zero.
- **Integrity**: unique keys, not-null, accepted values, referential integrity ([data tests](/t/data-tests)).
- **Business rules**: totals reconcile with a source, no negative amounts ([data reconciliation](/t/data-reconciliation)).
- **Freshness**: the data actually includes the latest period.

## Benefits

- **Consumers never see broken data.** At worst, they see data that's a bit stale, and you know it.
- **Fail safely**: a failed audit blocks publication and alerts, instead of corrupting production.
- **Clear, explicit quality gates** in the pipeline ([circuit breaker for data](/t/circuit-breaker-data)).
- **Easy rollback**: the previous version remains until the swap.

## Costs and cautions

- **Extra storage and compute**: you write the data once to staging, then publish (cheap if the swap is metadata-only, expensive if it copies).
- **Added latency** for the audit step.
- **Decide what a failure means.** Block everything, or publish with a warning for non-critical checks? Tier your tests (critical ones block, others warn).
- **Atomic publish is essential.** A non-atomic "copy then delete" leaves a window with partial data.
- **Combine with idempotent, partitioned runs** so reruns after a failed audit are safe ([idempotent pipelines](/t/idempotent-pipeline), [partitioned runs](/t/partitioned-runs)).
- Audits catch what you thought to test. Keep monitoring for the unexpected ([data observability](/t/data-observability)).
