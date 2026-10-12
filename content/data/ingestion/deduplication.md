---
title: "Deduplication"
summary: "Removing duplicate records that at-least-once delivery and retries create."
levels: { data-engineer: junior , data-scientist: junior }
aliases: ["dedupe", "dedup", "removing duplicates", "duplicate records", "deduplicating data"]
prereqs: ["data-ingestion", "window-function"]
related: ["upsert", "high-water-mark", "idempotence", "merge-statement", "append-vs-merge", "window-function"]
core: [data-engineer]
---

**Duplicates** are inevitable in data pipelines. Retries, at-least-once message delivery, overlapping extract windows, reprocessed
files and source systems that resend records all produce the same record twice (or ten times). **Deduplication** removes
them, so counts and sums aren't inflated.

## First, define "the same"

Duplicates can be:

- **Exact**: every column identical (a retried insert).
- **By key**: the same business key (`order_id`) with different values, such as an order that was updated three times. Here you
  have to decide which version to keep, usually the **latest**.

An `event_id` or business key that's unique per real-world thing is what makes this possible.

## Keeping the latest per key

The standard SQL pattern uses a [window function](/t/window-function):

```sql
SELECT *
FROM (
  SELECT *,
         ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY updated_at DESC, ingested_at DESC) AS rn
  FROM raw_orders
) t
WHERE rn = 1;
```

Add a **tie-breaker** to the `ORDER BY` so the result is deterministic. If two rows share a timestamp and you don't, you
may keep different ones on different runs.

`SELECT DISTINCT` only removes rows that are identical in *every* selected column, so it won't resolve "the same order with a newer
status".

## Where to deduplicate

| Where | How |
|---|---|
| **On load** | [Upsert / merge](/t/upsert) on the key, so repeated loads overwrite instead of append ([append vs merge](/t/append-vs-merge)) |
| **In transformation** | Dedupe the raw layer into a clean one, as above. Keeping the raw copy untouched means you can fix the logic later |
| **In a stream** | Remember recent IDs within a time window and drop repeats. The state must be bounded, so you only catch duplicates within that window |

## Design rules

- **Prefer making loads idempotent**: rerunning a job shouldn't create duplicates in the first place
  ([idempotence](/t/idempotence)).
- **Don't delete the raw duplicates.** Dedupe downstream.
- **Test it**: assert uniqueness of the key on the clean table, and alert when duplicates appear, since a
  sudden jump often means an upstream bug.
- Watch for **near-duplicates** (the same customer typed slightly differently). That's a harder matching problem than exact dedupe.
