---
title: "Patterns of Enterprise Application Architecture"
summary: "Fowler's catalog: transaction script, domain model, data mapper and more."
levels: { backend: senior }
aliases: ["enterprise application patterns", "PoEAA", "Fowler's patterns"]
prereqs: ["domain-model-pattern", "data-mapper"]
related: ["transaction-script", "active-record-pattern", "repository-pattern", "unit-of-work", "identity-map", "anemic-domain-model"]
---

**Patterns of Enterprise Application Architecture** is Martin Fowler's catalog of patterns for the messy middle layer of business software — persistence, domain logic and the layers between them. It's a menu, not a mandate: it names the recurring choices so you can pick deliberately instead of rediscovering them.

The catalog organises around a few questions:

- How is domain logic structured? [Transaction script](/t/transaction-script) (procedural, one routine per operation) versus [domain model](/t/domain-model-pattern) (objects with behaviour). Simple rules favour scripts; complex rules favour a model. An [anemic domain model](/t/anemic-domain-model) is the worst of both — objects with no behaviour.
- How does the database map to objects? [Active record](/t/active-record-pattern) (the object knows how to save itself) versus [data mapper](/t/data-mapper) (a separate layer translates). Active record is simpler; data mapper keeps the domain clean.
- How do you work with a set of objects? [Repository](/t/repository-pattern) (a collection-like access point), [unit of work](/t/unit-of-work) (batch changes into one transaction), [identity map](/t/identity-map) (one object per row per session).
- How do you structure the web layer? Front controller, MVC and related patterns for handling requests.

```text
logic:       transaction script  |  domain model
persistence: active record       |  data mapper
in-between:  repository, unit of work, identity map
```

The classic mistakes:

- Treating the catalog as a checklist. Applying data mapper, unit of work and repository to a simple CRUD app is over-engineering. These patterns earn their keep with complex domains and large systems.
- Picking a pattern before knowing the complexity. The first question — how complex are the rules? — determines everything else. Get it wrong and the rest is wasted ceremony.
- Mixing incompatible choices. A rich domain model with active record everywhere can work but blurs the separation; decide coherently.
- Following the book over your framework. Your ORM or web framework already made many of these choices. Understand them; don't fight them without cause.
- Forgetting it's old and still right. The patterns predate today's frameworks, but the trade-offs (plan-then-do vs. domain model, coupling vs. convenience) haven't changed.

**When to use it:** as a vocabulary and a decision guide when structuring the data-access and domain layers of a business application. The names alone are useful — "this is a transaction script" or "we need a unit of work" — and the trade-offs help you match the pattern to the complexity you actually have. See [domain model](/t/domain-model-pattern), [data mapper](/t/data-mapper) and [repository](/t/repository-pattern) for the individual entries.
