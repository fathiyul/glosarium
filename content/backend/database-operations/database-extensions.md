---
title: "Database Extensions"
summary: "Adding capabilities to a database, like PostGIS or pgvector."
levels: { backend: senior, data-engineer: senior }
aliases: ["database extensions", "extensions", "postgres extensions"]
prereqs: ["database", "db-index"]
related: ["specialized-indexes", "sql-functions", "managed-database"]
---

A **database extension** is a module that adds capabilities to a database engine — new data types, functions, index types, or whole subsystems. PostgreSQL is the poster child: extensions like PostGIS add geospatial types and operators, `pgvector` adds vector search, others add time-series, graph, or cryptographic features. `CREATE EXTENSION postgis;` and the database gains spatial queries.

```text
base database + extension → types/functions/indexes it didn't have
```

Why they're attractive: you get specialised capability (vectors, geo, full-text upgrades) inside the database you already run, with transactional consistency and no extra service to operate. A vector extension, for instance, can keep embeddings and your relational data in one place.

The classic mistakes:

- Assuming they're available everywhere. Managed databases often restrict which extensions you can install, and self-managed ones need the files present. Check availability *before* designing around one — a common surprise when moving to a managed service.
- Coupling the schema to an extension. An extension-specific type or index ties you to that database and that extension; migrating away means converting data. Weigh the lock-in.
- Ignoring upgrade and backup implications. Extensions version independently; upgrading the database or the extension can require care, and a physical backup/restore must include the extension. Test the paths.
- Performance surprises. An extension's index type or function may behave differently than you expect at scale. Benchmark your workload, don't assume.
- Security. Extensions run with database privileges and can add attack surface; install only trusted ones and review their rights.
- Using an extension where a separate service is better. For heavy workloads (large vector search, big text corpora), a dedicated service may scale better than an in-database extension. Match the tool to the load.
- Forgetting to enable it per database. `CREATE EXTENSION` is per-database, not automatic across a cluster; new environments need it set up.

**When to use one:** when it adds a capability you need inside the database, at a scale it handles well, and you can depend on its availability in every environment. It keeps a polyglot need inside one store — convenient and transactional — at the cost of coupling. Assess the lock-in and the managed-service support before committing. See [specialised indexes](/t/specialized-indexes) and [managed vs self-hosted](/t/managed-vs-self-hosted).
