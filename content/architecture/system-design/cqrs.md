---
title: "CQRS"
summary: "Separating the write model from the read model."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["Command Query Responsibility Segregation", "command query responsibility segregation", "separate read and write models"]
prereqs: ["event-sourcing", "read-replica"]
related: ["event-sourcing", "eventual-consistency", "materialized-view", "read-replica", "domain-event", "command-query-separation"]
core: [backend, data-engineer]
also: [integration]
---

**CQRS** (Command Query Responsibility Segregation) separates the model used to **change data (commands)** from the model used to **read data (queries)**. Instead of one model serving both, you design each side for its own job.

The idea builds on [command–query separation](/t/command-query-separation) for methods: asking a question shouldn't change anything, and changing something shouldn't return query data.

```
          Commands (write side)                         Queries (read side)
 "PlaceOrder", "CancelOrder"                      "Orders for customer 42 with product names"
         │                                                      ▲
         ▼                                                      │
  domain model + write DB  ──(events / sync)──►  read models: denormalized, query-shaped views
  (enforces rules, consistency)                  (fast, simple, possibly different store)
```

## Why separate them

Reads and writes often have **different needs**:

- **Writes** need validation, business rules and strong consistency, so a rich, normalized domain model works well.
- **Reads** want flat, joined, pre-shaped data for screens and reports, and need to scale massively (reads usually outnumber writes many times).

Forcing both through one model leads to compromises: complicated queries on a write-optimized schema, or a bloated model that serves everyone badly.

## Degrees of CQRS

1. **Light**: same database, but separate code paths. Command handlers use the domain model, and query handlers run simple optimized queries or SQL straight to DTOs. Often most of the benefit with little cost.
2. **Separate read models** in the same database: [materialized views](/t/materialized-view) or summary tables updated as data changes.
3. **Separate stores**: the write side in a relational database, the read side in a search engine, a cache or a document store, kept in sync through events (possibly with [event sourcing](/t/event-sourcing)). Maximum flexibility, maximum complexity.

CQRS and event sourcing are often mentioned together but are independent: you can use either without the other.

## Costs

- **Eventual consistency**: read models update after the write, so users may not immediately see their change ([eventual consistency](/t/eventual-consistency)). You need strategies in the UI and API ([read your writes](/t/read-your-writes)).
- **More moving parts**: projections, synchronization, rebuilding read models, handling failures and out-of-order events.
- **Duplication** of data and logic.
- **Harder to reason about** for people used to one model.

## When it's worth it

- **Read and write loads or shapes differ greatly**, or scale separately.
- **Complex domains** where the write model is rich and reads are varied.
- **Multiple views** of the same data (screens, reports, search).

For most CRUD applications, it's unnecessary. Start with one model, and use read replicas, indexes and caching ([read replicas](/t/read-replica)). Reach for CQRS when you can say *which problem* it solves.
