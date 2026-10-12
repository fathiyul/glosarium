---
title: "Data Profiling"
summary: "Summarizing a dataset's columns to understand what's really in it."
levels: { data-engineer: junior , data-analyst: mid-level , data-scientist: junior }
aliases: ["profiling data", "data profile", "column profiling", "exploratory data analysis", "EDA"]
prereqs: ["sql", "statistics-basics"]
related: ["data-cleaning", "data-quality-dimensions", "statistics-basics", "percentile", "schema-drift", "sampling-data"]
core: [data-engineer]
---

**Data profiling** means summarizing a dataset's columns to find out **what's really in it**, rather than what the documentation or the column
name claims. It's the first thing to do with any new source, and a regular health check afterwards.

## What to measure per column

| Measure | Why |
|---|---|
| **Row count** | Is it the volume you expected? |
| **Null / empty rate** | Is a "required" column mostly missing? |
| **Distinct count** | Is a supposed key unique? Is a category column exploding in cardinality? |
| **Min / max** | Dates in 1970 or 2099, negative amounts, absurd values |
| **Distribution** | Most common values, [percentiles](/t/percentile), skew ([statistics basics](/t/statistics-basics)) |
| **Format patterns** | Do all phone numbers or dates follow one format? |
| **Data type fit** | Numbers stored as text, mixed types in one column |
| **Relationships** | Do foreign keys match? Orphan rows? Which columns move together? |

```sql
SELECT
  COUNT(*)                                          AS rows,
  COUNT(*) - COUNT(email)                           AS null_emails,
  COUNT(DISTINCT customer_id)                       AS distinct_customers,
  MIN(created_at)                                   AS first_seen,
  MAX(created_at)                                   AS last_seen,
  MIN(amount)                                       AS min_amount,
  MAX(amount)                                       AS max_amount
FROM raw_orders;

-- most common values of a category column
SELECT status, COUNT(*) FROM raw_orders GROUP BY status ORDER BY 2 DESC;
```

Profiling tools can generate these reports for you, but a handful of SQL queries gets you far.

## What it finds

- **Sentinel values** posing as data: `-1`, `9999-12-31`, `"unknown"`, `"N/A"`.
- **Duplicate keys** where uniqueness was assumed.
- **Silent changes** in a source: a column that was 2% null last month and is 40% null today ([schema drift](/t/schema-drift)).
- **Surprises in meaning**: the "date" column is actually updated whenever the row is touched, not created.

## Habits

- **Do it before designing transformations**, and look at real values, not just summaries.
- **Check a sample of actual rows** too ([sampling data](/t/sampling-data)). Numbers can hide things you'd see instantly in ten rows.
- **Turn what you learn into rules** (tests, [cleaning steps](/t/data-cleaning), quality checks) so the knowledge doesn't stay in your
  head ([data quality dimensions](/t/data-quality-dimensions)).
- **Profile regularly** and compare to the previous run, since changes in the profile often signal an upstream issue before anyone
  reports a wrong number.
- Profiling large tables can be expensive, so use sampling or approximate methods when exactness isn't needed.
