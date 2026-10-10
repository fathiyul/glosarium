---
title: "HAVING"
summary: "Filtering groups after aggregation."
levels: { backend: junior, frontend: mid-level, data-engineer: junior , data-analyst: junior }
aliases: ["HAVING clause"]
prereqs: ["crud"]
related: ["sql-sublanguages", "constraint", "self-join"]
---

`HAVING` filters groups after they've been formed by `GROUP BY`. `WHERE` filters individual rows before grouping. Use `WHERE` for conditions on the rows themselves, and `HAVING` for conditions on the totals or counts of each group.

```sql
-- Customers who have placed at least 5 orders
SELECT customer_id, COUNT(*) AS order_count
FROM orders
GROUP BY customer_id
HAVING COUNT(*) >= 5;
```

Here `COUNT(*)` is computed per customer, and `HAVING` keeps only the groups with five or more. A `WHERE` clause can't do this, because it runs before the counting happens.

The classic mistake is putting an aggregate condition in `WHERE`, such as `WHERE COUNT(*) >= 5`. Most databases reject it with an error, because the count doesn't exist yet at that stage. The reverse mistake, putting a plain row condition in `HAVING`, usually works but is harder to read and may be slower, so filter rows in `WHERE` whenever you can.
