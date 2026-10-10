---
title: "Value Object"
summary: "A domain object defined only by its values, and immutable."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["value object", "value objects", "immutable value"]
prereqs: ["ddd-entity", "ubiquitous-language"]
related: ["ddd-entity", "aggregate-root", "immutability"]
---
A **Value Object** is a domain concept defined entirely by its values, with no identity: two `Money(10, USD)` instances are interchangeable, an address is just its fields. Values are **immutable** — operations return new instances rather than mutating — so they're safe to share, cache and reason about.

```text
money = Money(10, USD); money.add(Money(5, USD)) → Money(15, USD) (new object)
```

Immutability removes whole bug classes (no aliasing surprises, no half-updated state) and makes invariants cheap: validate in the constructor once, and every instance is valid forever. Rich values (Money with currency-aware arithmetic, DateRange with overlap logic) also concentrate domain rules where they belong.

The classic mistakes:

- Primitives for domain concepts. A raw string for email/phone/money invites invalid values everywhere. Wrap in validated values; make illegal states unrepresentable.
- Mutable "values." Setters on a value object reintroduce aliasing bugs — two holders, one mutation, surprise. Immutable with copy-on-write operations.
- Identity on values. Giving Money an id (or comparing by reference) treats values as entities. Equality by fields; no ids.
- Anemic values. A value holding data with validation and arithmetic elsewhere scatters the concept. Put the operations on the value.
- ORM impedance. Persisting values as separate tables with ids fights the model; map them as embedded components/owned types of their entity.
- Over-granularity. Not every string deserves a class; wrap concepts with rules and reuse (emails, money, quantities), not every field.

**How to model them:** immutable, validated at construction, equated by value, behaviour-rich. Values are the model's vocabulary — small, exact, and everywhere.
