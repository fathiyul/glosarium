---
title: "UNION, INTERSECT, EXCEPT"
summary: "Combining the results of several queries."
levels: { backend: junior, data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["UNION", "INTERSECT", "EXCEPT", "set operators"]
prereqs: ["crud"]
related: ["sql-sublanguages", "self-join", "table-row-column"]
---

Set operators combine the rows returned by two queries. Both queries must return the same number of columns, with compatible types in each position.

```sql
-- Every email address we know, once each
SELECT email FROM newsletter_signups
UNION
SELECT email FROM customers;
```

- `UNION` combines the results and removes duplicates.
- `UNION ALL` combines the results and keeps duplicates. Removing duplicates takes extra work, so `UNION ALL` can be faster when duplicates don't matter.
- `INTERSECT` keeps only rows that appear in both results.
- `EXCEPT` keeps rows from the first result that don't appear in the second.

Support for `INTERSECT` and `EXCEPT` differs. Oracle has traditionally used `MINUS` where others use `EXCEPT`, and older MySQL releases did not support either keyword, so check your database's version before you rely on them.

The classic mistake is using `UNION` when you meant to keep duplicates, which silently drops rows. Another is assuming the columns line up by name. Set operators match columns by position, so the same data in a different column order gives wrong results without any error.
