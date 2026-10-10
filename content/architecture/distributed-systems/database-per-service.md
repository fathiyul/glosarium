---
title: "Database per Service"
summary: "Each microservice owning its data exclusively."
levels: { backend: senior, data-engineer: senior }
aliases: ["database per service", "service database", "private database per service"]
prereqs: ["microservices", "bounded-context"]
related: ["microservices", "saga-pattern", "monolith"]
---
**Database per service** gives each microservice its own private database — no shared tables, no cross-service joins, no foreign writes. Services own their data completely and expose it only through APIs or events. It's the data corollary of service autonomy: independent deployability demands independent schema evolution.

```text
orders service → orders DB (its schema, its migrations, its scale)
shipping service → shipping DB (knows orders only via events/APIs)
```

Sharing a database couples everything the services were split to decouple: a column change needs cross-team coordination, one team's query pattern dictates everyone's indexes, and "independent deploys" die at the migration. Private databases restore the boundary — at the price of distributed data problems (consistency, joins, transactions) solved above the database.

The classic mistakes:

- Shared database with service labels. Separate schemas on one instance, or "just this one join," reintroduce coupling through the back door. Private means private — separate instances (or hard logical walls with a migration path).
- Cross-service joins in queries. Joining another service's tables (or shared views) bypasses its API and freezes its schema. Duplicate read models via events instead.
- Ignoring the distributed consequences. Private data means sagas for transactions, events for propagation, reconciliation for drift. Adopting the pattern without its companion machinery just moves the pain.
- One database technology for all. Private databases invite polyglot choices per workload (relational, search, graph) — using one engine everywhere wastes the freedom.
- Backup/restore incoherence. Per-service backups restore to different points in time; cross-service point-in-time recovery needs coordinated snapshots or event replay.
- Reporting across services. Analytics spanning private databases needs a warehouse/CDC pipeline, not production joins. Build the analytical path deliberately.

**The rule:** services share nothing at the data layer; integration happens through APIs and events. Coupling moved up the stack is coupling made explicit — and manageable.
