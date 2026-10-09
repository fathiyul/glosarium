---
title: "Incremental Models"
summary: "Processing only new or changed rows instead of rebuilding a whole table."
levels: { data-engineer: mid-level }
aliases: ["incremental materialization", "dbt incremental", "incremental tables", "incremental transformation"]
prereqs: ["sql-transformation-models", "high-water-mark"]
related: ["dbt", "high-water-mark", "append-vs-merge", "partitioned-runs", "idempotent-pipeline", "late-arriving-data"]
core: [data-engineer]
---

Rebuilding a huge table from scratch on every run is slow and expensive. An **incremental model** processes **only the new or changed rows** and adds them to the existing table. It's the main way to keep large transformation tables up to date at reasonable cost.

In dbt (a common tool for SQL transformations), it looks like this:

```sql
{{ config(
    materialized = 'incremental',
    unique_key = 'order_id'
) }}

SELECT order_id, customer_id, status, total_cents, updated_at
FROM {{ ref('stg_orders') }}

{% if is_incremental() %}
  WHERE updated_at > (SELECT MAX(updated_at) FROM {{ this }})     -- only rows newer than what's already loaded
{% endif %}
```

On the first run, it builds the whole table. On later runs, `is_incremental()` is true, so only newer rows are selected and merged (using `unique_key`) into the existing table ([SQL transformation models](/t/sql-transformation-models), [dbt](/t/dbt)). The logic is a [high-water mark](/t/high-water-mark) applied inside the warehouse.

## How new rows are written

- **Append**: just insert the new rows. Fine for immutable events, but reruns duplicate them.
- **Merge / upsert** on a unique key: update existing rows and insert new ones ([append vs merge](/t/append-vs-merge)).
- **Replace partitions**: delete and rewrite the affected date partitions (an "insert overwrite"). Naturally idempotent ([partitioned runs](/t/partitioned-runs)).

## What can go wrong

- **Late-arriving data**: rows with an old `updated_at` that show up after your last run get missed. Add a **lookback window** (`updated_at > max - 3 days`), and merge on the key to absorb the overlap ([late-arriving data](/t/late-arriving-data)).
- **Deletes** at the source aren't seen, unless there's a soft-delete flag or a snapshot comparison.
- **Logic changes**: if you change the model's SQL, the existing rows were computed the old way. Do a **full refresh** (`dbt run --full-refresh`) or backfill them.
- **Schema changes**: a new column won't automatically exist in the old table. Configure how schema changes are handled.
- **Drift over time**: small errors accumulate. Run periodic full rebuilds or reconcile against the source.
- **Non-idempotent logic** (depending on `now()`) makes reruns inconsistent ([idempotent pipelines](/t/idempotent-pipeline)).
- **Testing is harder**: test both the first run and incremental runs.

## When to use it

Use incremental models for **large, append-heavy tables** where full rebuilds take too long or cost too much. For small tables, a plain table or view is simpler and more obviously correct. Start simple, and switch to incremental when the run time or cost justifies the added complexity.
