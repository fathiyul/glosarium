---
title: "COALESCE and NULLIF"
summary: "Handling NULLs inside SQL expressions."
levels: { backend: junior, data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["COALESCE", "NULLIF"]
prereqs: ["null"]
related: ["null", "constraint", "self-join"]
---

`COALESCE` and `NULLIF` are two standard SQL functions for handling [NULL](/t/null) values inside a query.

`COALESCE(a, b, c)` returns the first argument that isn't NULL. It's useful for choosing a fallback:

```sql
SELECT COALESCE(nickname, full_name, 'Anonymous') AS display_name
FROM users;
```

`NULLIF(a, b)` returns NULL when `a` equals `b`, and otherwise returns `a`. Its most common use is turning a value you don't want into NULL, so dividing by zero doesn't fail. Databases differ here: PostgreSQL raises an error on division by zero, while MySQL by default returns NULL with a warning.

```sql
SELECT total / NULLIF(item_count, 0) AS average_price
FROM orders;
-- Where item_count is 0, the result is NULL instead of an error
```

Both functions work on the value they're given. They don't change the stored data unless you use them in an `UPDATE`.

The classic mistake is using `COALESCE` to hide data that really is missing. If a missing price is shown as `0`, a report will say the product is free. Decide what NULL means for each column first, then choose whether the query should replace it, leave it as NULL, or exclude the row. Also remember that comparisons with NULL don't behave like comparisons with ordinary values, which is why you check for it with `IS NULL` rather than `= NULL`.
