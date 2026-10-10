---
title: "ER Diagram"
summary: "A diagram of entities and their relationships."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["ER diagram", "entity relationship diagram", "erd"]
prereqs: ["relational-model", "schema"]
related: ["normalization", "primary-key", "foreign-key"]
---

An **ER diagram** (entity-relationship diagram) is a visual map of data: **entities** (things like Customer, Order), their **attributes** (id, email, status) and the **relationships** between them, annotated with cardinality — one-to-one, one-to-many, many-to-many.

```text
Customer 1 ──── * Order * ──── * Product
   (one customer has many orders; an order has many products)
```

It's both a design tool and a communication tool. Before building, an ER diagram forces you to name the entities and decide the relationships; afterwards, it's the fastest way to show a new engineer — or a stakeholder — how the data fits together.

The classic mistakes:

- Confusing the diagram with the physical schema. A conceptual ER diagram describes the domain; the tables, indexes and foreign keys are the implementation. They usually differ (e.g. a many-to-many becomes a junction table — see [relationships](/t/relationship-types)).
- Getting cardinality wrong. One-to-many vs many-to-many is the decision that determines whether you need a join table. Mis-modelling it creates awkward schemas later.
- Modelling the UI, not the domain. Entities should reflect the business concepts, not the current screens. UI-driven schemas age badly.
- Letting it drift. A diagram that no longer matches the schema misleads. Keep it near the code, or generate it from the schema if you can.
- Over-detailing. Cramming every column and index into one diagram makes it unreadable. Keep the high-level view high-level; detail lives in the schema.

How to use it: sketch the entities and relationships early to agree on the model (see [relational model](/t/relational-model)), then refine into a schema with keys and constraints. It pairs with [normalisation](/t/normalization) (which shapes the entities) and is a natural companion to the [C4 model's](/t/c4-model) data view. Keep the conceptual diagram stable and generate or accept some divergence in the physical details.
