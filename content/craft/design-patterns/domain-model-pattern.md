---
title: "Domain Model"
summary: "Organizing business logic as objects that hold both data and behavior."
levels: { backend: senior }
aliases: ["domain model", "domain model pattern", "rich domain model"]
prereqs: ["anemic-domain-model", "domain-driven-design"]
related: ["transaction-script", "active-record-pattern", "data-mapper", "repository-pattern", "enterprise-application-patterns"]
---

A **domain model** organises business logic as objects that hold *both* their data and the behaviour that operates on it. An `Order` doesn't just carry a total and a status; it knows how to add a line, apply a discount, and decide whether it can be cancelled. The rules live with the data they govern, not in a separate layer of procedures.

```text
anemic:  order.total; PricingService.calculate(order)     # data and rules apart
rich:    order.applyDiscount(code)                        # rules with the data
```

It's the object-oriented alternative to a [transaction script](/t/transaction-script), where each operation is a procedural routine that reads and writes data directly. A domain model is worth it when the rules are complex and interrelated — pricing, permissions, workflows — because encapsulating them in objects keeps invariants enforced and makes the logic testable without a database.

The contrast is the [anemic domain model](/t/anemic-domain-model), widely (and fairly) called an anti-pattern: classes that are just bags of getters and setters, with all logic in services. You get the ceremony of objects with none of the encapsulation.

The classic mistakes:

- Building a rich model for simple rules. For straightforward CRUD, a domain model is overkill; a [transaction script](/t/transaction-script) or active record is clearer and faster to write. Match the pattern to the complexity.
- Letting persistence dictate the model. If every class is a table and every field a column, you're modelling the schema, not the domain (see [data mapper](/t/data-mapper) for keeping the two apart).
- Objects that can be constructed in invalid states. A model that exposes setters for everything lets callers break invariants. Enforce rules in the constructors and methods so illegal states can't exist.
- A model with no behaviour. That's the anemic version. If the objects only hold data, ask why they exist.
- Ignoring boundaries. A single "domain model" over a large system becomes a tangled ball. [Domain-Driven Design](/t/domain-driven-design) splits it into [bounded contexts](/t/bounded-context), each with its own model.

**When to use it:** when the business rules are the hard part and worth expressing explicitly. Fetch and persist aggregates through a [repository](/t/repository-pattern), map them via a [data mapper](/t/data-mapper), and treat the model as the place correctness is enforced. It's a central pattern in [enterprise applications](/t/enterprise-application-patterns).
