---
title: "Medallion Architecture (Bronze, Silver, Gold)"
summary: "Layering data from raw to cleaned to business-ready."
levels: { data-engineer: junior }
aliases: ["bronze silver gold", "medallion layers", "multi-hop architecture", "data layers", "bronze silver gold layers"]
prereqs: ["landing-zone"]
related: ["lakehouse", "data-mart", "dimensional-modeling", "data-product", "deduplication", "data-retention-tiers"]
core: [data-engineer]
---

**Medallion architecture** organizes data in layers of increasing quality: **Bronze** (raw), **Silver** (cleaned) and **Gold**
(business-ready). The names and the pattern were popularized by Databricks, and the idea is widely used with any lake or lakehouse.

```
sources ─► BRONZE ─────► SILVER ─────► GOLD ─────► dashboards, ML, reports
           raw,          cleaned,       aggregated,
           as received   deduplicated,  modeled for a
                         typed, joined  business purpose
```

| Layer | Contains | Typical work |
|---|---|---|
| **Bronze** | Raw data as ingested, plus load metadata | Append-only; keep original ([landing zone](/t/landing-zone)) |
| **Silver** | Validated, deduplicated, typed, standardized records | Cleaning, conforming keys, joining reference data ([deduplication](/t/deduplication)) |
| **Gold** | Curated tables for specific uses: facts and dimensions, aggregates, features | Business logic and metrics ([dimensional modeling](/t/dimensional-modeling), [data marts](/t/data-mart)) |

## Why layers help

- **Reprocessing is easy.** If Silver logic is wrong, rebuild it from Bronze.
- **Quality improves in steps**, and each step can be tested and owned.
- **Different consumers use different layers**: data engineers read Bronze, analysts mostly use Gold, and data scientists often use Silver.
- **Clear contracts**: Gold tables are what the business can rely on.

## Practical guidance

- **It's a convention, not a rule.** Some teams use other names (raw, staging, intermediate, marts, or two layers instead of three). Use
  whatever's meaningful and consistent.
- **Don't over-layer.** Every extra hop adds storage, runtime and things to maintain.
- **Put the transformation logic in code** that's versioned and tested, and make every layer reproducible from the one before it.
- **Apply governance per layer**: raw layers may hold sensitive data that Silver masks or removes.
- **Document each table**: what it is, its grain, owner and freshness.

It's a way to structure a data platform, not a product you install.
