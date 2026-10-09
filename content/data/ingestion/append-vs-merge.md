---
title: "Append vs Upsert (MERGE)"
summary: "Adding new rows vs updating existing ones by key."
levels: { data-engineer: mid-level }
aliases: ["append vs upsert", "append-only vs merge", "insert vs upsert loads", "merge load", "append load"]
prereqs: ["full-vs-incremental-load", "upsert"]
related: ["upsert", "merge-statement", "deduplication", "high-water-mark", "full-vs-incremental-load", "scd-types"]
core: [data-engineer]
---

When loading new data into a table, there are two basic write patterns.

| | **Append** | **Merge (upsert)** |
|---|---|---|
| What it does | Adds new rows only (`INSERT`) | Inserts new rows, and **updates existing ones** that match a key |
| Needs a key? | No | Yes (the match condition) |
| History | Keeps every version/event as its own row | Keeps only the latest state per key |
| Duplicates on rerun | **Yes**, unless deduplicated | No: reruns overwrite |
| Cost | Cheap, a simple write | More expensive: it must find matching rows |
| Typical for | Events, logs, clickstream, transactions, raw layers | Current-state tables: customers, products, orders with changing status |

```sql
-- Append
INSERT INTO raw_events SELECT * FROM staging_events;

-- Merge
MERGE INTO dim_customer t
USING staging_customers s ON t.customer_id = s.customer_id
WHEN MATCHED THEN UPDATE SET name = s.name, email = s.email, updated_at = s.updated_at
WHEN NOT MATCHED THEN INSERT (customer_id, name, email, updated_at)
                      VALUES (s.customer_id, s.name, s.email, s.updated_at);
```

(Syntax varies by database. See [MERGE](/t/merge-statement) and [upsert](/t/upsert).)

## How to choose

- **Data is a series of facts that never change** (an event happened): **append**. History is the point, and each event is unique.
- **Data is the current state of an entity that changes**: **merge**, to keep one row per entity. Or append every version, then derive the latest ([deduplication](/t/deduplication)).
- **Raw/landing layers** are usually append-only, to keep everything received. Cleaned layers may merge ([landing zone](/t/landing-zone)).
- **Need history of changes** (what was this customer's address last year)? Append versions, or use a slowly changing dimension design ([SCD types](/t/scd-types)).

## Idempotency

A rerun of an **append** job duplicates data unless you guard it: delete-then-insert for that partition, or deduplicate afterwards, or record which batches have loaded. A **merge** is naturally rerunnable, since the same input produces the same result. Prefer one of these to a blind append when jobs may retry
([incremental loads](/t/full-vs-incremental-load), [high-water marks](/t/high-water-mark)).

## Cautions for merge

- **Duplicate keys in the source batch** cause errors or arbitrary results. Deduplicate the incoming data first.
- **Out-of-order data**: don't overwrite a newer row with an older one. Add a condition (`WHEN MATCHED AND s.updated_at > t.updated_at`).
- **Performance**: merges on very large tables can be heavy. Limit by partition or by a date range where possible.
- **Deletes** aren't handled by default. Handle them explicitly, if the source signals deletions.
