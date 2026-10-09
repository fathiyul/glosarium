---
title: "Date Dimension / Date Spine"
summary: "A table with one row per day and its calendar attributes."
levels: { data-engineer: junior }
aliases: ["date spine", "calendar table", "dim_date", "time dimension", "calendar dimension"]
prereqs: ["dimension-table"]
related: ["fact-table", "role-playing-dimension", "dimensional-modeling", "grain", "dimension-table"]
core: [data-engineer]
---

A **date dimension** is a table with **one row per calendar day** and many columns describing that day. Facts link to it with a date key
instead of every query working out what "quarter" or "is it a weekend" means.

| date_key | date | day_of_week | is_weekend | month | quarter | year | is_holiday |
|---|---|---|---|---|---|---|---|
| 20240601 | 2024-06-01 | Saturday | true | 6 | 2 | 2024 | false |
| 20240602 | 2024-06-02 | Sunday | true | 6 | 2 | 2024 | false |

Typical columns: day name and number, week of year, month name, quarter, year, weekend flag, **fiscal** period (for companies whose
year doesn't start in January), holiday flags and previous or next period references.

## Why bother

- **Consistent calendar logic.** "Q2" or "last week" means the same everywhere, defined once, instead of being rewritten (and
  disagreeing) across a hundred queries.
- **Business attributes** that don't come from simple date math: holidays, fiscal calendars and campaign periods.
- **Easy grouping and filtering**: `GROUP BY d.month_name`, `WHERE d.is_weekend`.

```sql
SELECT d.year, d.quarter, SUM(f.total_cents) AS revenue
FROM fact_orders f
JOIN dim_date d ON d.date_key = f.order_date_key
GROUP BY d.year, d.quarter;
```

## As a date spine

Sales data has no row for a day with zero sales, so a chart skips it or a running average miscounts. A **date spine** (the same
table used as the left side of a join) guarantees every day exists:

```sql
SELECT d.date, COALESCE(SUM(o.total_cents), 0) AS revenue
FROM dim_date d
LEFT JOIN orders o ON o.order_date = d.date
WHERE d.date BETWEEN '2024-01-01' AND '2024-12-31'
GROUP BY d.date
ORDER BY d.date;
```

## Building one

Generate it once, with a script or a SQL series, many years into the past and future (a few thousand rows is tiny):

```sql
-- PostgreSQL
SELECT d::date AS date, EXTRACT(dow FROM d) AS day_of_week
FROM generate_series('2020-01-01'::date, '2035-12-31', '1 day') AS d;
```

## Practical points

- A readable **integer key** like `20240601` is conventional and works well. Handle "unknown or not yet happened" with a special key.
- A fact can reference the date table **several times** under different roles: order date, ship date, delivery date
  ([role-playing dimension](/t/role-playing-dimension)).
- **Decide the time zone** your calendar uses. A `timestamp` needs converting to a date in some zone first
  ([time zones](/t/timezone)).
- Time of day is usually a separate small dimension, or just a column, not part of the date table.

See [dimension tables](/t/dimension-table) and [dimensional modeling](/t/dimensional-modeling).
