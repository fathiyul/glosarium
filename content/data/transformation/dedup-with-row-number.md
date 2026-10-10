---
title: "Deduplicating with ROW_NUMBER"
summary: "Keeping one row per key using a window function."
levels: { data-engineer: junior , data-analyst: mid-level }
aliases: ["ROW_NUMBER dedup", "deduplicate with window function", "keep latest row per key", "dedupe SQL", "QUALIFY ROW_NUMBER"]
prereqs: ["window-function", "deduplication"]
related: ["deduplication", "qualify-clause", "window-function", "cte", "upsert"]
core: [data-engineer]
---

The standard SQL recipe for "keep one row per key" is `ROW_NUMBER()` over a partition. You rank the rows within each key in the order you
prefer, then keep rank 1.

```sql
WITH ranked AS (
  SELECT *,
         ROW_NUMBER() OVER (
           PARTITION BY customer_id            -- one winner per customer
           ORDER BY updated_at DESC,           -- newest first
                    ingested_at DESC           -- tie-breaker
         ) AS rn
  FROM raw_customers
)
SELECT * EXCEPT (rn)         -- exact syntax for dropping a column varies by database
FROM ranked
WHERE rn = 1;
```

Three decisions are in there:

1. **`PARTITION BY`**: what makes two rows "the same" (the business key).
2. **`ORDER BY`**: which one wins (latest, earliest, highest priority).
3. **`WHERE rn = 1`**: keep only the winner.

## Variations

| Goal | Change |
|---|---|
| Keep the **latest** | `ORDER BY updated_at DESC` |
| Keep the **first** seen | `ORDER BY created_at ASC` |
| Keep the best-quality record | `ORDER BY` a CASE expression ranking sources |
| Identify the **duplicates** (rows that would be dropped) | `WHERE rn > 1` |

Some databases (Snowflake, BigQuery, DuckDB and others) support [`QUALIFY`](/t/qualify-clause), which filters on a window function directly
and removes the wrapper:

```sql
SELECT *
FROM raw_customers
QUALIFY ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY updated_at DESC) = 1;
```

## Mistakes to avoid

- **Missing tie-breaker.** If two rows have the same `updated_at`, `ROW_NUMBER` picks one arbitrarily, and the choice can change between runs,
  making your pipeline non-deterministic. Always add a final unique column to the `ORDER BY`.
- **Wrong `ORDER BY` direction** (keeping the oldest by accident). Spot-check a few keys by hand.
- **Using `SELECT DISTINCT`** when rows differ in some column. It won't collapse them.
- **Nulls in the ordering column**: where they sort differs between databases. Use `NULLS LAST` or `COALESCE`.
- **Deduplicating the wrong layer.** Keep the raw copy untouched and dedupe into a cleaned table
  ([landing zone](/t/landing-zone)).

## Verify the result

```sql
SELECT COUNT(*) AS rows, COUNT(DISTINCT customer_id) AS keys FROM clean_customers;   -- these must match
```

Add this as an automated uniqueness test. For the broader picture of why duplicates appear and where to remove them, see
[deduplication](/t/deduplication).
