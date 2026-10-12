---
title: "Cross Join"
summary: "Every row of one table paired with every row of another."
levels: { backend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["cross join", "cartesian join", "cartesian product"]
prereqs: ["join", "sql"]
related: ["self-join", "subquery", "sequence"]
---

A **cross join** produces the **cartesian product** of two tables: every row of the first paired with every row of the second. If one table has 1,000 rows and the other 1,000, the result has 1,000,000. There's no join condition — it's the "all combinations" operation.

```sql
-- every size × every color → all combinations
SELECT s.size, c.color FROM sizes s CROSS JOIN colors c;
```

Legitimate uses are deliberate combinations: generating all size/colour variants, building a calendar of dates × regions, or producing test data. It's the right tool when you genuinely want every pairing.

The classic mistakes:

- Accidentally creating one. The dangerous case: a join with a missing or wrong `ON`/`WHERE` condition silently becomes a cross join, exploding the result. A query that "used to work" can suddenly return millions of rows. Always check that your joins have conditions.
- Forgetting it scales multiplicatively. Table sizes multiply; a cross join of three modest tables can be enormous. Add a limiting condition or generate combinations another way if the product is huge.
- Using it for a join you didn't mean. Often the intent is a relationship (orders to customers), not all combinations — that's an inner join with a key. Cross join is for "all pairs", not "matching pairs".
- Assuming order. The result isn't guaranteed to be in any particular order unless you add `ORDER BY`.
- Confusing it with a self-join. A [self-join](/t/self-join) joins a table to itself (with a condition, like manager→employee); a cross join between the same table gives every pair including each row with itself.

**When to use it:** deliberately, to enumerate combinations — and be explicit (`CROSS JOIN`) so readers know it's intentional, not an accident. Anywhere else, an unexpected cartesian product is a bug to hunt down, usually by finding the join that lost its condition. It's a fundamental relational operation, alongside the selectivity that makes indexed joins cheap.
