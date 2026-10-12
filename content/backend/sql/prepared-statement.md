---
title: "Prepared Statement"
summary: "A query parsed once and executed many times with different values."
levels: { backend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["prepared statement", "parameterised query", "prepared statements"]
prereqs: ["sql", "query-plan"]
related: ["dynamic-sql", "transaction"]
---

A **prepared statement** separates a SQL statement's *structure* from its *values*. You send the query once with placeholders, the database parses and plans it, and later you execute it repeatedly with different values bound to the placeholders. It's both a safety mechanism and a performance one.

```sql
PREPARE find_user AS SELECT * FROM users WHERE email = $1;
EXECUTE find_user('a@example.com');
EXECUTE find_user('b@example.com');
```

Two benefits:

- Injection safety. Values are sent separately from the query text, so a value like `'; DROP TABLE users; --` is treated as a literal string, not SQL. This is the correct way to handle user input (see [dynamic SQL](/t/dynamic-sql)).
- Plan reuse. The database can reuse the compiled plan across executions, saving parse/planning work on high-frequency queries.

Most application code uses prepared statements implicitly: when your ORM or driver uses placeholders (`?` or `$1`), it's preparing a statement under the hood.

The classic mistakes:

- Calling it "parameterised query" as a synonym for string formatting. Only true parameters (bound values) give injection safety; interpolating into the text does not, even if it "looks" parameterised.
- Believing parameters can substitute anything. Parameters work for *values*; table and column names, `ASC`/`DESC`, and operators are structure and can't be parameters — you must allow-list those yourself.
- Expecting plan reuse always. Some databases re-plan, or a generic plan can be *worse* than a specific one for skewed data. Plan caching is a benefit, not a guarantee.
- Preparing statements you run once. For one-off queries, the preparation overhead isn't repaid; there's also the risk of accumulating prepared statements if connections are long-lived. Use them where queries repeat.
- Forgetting the connection scope. Prepared statements often live per connection; with [connection pooling](/t/connection-pooling), a statement prepared on one connection may not exist on another unless the pool manages it.

**How to use it:** always bind user-supplied *values* as parameters — every modern driver makes this easy and it closes the top web vulnerability. Reserve runtime-assembled *structure* for allow-listed identifiers. It's the foundation of safe, efficient querying, sitting alongside [query plans](/t/query-plan) and [transactions](/t/transaction).
