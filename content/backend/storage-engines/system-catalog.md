---
title: "System Catalog"
summary: "The tables where a database describes its own schema."
levels: { backend: senior, data-engineer: senior }
aliases: ["system catalog", "catalog", "data dictionary"]
prereqs: ["database", "schema"]
related: ["schema", "query-plan", "database"]
---

The **system catalog** (data dictionary) is where a database stores **metadata about itself**: which tables, columns, data types, indexes, constraints, views, roles and statistics exist. It's the database's own set of tables describing everything else in it.

```text
system catalog holds: tables, columns, types, indexes, constraints, privileges, ...
```

Why it matters:

- The query planner reads it. To plan a query, the engine consults the catalog for what tables/columns/indexes exist and their [statistics](/t/table-statistics). It's how the planner knows an index is available.
- Tools and migrations use it. ORMs, migration tools, schema-diff tools and admin interfaces query the catalog to discover and compare schemas.
- Authorization uses it. Privileges live in the catalog; access checks consult it.

In many databases you can query the catalog like normal tables (e.g. `information_schema`, `pg_catalog`). That's how tooling introspects a schema without parsing SQL files.

The classic mistakes:

- Editing the catalog directly. Manually changing catalog tables (to "rename" a column, say) can corrupt the database; always use DDL statements (`ALTER TABLE`), which update the catalog correctly and safely.
- Assuming the catalog is portable. Its structure is database-specific; tools that query it must handle each database's flavour (though `information_schema` offers some standardisation).
- Forgetting it needs updates after DDL. Schema changes are reflected in the catalog by the DDL itself; bypassing DDL (raw file changes) leaves the catalog out of sync and the database broken.
- Treating it as user data. The catalog is the engine's internal state; don't build application features by reading it casually — its shape and stability aren't guaranteed across versions.
- Ignoring statistics freshness. Some catalog tables hold [statistics](/t/table-statistics) the planner relies on; stale stats there cause bad plans.
- Missing privileges. Access to catalog views can itself be a permissions concern — a user who can read the catalog learns your schema, which may be sensitive.

**Why to know it:** the system catalog is how the database describes itself and how the planner, tools and permissions work. Understanding it explains how migrations and introspection tools operate, and why DDL is the only safe way to change a schema. It's the metadata layer beneath [query planning](/t/query-plan) and [statistics](/t/table-statistics).
