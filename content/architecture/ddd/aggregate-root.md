---
title: "Aggregate Root"
summary: "The single entry point for modifying an aggregate."
levels: { backend: senior }
aliases: ["aggregate root", "root entity", "consistency root"]
prereqs: ["aggregate", "ddd-entity"]
related: ["aggregate", "value-object", "domain-event"]
---
The **Aggregate Root** is the aggregate's sole entry point: the one entity outsiders may hold references to, through which all mutation flows, and which enforces every invariant of its cluster. Roots carry global identity; everything inside is reachable only by navigating from the root.

```text
order = OrderRepository.find(id)  // root by global id
order.addLine(item)               // root enforces invariants (credit, stock, totals)
orderLine (no repository, no outside refs, no direct mutation)
```

Roots own the transactional boundary (one aggregate per transaction, as a rule), publish the aggregate's domain events, and guard cross-aggregate references (by id only, never object links). Their methods read as business operations, not CRUD.

The classic mistakes:

- Multiple entry points. Repositories or APIs exposing internal entities let outsiders bypass root invariants. One root, one door, enforced.
- Setters instead of operations. `order.setStatus(x)` exposes state transitions callers shouldn't choose; `order.ship()` / `order.cancel()` enforce valid transitions with their rules.
- Cross-root object references. Holding direct links to other aggregates' internals (or roots as navigable objects) tangles lifecycles and transactions. Reference by id; resolve when needed.
- Transaction spanning roots. Atomicity across aggregates fights the pattern (and scalability); use domain events plus eventual consistency between roots.
- Root bloat. Every operation hanging off the root (fifty methods) signals oversized aggregates or misplaced domain services. Split aggregates; extract services for cross-cutting logic.
- Events unreleased. State changes without published domain events blind downstream contexts. Roots emit; infrastructure delivers.
- Identity confusion. Root identity global and long-lived; internal entities identified locally (or by value). Mixing scopes corrupts references.

**How to design them:** single entry, behaviour-rich operations, invariants enforced, events emitted, references by id outward. The root is the aggregate's guardian — small, strict, and the only way in.
