---
title: "Query Builder"
summary: "Composing SQL in code without a full ORM."
levels: { backend: mid-level }
aliases: ["query builder", "fluent query builder", "query construction"]
prereqs: ["sql", "database"]
related: ["orm-vs-raw-sql", "orm", "prepared-statement", "dynamic-sql"]
---

A **query builder** lets you construct a query programmatically from pieces — `select`, `where`, `join`, `order` — which the library assembles into SQL and executes. It sits between an [ORM](/t/orm-vs-raw-sql) and hand-written SQL: more structure and safety than string concatenation, less abstraction than a full object mapper.

```text
query := From("orders").Where("status = ?", status).Order("created_at DESC").Limit(20)
```

Its strengths are exactly the awkward cases: dynamic filters, sorting and pagination that depend on user input, and reporting queries the ORM won't express. Because values are bound as parameters, it's much safer than building SQL strings by hand (see [prepared statement](/t/prepared-statement)).

The classic mistakes:

- String-concatenating values into SQL. The cardinal sin. If user input is pasted into the SQL text, you have an injection hole. Use parameters the builder supports.
- Building SQL with untrusted identifiers. Parameterising *values* is standard, but table and column names can't be parameters — so if a sort column comes from the user, validate it against an allow-list, or you can still be injected (see [dynamic SQL](/t/dynamic-sql)).
- Rebuilding the ORM badly. If you're writing a generic query builder that reimplements relationships and mapping, ask why you're not using the ORM or plain SQL. Builders are for query *shape*, not a second ORM.
- Losing readability. A long chain of builder calls can be harder to follow than the SQL it generates. For a complex report, plain SQL with parameters is often clearer.
- Forgetting what it emits. Like an ORM, a builder can produce an inefficient query. Check the plan and, where the database has hints, use them.

**When to use it:** for queries whose shape varies with input, or when you want SQL's expressiveness with parameter safety and composability. It's the pragmatic middle of the [ORM vs raw SQL](/t/orm-vs-raw-sql) spectrum — not a full model layer, just a safe way to assemble the statement.
