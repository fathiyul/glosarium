---
title: "Anemic Domain Model"
summary: "Domain objects with data but no behavior."
levels: { backend: senior }
aliases: ["anemic domain model", "anemic model", "data bag model"]
prereqs: ["ddd-entity", "domain-driven-design"]
related: ["ddd-entity", "domain-service", "transaction-script"]
---
The **Anemic Domain Model** anti-pattern: domain objects as data bags (getters/setters, no behaviour) with all logic stranded in services, managers or transaction scripts. It looks object-oriented (classes everywhere) while thinking procedurally — the worst of both paradigms, and DDD's most common failure mode.

```text
anemic:  order.getStatus(); orderService.ship(order);  // logic homeless
rich:    order.ship();  // invariant + transition owned by the model
```

Anemia creeps in through frameworks (ORM entities as DTOs), layering dogma ("no logic in entities"), and habit (procedural thinking in class clothing). The costs compound: invariants unenforceable (anyone mutates anything), logic duplicated across services, and the "model" documenting nothing about actual rules.

The classic mistakes:

- Setters for everything. Public mutation of every field makes invariants impossible — validation lives nowhere enforceable. Behaviour methods replacing setters, state changed only through operations.
- Service-per-entity. `OrderService`, `CustomerService` mirroring entities 1:1 signal logic extracted mechanically. Services coordinate across aggregates; entities own their rules.
- Framework entities as domain. ORM classes with persistence concerns doubling as the model contaminateubiquitous language with infrastructure. Separate persistence from domain (or map explicitly).
- Validation elsewhere. Constraints checked in controllers, forms or services (each differently, each incompletely) instead of constructors and operations. Validate at the model's edge, once.
- "Logic doesn't belong in entities" dogma. Layering rules misread as behaviour bans. Behaviour belongs with the data it constrains — that's encapsulation, not layering violation.
- Testing services instead of models. Logic in services needs mocking-heavy integration tests; behaviour in entities unit-tests trivially. Rich models test cheaply.
- Procedural comfort. Teams thinking in steps and scripts find rich modelling unnatural at first. Pair, review and refactor toward behaviour — it's learned, not innate.

**The cure:** move behaviour next to the data it guards, replace setters with operations, validate in constructors, coordinate (not implement) in services. Objects with responsibilities, not records with accessors.
