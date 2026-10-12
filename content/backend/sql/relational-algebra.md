---
title: "Relational Algebra"
summary: "The operations (select, project, join) that SQL queries compile to."
levels: { backend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["relational algebra", "relational operators", "algebra of relations"]
prereqs: ["relational-model"]
related: ["join", "subquery", "query-plan"]
---

**Relational algebra** is the formal set of operations for manipulating relations (tables), and the mathematical foundation SQL implements. Its power is its smallness: a handful of operators compose to express any query, and query optimisers reason about them when rewriting queries.

The core operators:

- Selection (σ) — filter rows by a condition (`WHERE`).
- Projection (π) — choose columns (`SELECT` a subset).
- Join (⋈) — combine relations on a condition.
- Union / intersection / difference — set operations on relations.
- Rename (ρ) — rename attributes.

```text
σ_{status='open'}(orders)      → WHERE status = 'open'
π_{id,total}(orders)           → SELECT id, total
orders ⋈ customers             → JOIN ... ON ...
```

Why it matters beyond theory:

- Optimisers think in it. A query is translated into an algebra tree, then rewritten — reordering joins, pushing selections down, choosing join strategies — before execution. Understanding the operators makes [query plans](/t/query-plan) readable.
- It explains equivalence. Two very different-looking SQL statements can be algebraically equal, which is why the optimiser can rewrite one into the other.
- It clarifies comparison. "Is this join equivalent to that subquery?" becomes answerable in algebraic terms.

The classic mistakes:

- Treating it as academic trivia. The operators are exactly the decisions you make tuning a query: what to select, filter, join, and in what order. The vocabulary pays off in reading plans.
- Expecting SQL to equal the algebra exactly. SQL adds duplicates (it's a bag), `NULL` three-valued logic, ordering and procedural constructs. `NULL` in particular breaks the clean set semantics and causes most of SQL's surprises.
- Assuming a query can't be rewritten. Because relational operations have equivalences, the database may run a different plan than the SQL suggests — often a better one, occasionally a surprising one.
- Ignoring join order's effect. Joins are associative (up to cost), so the optimiser picks an order; the algebra is what lets it.
- Confusing algebra with the physical plan. The algebra is logical; the physical plan adds indexes, scans and algorithms. The algebra is the "what", the plan the "how".

**Why to care:** relational algebra is the grammar behind SQL and the language of query optimisation. It explains why optimisers can rewrite your query and why [reading a plan](/t/query-plan) in terms of selection, projection and join makes tuning tractable. It's the formal companion to the [relational model](/t/relational-model).
