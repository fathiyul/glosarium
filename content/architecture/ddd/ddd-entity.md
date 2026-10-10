---
title: "Entity"
summary: "A domain object defined by its identity."
levels: { backend: mid-level }
aliases: ["entity", "domain entity", "DDD entity"]
prereqs: ["ubiquitous-language", "domain-driven-design"]
related: ["value-object", "aggregate-root", "ubiquitous-language"]
---
In domain-driven design, an **Entity** is a domain object defined by its **identity** rather than its attributes: a Customer remains the same Customer as names, addresses and tiers change, because the id persists. Two entities with the same id are the same thing even if every other field differs — the opposite of a value object, where equality means same values.

```text
entity:        customer #42 (same customer, new address)
value object:  Money(10, USD) == Money(10, USD) (equal by value)
```

Identity gives entities continuity over time: they carry lifecycle (created, suspended, closed), accumulate history, and own the invariants that must hold across mutations. That power needs discipline — identity without behaviour is just a database row, and behaviour scattered outside the entity starves the model (see [anemic domain model](/t/anemic-domain-model)).

The classic mistakes:

- Confusing database identity with domain identity. A surrogate primary key identifies a row; domain identity (account number, order id) is what the business tracks. Model the domain's identity, not the table's.
- Mutable ids. Changing an entity's identity mid-life breaks every reference. Identity is assigned once and never changes.
- Equality by fields. Comparing entities field-by-field treats them as values; implement equality (and hashing) on identity alone.
- Anemic entities. Getters/setters with logic elsewhere leaves the model hollow — put the invariants and transitions on the entity that owns them.
- Identity for everything. Not every concept needs continuity; addresses, amounts and date ranges are values. Reserve entity status for things the business tracks over time.
- Leaking identity across contexts. An id meaningful in one bounded context rarely transfers; map explicitly at boundaries (see [context map](/t/context-map)).

**How to model it:** identity plus lifecycle plus behaviour, equality by id, and values for everything else. Entities are the things whose story the business follows — give them the continuity and the rules to carry it.
