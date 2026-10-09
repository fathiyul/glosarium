---
title: "Composite Index"
summary: "An index on several columns, where column order matters."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["multi-column index", "compound index", "concatenated index", "leftmost prefix", "multicolumn index"]
prereqs: ["db-index"]
related: ["db-index", "covering-index", "index-selectivity", "explain-query", "partial-index", "unique-index"]
core: [backend]
---

A **composite index** covers **several columns together**, in a defined order. It serves queries that filter or sort on those columns far better than separate single-column indexes.

```sql
CREATE INDEX idx_orders_customer_created ON orders (customer_id, created_at);
```

Think of a phone book sorted by **last name, then first name**. It's excellent for "all Smiths", and for "Smith, Anna", but useless for finding everyone named Anna. The index is sorted by the **first column**, and within equal values by the **second**, and so on.

## Column order matters: the leftmost prefix rule

An index on `(a, b, c)` can efficiently support queries on:

- `a`
- `a, b`
- `a, b, c`

but **not** (efficiently) on `b` alone, `c` alone or `b, c`.

```sql
-- uses the index fully
SELECT * FROM orders WHERE customer_id = 42 AND created_at >= '2024-06-01';

-- uses it for the filter AND avoids a sort
SELECT * FROM orders WHERE customer_id = 42 ORDER BY created_at DESC LIMIT 20;

-- cannot use it well: skips the leading column
SELECT * FROM orders WHERE created_at >= '2024-06-01';
```

## Choosing the order

1. **Equality conditions first** (`customer_id = ?`), then the **range or sort column** (`created_at`). After a range condition, later columns can't be used for seeking.
2. Put columns **every query uses** before ones used by only some.
3. Consider **selectivity** (how many distinct values) ([index selectivity](/t/index-selectivity)), but equality-before-range usually matters more.
4. Match the **`ORDER BY`**, so the database reads rows already in order and skips the sort.

## Related ideas

- A **covering index** contains every column the query needs, so the database never visits the table ([covering index](/t/covering-index)).
- A **unique composite index** enforces uniqueness across the combination ([unique index](/t/unique-index)).
- A **[partial index](/t/partial-index)** indexes only some rows.

## Habits

- **Design indexes from your real queries**, and check with `EXPLAIN` ([EXPLAIN](/t/explain-query)).
- **Don't create an index for every combination.** Each one slows writes and takes space.
- **Avoid redundant indexes**: an index on `(a, b)` makes a separate index on `(a)` mostly unnecessary.
- **Remember the leftmost rule** when a query "should" use an index but doesn't.
- Revisit them as query patterns change, and drop unused ones.
