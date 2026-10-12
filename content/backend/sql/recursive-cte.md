---
title: "Recursive CTE"
summary: "Querying hierarchies and graphs, like org charts or category trees."
levels: { backend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["recursive cte", "recursive common table expression", "recursive query"]
prereqs: ["cte", "subquery"]
related: ["graph", "self-join", "relational-algebra"]
---

A **recursive CTE** is a common table expression that can reference its own previous result, letting one query walk a hierarchy or graph — an org chart, a bill of materials, a thread of comments, a category tree. It replaces code that would otherwise loop in the application.

A recursive CTE has two parts joined by `UNION [ALL]`:

- a **base case** (anchor) — the starting rows;
- a **recursive term** — joins the CTE's own result back to the table to get the next level.

```sql
WITH RECURSIVE tree AS (
  SELECT id, name, manager_id FROM employees WHERE manager_id IS NULL  -- base
  UNION ALL
  SELECT e.id, e.name, e.manager_id
  FROM employees e JOIN tree t ON e.manager_id = t.id                  -- recurse
)
SELECT * FROM tree;
```

Execution repeats the recursive term until it returns no new rows, accumulating the whole hierarchy level by level.

The classic mistakes:

- No termination guarantee. If the data contains a cycle, the recursion never stops. Add a depth limit or track visited nodes to be safe.
- `UNION ALL` vs `UNION`. `UNION ALL` keeps duplicates and is faster; `UNION` deduplicates but costs more and can accidentally hide intended repeats. Choose deliberately.
- Expecting great performance on deep recursion. Each iteration scans/joins; deep or wide hierarchies get expensive. Index the join column (`manager_id`) and consider materialised paths for frequently queried trees.
- Recursion in the application instead. A loop calling the database once per level is N+1 round trips; the recursive CTE does it in one query. Prefer the CTE for tree reads.
- Assuming full cycle-safety. Even a depth limit changes results silently if it's hit; validate the data or report truncation.

**When to use it:** for querying variable-depth hierarchical data in one statement — ancestors/descendants, path building, transitive closure. For simple one-level self-joins, a plain [self-join](/t/self-join) is simpler. For heavy graph traversal, a [graph database](/t/graph-database) is the specialised tool. See [CTEs](/t/cte).
