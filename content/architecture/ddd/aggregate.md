---
title: "Aggregate"
summary: "A cluster of objects treated as one unit for changes."
levels: { backend: senior }
aliases: ["aggregate", "DDD aggregate", "consistency boundary"]
prereqs: ["ddd-entity", "value-object"]
related: ["aggregate-root", "ddd-entity", "eventual-consistency"]
---
An **Aggregate** is a cluster of entities and values treated as one consistency unit: everything inside changes together (transactionally), everything outside references only the root. It draws the boundary where invariants hold strongly — inside, immediate consistency; across aggregates, eventual.

```text
Order [root] ─┬─ OrderLine (entity, no outside refs)
              └─ Money total (value)
outside world → Order only (never OrderLine directly)
```

Sizing aggregates is the craft: too large (whole catalogues in one) creates contention and doomed transactions; too small (every entity its own) pushes invariants into eventually-consistent nowhere. Bound by true invariants — what must change atomically, no more.

The classic mistakes:

- Giant aggregates. "The Customer with all Orders, Invoices and Tickets" serialises everything through one lock and fails constantly under contention. Split by real invariant needs.
- Navigable internals. Outside code reaching inside (order.lines.add) bypasses root enforcement silently. Encapsulate: all mutation through root methods.
- Cross-aggregate transactions. Needing atomicity across roots signals misdrawn boundaries (merge) or eventual consistency acceptance (sagas/events) — not distributed transactions by default.
- Lazy-loading webs. ORM graphs spanning aggregates load the world per operation and blur boundaries. Fetch per aggregate; reference others by id.
- Anemic aggregates. Roots as data bags with logic in services hollow the pattern. Behaviour (especially invariant enforcement) lives inside.
- Eventual-everything confusion. Inside = transactional; between = eventual. Mixing the two (eventual inside, transactional across) inverts the model's guarantees.
- Technical boundaries as aggregates. Table-shaped or service-shaped clusters instead of invariant-shaped ones. Boundaries follow consistency needs, discovered with experts.

**How to draw them:** cluster by atomic invariants, expose only roots, reference across by id, accept eventuality between. Aggregates are consistency made structural.
