---
title: "ORM vs Raw SQL"
summary: "Convenience and safety vs control and performance."
levels: { backend: mid-level }
aliases: ["ORM vs raw SQL", "orm", "object relational mapping"]
prereqs: ["database", "sql"]
related: ["query-builder", "orm", "eager-vs-lazy-loading", "active-record-pattern", "data-mapper"]
---

An **ORM** (object-relational mapper) maps database rows to objects in your language, so you work with `user.orders` instead of writing SQL and marshalling rows yourself. **Raw SQL** means writing the queries directly. The debate between them is really about where you want to spend complexity.

ORM strengths: no hand-written mapping boilerplate, safer defaults (parameterised queries reduce injection), relationships loaded for you, and portability across databases. Raw SQL strengths: full control over the query, no surprises in what gets generated, and access to database-specific features the ORM doesn't wrap.

```text
ORM:     db.users.where(active: true).order(:name).limit(20)
raw SQL: SELECT * FROM users WHERE active ORDER BY name LIMIT 20;
```

The classic mistakes:

- Lazy-loading in a loop (the N+1). `for u in users: print(u.orders.count())` fires one query per user. This is the ORM's signature performance trap — use eager loading (see [eager vs lazy loading](/t/eager-vs-lazy-loading)).
- Not seeing the generated SQL. An ORM can produce a query far heavier than you expect. Read the plan (see [query plan](/t/query-plan)) and know what your call emits.
- Forcing the ORM everywhere. Complex reporting, bulk operations and things using window functions or recursive CTEs are often clearer and faster as SQL. A good [query builder](/t/query-builder) is the middle ground.
- String-interpolating SQL. Raw SQL done carelessly reintroduces injection; always use parameters (see [prepared statement](/t/prepared-statement)).
- Abstracting the database so completely you can't use it. Sometimes the right answer is database-specific. Portability is a nice-to-have, not a religion.

**The pragmatic stance:** use the ORM for the routine 90% — CRUD, simple filters, relationships — and drop to SQL or a query builder for the heavy or specialised 10%. The tool isn't the ideology; knowing what each generates is.
