---
title: "Data Vault"
summary: "Modeling with hubs, links and satellites for auditable, change-friendly history."
levels: { data-engineer: senior , data-analyst: senior }
aliases: ["Data Vault 2.0", "hubs links satellites", "DV modeling", "Linstedt data vault"]
prereqs: ["dimensional-modeling", "surrogate-key-dw"]
related: ["dimensional-modeling", "inmon-vs-kimball", "scd-types", "surrogate-key-dw", "medallion-architecture", "landing-zone"]
core: [data-engineer]
---

**Data Vault** is a data warehouse modeling method (created by Dan Linstedt) designed for **auditability, flexibility when sources change, and parallel loading** of many source systems. Instead of modeling the business as facts and dimensions, it separates **what identifies things, how they relate, and how they describe** into three table types.

| Table | Holds | Example |
|---|---|---|
| **Hub** | The **business keys**: the unique identifiers of core business concepts, with load metadata | `hub_customer(customer_hk, customer_id, load_date, record_source)` |
| **Link** | **Relationships** between hubs (many-to-many by nature) | `link_order_customer(link_hk, order_hk, customer_hk, load_date, record_source)` |
| **Satellite** | **Descriptive attributes** and their **history**, attached to a hub or link, one row per change | `sat_customer_details(customer_hk, load_date, name, email, city, hash_diff, record_source)` |

```
 hub_customer ◄── sat_customer_details (history of attributes)
      ▲
 link_order_customer ──► hub_order ◄── sat_order_details
```

Keys are usually **hashes** of the business keys, which allow tables to be loaded in parallel without lookups.

## Key properties

- **Insert-only and historized**: new data and changes are appended with load timestamps and source names, so you can reconstruct what was known when ([record history](/t/record-history)). Nothing is overwritten or deleted.
- **Source-neutral and integrated by business key**: data from several systems about the same business key lands in the same hub, with each source's attributes in separate satellites.
- **Resilient to change**: a new source or attribute means a new satellite or table, not a redesign of existing ones.
- **Raw vs business vault**: a **raw vault** stores data as received. A **business vault** adds derived and cleaned business rules.
- **Auditable**, with full lineage to the source and load.

## What you build on top

The vault is rarely queried directly by analysts. It's **a central, integrated, historical core**, and **information marts** (often star schemas, [dimensional models](/t/dimensional-modeling)) are built from it for reporting.

## Trade-offs

| Strengths | Costs |
|---|---|
| Strong audit trail and history | **Many tables** and joins. Queries on the vault itself are complex |
| Easy to add sources and attributes | Needs a mart layer for usability, so **more layers to build** |
| Parallel, repeatable, pattern-based loading (highly automatable) | A steeper learning curve and specialized vocabulary |
| Suits large enterprises with many changing sources and compliance needs | Overkill for small or stable environments |

## When to consider it

- **Many source systems** that change often, and a need to integrate them.
- **Regulatory or audit requirements** to show history and lineage.
- Teams that can **automate the loading patterns**, since the structure is highly regular.

For smaller teams, a simpler layered approach (raw, cleaned, dimensional marts) is usually enough ([Inmon vs Kimball](/t/inmon-vs-kimball), [medallion architecture](/t/medallion-architecture)). Data Vault is one more tool, to choose when its trade-offs match your situation.
