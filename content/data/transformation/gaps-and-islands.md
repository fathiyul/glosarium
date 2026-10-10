---
title: "Gaps and Islands"
summary: "Finding consecutive runs and breaks in sequences with SQL."
levels: { data-engineer: mid-level , data-analyst: mid-level }
aliases: ["islands and gaps", "consecutive runs", "find gaps in dates", "streaks SQL"]
prereqs: ["window-function", "group-by"]
related: ["window-function", "date-dimension", "recursive-cte", "group-by", "dedup-with-row-number", "deduplication"]
---

Gaps and islands is a family of SQL problems about consecutive runs and the breaks between them: which days a user logged in a row, which ranges of IDs are missing, when a service stayed up continuously. The "islands" are the runs; the "gaps" are the missing stretches.

**The classic mistake is a self-join or a loop** that compares every row with every other. It's slow, and it's easy to get the boundaries wrong. The standard trick is arithmetic on a [window function](/t/window-function): give each row a row number in order, then subtract it from the sequence.

```sql
SELECT user_id, MIN(day) AS start_day, MAX(day) AS end_day, COUNT(*) AS run_length
FROM (
  SELECT user_id, day,
         day - CAST(ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY day) AS INTEGER) AS grp
  FROM (SELECT DISTINCT user_id, day FROM logins) d
) t
GROUP BY user_id, grp;
```

Consecutive days and consecutive row numbers advance together, so the date minus its row number is constant within a run and changes when a day is skipped. Grouping by that value collapses each island into one row.

## Points to watch

- Deduplicate first. `SELECT DISTINCT` is essential: a repeated day breaks the numbering and splits one island into two.
- Date arithmetic differs. The `day - row_number` shortcut works where `date - integer` yields a date (PostgreSQL, DuckDB), so cast the row number to an integer. MySQL, BigQuery and Spark need their own date functions, so adapt the expression.
- Order by the real sequence. The column you subtract from must be dense and ordered — dates, an integer id, a rank.

## Finding the gaps

The gaps are the complement: look at each row's previous value and flag a jump larger than one step.

```sql
SELECT user_id, prev_day, day
FROM (
  SELECT user_id, day,
         LAG(day) OVER (PARTITION BY user_id ORDER BY day) AS prev_day
  FROM (SELECT DISTINCT user_id, day FROM logins) d
) t
WHERE day - prev_day > 1;
```

A [date spine](/t/date-dimension) — a table with one row per day — is the other way to find gaps: left-join it to the events and keep the rows with no match. You can build one with a [recursive CTE](/t/recursive-cte) when the database has no date generator. See [window functions](/t/window-function) and [deduplication](/t/deduplication).
