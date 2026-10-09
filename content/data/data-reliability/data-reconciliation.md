---
title: "Data Reconciliation"
summary: "Checking that totals match between source and destination."
levels: { data-engineer: mid-level }
aliases: ["reconciliation", "source-to-target reconciliation", "data validation between systems", "reconciling totals", "row count reconciliation"]
prereqs: ["data-ingestion", "data-quality-dimensions"]
related: ["data-quality-dimensions", "data-tests", "data-observability", "full-vs-incremental-load", "log-based-cdc", "data-incident"]
core: [data-engineer]
---

**Data reconciliation** means **comparing the data in two places and confirming they agree**: the source system and the warehouse, the warehouse and a finance report, a pipeline's input and its output. It's how you verify that nothing was lost, duplicated or corrupted along the way, and the main way to check **accuracy** ([data quality dimensions](/t/data-quality-dimensions)), which internal tests alone can't prove.

## What to compare, from cheap to thorough

1. **Row counts**: the source has 1,204,331 orders for the period. Does the target?
2. **Aggregates**: sum of `total_cents`, counts by status, min and max dates.
3. **Key-level comparison**: which IDs exist on one side but not the other (missing or extra rows).
4. **Checksums or hashes** of rows or groups, to find rows that differ without comparing every column by hand.
5. **Full row comparison** for critical data or samples.

```sql
-- compare daily totals between source and warehouse
SELECT COALESCE(s.day, w.day) AS day, s.total AS source_total, w.total AS warehouse_total,
       w.total - s.total AS difference
FROM source_daily s
FULL JOIN warehouse_daily w ON w.day = s.day
WHERE s.total IS DISTINCT FROM w.total;
```

```sql
-- IDs present in the source but missing from the warehouse
SELECT s.order_id FROM source_orders s LEFT JOIN warehouse_orders w USING (order_id) WHERE w.order_id IS NULL;
```

## Where it matters most

- **After ingestion**, especially incremental loads, which can silently miss rows (late commits, deleted rows) ([full vs incremental](/t/full-vs-incremental-load)).
- **Finance and billing data**, where totals must match the books and the payment provider.
- **Migrations** from one system to another.
- **Downstream reports vs source of truth.**

## Practical considerations

- **Compare like with like**: the same time window, time zone, filters and definitions. Many "mismatches" are definition differences ([metric definitions](/t/metric-definitions)).
- **Allow for timing**: the source keeps changing while you load. Compare closed periods (yesterday), or use a consistent snapshot point.
- **Decide tolerances**: some processes legitimately differ slightly (rounding, late data). Define acceptable differences, and investigate beyond them.
- **Automate and schedule it**, with alerts, instead of one-off manual checks. Store the results over time to see trends.
- **Investigate every unexplained difference.** Small gaps often reveal systematic bugs (deletes not captured, timezone cutoffs, duplicate handling).
- **Keep deletes and updates in mind**: row counts can match while values differ.
- **Reconcile at multiple stages** (source to landing, landing to modeled), so you can tell where a discrepancy was introduced.

Reconciliation is slower and less glamorous than tests, but it's what answers the question people actually ask: **"does this number match reality?"**
