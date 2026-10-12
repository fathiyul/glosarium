---
title: "Dynamic SQL"
summary: "Building SQL strings at runtime, and doing it without injection."
levels: { backend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["dynamic sql", "dynamic queries", "runtime sql"]
prereqs: ["sql", "prepared-statement"]
related: ["query-builder", "view", "subquery"]
---

**Dynamic SQL** is assembling a SQL statement at runtime from pieces rather than writing it out fully. It's how you support optional filters, variable sort columns, or query shapes that depend on user input. It's powerful and, done carelessly, the most common source of SQL injection.

The golden rule splits the statement into two kinds of parts:

- Values must be **parameters** (`WHERE status = ?`), bound by the driver — never concatenated into the text.
- Identifiers and structure (column names, table names, `ASC`/`DESC`, which JOIN) can't be parameters, so they must be validated against an **allow-list** of known-safe options.

```text
WHERE status = ?        ← value: parameterise
ORDER BY <column>       ← identifier: validate against allowed columns
```

The classic mistakes:

- Concatenating values. `"... WHERE name = '" + input + "'"` is an injection hole. Parameterise every value (see [prepared statement](/t/prepared-statement)).
- Forgetting that identifiers can't be parameterised. A common mistaken belief is that using parameters "handles injection". It does for values, but a user-supplied column/table/order is structure — allow-list it or you're still injectable.
- Building a query builder in the database. Writing long stored procedures that concatenate and `EXECUTE` strings recreates all these risks in a harder-to-review place.
- Losing readability. A runtime-assembled query is invisible to simple search; when something breaks, nobody can find "the query". Log the generated SQL (with values redacted) and keep assembly in one place.
- Ignoring the optimiser. Some databases don't cache plans for dynamically built statements, so each distinct shape is parsed anew. A [query builder](/t/query-builder) or fixed parameterised statements can help.

**How to do it safely:** one assembly point, parameters for all values, an allow-list for all identifiers and structural choices, and logging of the final statement. Dynamic SQL isn't inherently wrong — optional filters need it — but every piece must be classified as *value* or *structure* and handled accordingly. See [SQL](/t/sql) and [views](/t/view) for alternatives.
