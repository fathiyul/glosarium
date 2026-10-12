---
title: "Entity-Centric Modeling"
summary: "Tables built around business entities with their full history and features."
levels: { data-engineer: senior , data-scientist: senior }
aliases: ["entity-centric data modeling", "entity-based modeling", "entity model", "entity centric"]
prereqs: ["data-modeling", "dimensional-modeling"]
related: ["feature-store", "data-vault", "one-big-table", "master-data-management", "slowly-changing-dimension", "data-product"]
---

**Entity-centric modeling** organizes tables around **business entities** — customers, products, devices, accounts — instead of around the events those entities take part in. Each row represents one entity (often one entity per point in time), carrying its attributes, history and derived features in one place.

```
customer_360
customer_key | name | country | tier | orders_last_30d | lifetime_value | valid_from
```

Contrast with a process-centric [dimensional model](/t/dimensional-modeling), where the fact tables are the center and the entity's information is split across dimensions and many facts.

## Why it matters

Questions like "everything we know about this customer" or "build a training set from each customer's state" are awkward when the data is scattered across a dozen fact tables at different grains. You end up joining them ad hoc, each time with slightly different windows and filters, and the numbers disagree.

Entity-centric tables put that view in one place with a **declared grain and a point-in-time rule**. That matters most for machine learning: a feature for a training example must be the value as of that example's time, not today's, or you leak the future ([feature store](/t/feature-store)).

The classic mistake is assembling the entity view in each notebook or dashboard, so every team's "customer 360" is subtly different, and no one can reproduce a model's inputs.

## Where it fits

- Customer 360 style tables, device inventories, product catalogs with computed metrics.
- ML feature generation, where entities are the units models score.
- Operational analytics that follow an entity over its life rather than aggregating events.

It usually sits on top of an integrated core — a dimensional warehouse or a [data vault](/t/data-vault) — rather than replacing it. The core keeps the auditable history; the entity tables are a curated, wide serving layer.

## Trade-offs

- Entity tables get **very wide** and duplicate data, so they cost storage and take time to rebuild.
- Keeping history means deciding a versioning rule, the same question as [slowly changing dimensions](/t/slowly-changing-dimension), plus a clear point-in-time definition.
- Without a defined grain and refresh cadence they turn into an unmaintainable dump.
- A single [wide table](/t/one-big-table) per entity is convenient until the entity's shape changes often; a [feature store](/t/feature-store) may be the better tool when many models share and serve the same features.
