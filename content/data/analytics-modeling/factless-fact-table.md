---
title: "Factless Fact Table"
summary: "A fact table recording that something happened, with no measures."
levels: { data-engineer: senior , data-scientist: senior }
aliases: ["factless fact tables", "factless fact", "event fact table", "coverage table"]
prereqs: ["fact-table", "grain"]
related: ["fact-table-types", "dimensional-modeling", "bridge-table", "degenerate-dimension", "date-dimension", "conformed-dimension"]
---

A **factless fact table** has foreign keys to dimensions but **no numeric measures**. Its rows exist to record that something happened, or that a combination of dimension values was possible. You count rows instead of summing numbers.

## Two uses

Event tracking. One row per occurrence: a student attended a class, an employee was present, a user logged in, a truck passed a checkpoint.

```
fact_attendance
date_key | student_key | course_key | instructor_key
```

"How many students attended per course per day?" is `COUNT(*)`, grouped by the dimensions.

Coverage (or eligibility). One row per dimension combination that was allowed or in effect: which products were on promotion in which stores, which plans a customer was eligible for, which rooms were available. This is where factless tables earn their keep, because they let you ask about **absence**:

```sql
-- sales of products that were NOT on promotion
SELECT s.order_id, s.product_key
FROM fact_sales s
LEFT JOIN fact_promotion_coverage c
  ON c.date_key = s.date_key
 AND c.store_key = s.store_key
 AND c.product_key = s.product_key
WHERE c.product_key IS NULL;
```

## Why it matters

The classic mistake is refusing to call it a fact table because it has no measures, and then either skipping it (losing the ability to ask "what didn't happen?") or padding it with a dummy `1` column that later gets summed as if it meant something. A factless table is still a fact table: it has a [grain](/t/grain), dimensions and rows, and its measure is its **row count**.

## Trade-offs and cautions

- It's still a fact table, so it can be large; event tracking at a fine grain grows quickly.
- A coverage table is often modeled as a [bridge table](/t/bridge-table) when it resolves a many-to-many relationship.
- Counting rows is cheap, but you cannot aggregate a magnitude from it. If you later need a quantity or amount, add a real measure.
- Keep the grain explicit. A coverage table that mixes "was eligible" with "actually happened" in one table is confusing.
