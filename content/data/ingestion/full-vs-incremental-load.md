---
title: "Full vs Incremental Load"
summary: "Reloading everything each time vs only what changed."
levels: { data-engineer: junior }
aliases: ["full load", "incremental load", "delta load", "incremental extract", "full refresh"]
prereqs: ["data-ingestion"]
related: ["high-water-mark", "log-based-cdc", "upsert", "merge-statement", "append-vs-merge", "backfill"]
core: [data-engineer]
---

Two ways to keep a copy of source data up to date:

- **Full load**: copy **everything** each time, replacing the previous copy.
- **Incremental load**: copy **only what's new or changed** since last time.

| | Full | Incremental |
|---|---|---|
| Simplicity | Very simple | More logic and state to manage |
| Cost on big tables | Grows with the table | Grows with the amount of change |
| Catches deletes? | Yes (they're just missing from the new copy) | Not by default |
| Catches changes to old rows? | Yes | Only if you can detect them |
| Failure recovery | Rerun | Rerun carefully, from a known position |

```sql
-- full: replace the whole table
TRUNCATE TABLE dw.customers;
INSERT INTO dw.customers SELECT * FROM source.customers;

-- incremental: only rows changed since the last run (a high-water mark)
SELECT * FROM source.customers WHERE updated_at > :last_loaded_at;
```

## How incremental detects change

- **A timestamp or increasing ID** column, tracked by a [high-water mark](/t/high-water-mark). It requires that the source reliably
  updates `updated_at` on every change.
- **Change data capture**, reading the database's log of inserts, updates and deletes
  ([log-based CDC](/t/log-based-cdc)). It's the most complete, including deletes.
- **File or partition arrival**: process each new file or day only.

## Pitfalls of incremental

- **Deletes are invisible** to a timestamp query, so rows deleted at the source remain in your copy. Use CDC, soft-delete flags, or
  periodic full refreshes.
- **Late-arriving changes**: a transaction that commits after your query ran may carry an older timestamp and be missed. Use a safety
  **overlap** (re-read the last hour or day) and make the load idempotent, so overlap just overwrites.
- **Clock and time-zone problems** between systems.
- **Writing it**: append (duplicates) vs [merge](/t/merge-statement) on a key
  ([append vs merge](/t/append-vs-merge), [upsert](/t/upsert)).
- **Drift**: small errors accumulate unnoticed. A periodic **reconciliation** (compare counts and totals with the source) catches them.

## Choosing

Start with **full loads for small tables**. They're simple and correct. Move to incremental when the table is too big or too slow to
copy, and when you do, add reconciliation. Many systems combine both: incremental daily and a full refresh weekly. A
[backfill](/t/backfill) is effectively a controlled full or ranged reload.
