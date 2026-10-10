---
title: "Pivot / Unpivot"
summary: "Turning rows into columns and back."
levels: { backend: senior, data-engineer: senior , data-analyst: mid-level }
aliases: ["pivot", "unpivot", "cross tab"]
prereqs: ["sql", "sql-functions"]
related: ["view", "cross-join"]
---

**Pivoting** turns **rows into columns** — taking values that appear as rows and spreading them across columns, usually with aggregation. **Unpivoting** does the reverse, turning columns into rows. It's how you produce a cross-tab report ("sales by region across months") from normalised data.

```text
before (rows):                  after (pivot):
month  region  sales            region   jan    feb
jan    east    10               east     10     20
jan    west    5                west     5      15
feb    east    20
feb    west    15
```

Some databases have a `PIVOT` operator; others (and portable code) do it manually with conditional aggregation:

```sql
SELECT region,
  SUM(CASE WHEN month = 'jan' THEN sales END) AS jan,
  SUM(CASE WHEN month = 'feb' THEN sales END) AS feb
FROM sales GROUP BY region;
```

The classic mistakes:

- Hard-coding the pivot values. The manual form needs one `CASE` per value, so a dynamic set of months/statuses requires either dynamic SQL or accepting a fixed list. That fragility is the main limitation of pivoting.
- Picking the wrong aggregate. A pivot without a `SUM`/`COUNT`/etc. is ambiguous when multiple rows share a cell; decide how to combine them.
- Losing data by pivoting. If the transformed shape is what you store, you've denormalised and will struggle to query new dimensions. Pivot for *presentation/reporting*, keep normalised data as the source.
- Confusing pivot with a join. Pivoting reshapes one set of rows; it doesn't relate tables. A cartesian-looking result is usually a [cross join](/t/cross-join), not a pivot.
- Unpivot surprises with NULLs. Unpivoting columns that may be null can drop rows or produce unexpected results depending on the implementation; handle nulls deliberately.

**When to use it:** for reports and dashboards where a matrix is clearer than a long list — usually at the presentation layer, so the stored data stays normalised. If the column set varies, prefer doing the pivot in the application or in a reporting tool over dynamic SQL. See [views](/t/view) for materialising the shape, and [query plans](/t/query-plan) when it gets slow.
