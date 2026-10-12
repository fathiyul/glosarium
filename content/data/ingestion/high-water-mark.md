---
title: "High-Water Mark"
summary: "Remembering the last loaded timestamp or ID to know where to resume."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["watermark column", "incremental load watermark", "last loaded timestamp", "checkpoint", "bookmark"]
prereqs: ["full-vs-incremental-load"]
related: ["full-vs-incremental-load", "log-based-cdc", "backfill", "deduplication", "append-vs-merge", "schema-drift"]
core: [data-engineer]
---

A **high-water mark** is a stored value, usually the **largest timestamp or ID already loaded**, that tells an incremental pipeline **where to resume**. Each run reads only records beyond the mark, then advances it.

```sql
-- 1. read the mark from a control table
SELECT last_loaded_at FROM etl_state WHERE table_name = 'orders';        -- e.g. 2024-06-01 09:00:00

-- 2. extract only newer rows from the source
SELECT * FROM source.orders WHERE updated_at > '2024-06-01 09:00:00';

-- 3. after loading successfully, advance the mark to the max value seen
UPDATE etl_state SET last_loaded_at = '2024-06-01 10:00:00' WHERE table_name = 'orders';
```

It's far cheaper than copying everything on every run, and it's the simplest form of incremental loading ([full vs incremental](/t/full-vs-incremental-load)).

## Rules that keep it correct

- **Advance the mark only after the load succeeded**, and ideally in the same transaction as the load. If you update it first and the load fails, you silently skip data. If the mark advances late, you reload a batch (fine, if the load is idempotent).
- **Take the max from the data you actually loaded**, not "now". Otherwise rows that arrive between the query and the update get skipped.
- **Make the load idempotent**, so reprocessing the boundary is harmless ([merge](/t/append-vs-merge), [deduplication](/t/deduplication)).
- **Store the mark durably and per source table**, in a control table or in your orchestrator's state.

## Where it goes wrong

- **Late-committed rows.** A transaction that began earlier can commit later with an *older* `updated_at`, falling behind your mark, so it's never loaded. Use a **lookback window** (`> mark - 1 hour`) and rely on idempotent merges to absorb the overlap.
- **Ties**: many rows with the same timestamp at the boundary. A strict `>` can skip some when a batch cuts mid-timestamp. Use `>=` plus deduplication, or a composite mark (`updated_at, id`).
- **Unreliable columns**: the source doesn't update `updated_at` on every change, or it's set in a local time zone. Verify with [profiling](/t/data-profiling).
- **Non-monotonic IDs**: IDs from several writers or sequences with gaps aren't strictly increasing in commit order.
- **Deletes** are invisible. Use change data capture or periodic reconciliation ([log-based CDC](/t/log-based-cdc)).
- **Clock skew** between systems.
- **Backfills**: you need a way to reset or override the mark for a range ([backfill](/t/backfill)).

## Alternatives

Change data capture uses a **log position** as its mark, and file ingestion tracks **processed file names**. The idea is the same: remember how far you've got.
