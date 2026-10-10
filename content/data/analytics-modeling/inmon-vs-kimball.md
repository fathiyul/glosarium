---
title: "Inmon vs Kimball"
summary: "A normalized enterprise warehouse first vs dimensional marts first."
levels: { data-engineer: senior , data-analyst: senior }
aliases: ["Inmon vs Kimball", "Inmon Kimball", "top-down vs bottom-up warehouse", "corporate information factory vs bus architecture"]
prereqs: ["dimensional-modeling", "normalization"]
related: ["dimensional-modeling", "data-vault", "star-schema", "conformed-dimension", "bus-matrix", "data-mart"]
core: [data-engineer]
---

Two classic philosophies for building a data warehouse, named after Bill Inmon and Ralph Kimball.

| | **Inmon** (top-down) | **Kimball** (bottom-up) |
|---|---|---|
| Starting point | An **enterprise-wide, normalized (3NF) warehouse** that integrates all subject areas | **Dimensional data marts** for individual business processes |
| Structure | Central normalized EDW → **dependent data marts** (often dimensional) built from it | Marts built with **[conformed dimensions](/t/conformed-dimension)** so they fit together (the "bus architecture") |
| Data in the center | Detailed, normalized, integrated | Dimensional (star schemas) |
| Delivery | Larger up-front design and integration, then marts | Incremental: deliver one business process at a time |
| Strength | A single, consistent, integrated source of truth. Handles complex enterprise integration | Faster time to value, business-friendly models, query performance |
| Weakness | Slow to show results. Heavy up-front modeling. The normalized core isn't user-friendly | Integration discipline needed, or you get silos. Changing conformed dimensions affects many marts |

```
Inmon:   sources → [ normalized enterprise warehouse (3NF) ] → data marts → users
Kimball: sources → [ staging ] → dimensional marts (conformed dimensions across them) → users
```

## In practice

- **The debate is partly historical.** Modern cloud platforms made storage and compute cheap and flexible, and most teams use a **blend**: land raw data, clean and integrate it in a staging or intermediate layer (normalized or lightly modeled), then expose **dimensional marts** for analytics ([medallion architecture](/t/medallion-architecture), [staging, intermediate and marts](/t/staging-intermediate-marts)).
- **Kimball-style dimensional models** are far more common at the consumption layer, since analysts and BI tools handle them well ([dimensional modeling](/t/dimensional-modeling), [star schema](/t/star-schema)).
- **Inmon's idea of an integrated, enterprise-wide core** survives wherever integration of many systems is the main difficulty. [Data Vault](/t/data-vault) is another take on that core.
- **A third path**: skip heavy modeling and build wide tables for specific uses ([one big table](/t/one-big-table)). It's fast, but risks inconsistent definitions at scale.

## How to choose

- **Small to mid-size, fast delivery needed, a few core business processes**: start Kimball-style, with conformed dimensions from the beginning.
- **Large enterprise, many source systems, strict governance and long horizons**: invest in an integrated core (Inmon-style or Data Vault), with marts on top.
- **Whichever you pick**, the real success factors are the same: agreed business definitions, [data ownership](/t/data-ownership), tested pipelines and documented models.

Understand both so that you can recognize the vocabulary in real warehouses, and borrow what fits.
