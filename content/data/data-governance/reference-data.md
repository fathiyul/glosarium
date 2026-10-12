---
title: "Reference Data"
summary: "Shared code lists like country codes, currencies and status values."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["reference data management", "code lists", "lookup data", "reference tables"]
prereqs: ["data-governance", "data-quality-dimensions"]
related: ["master-data-management", "data-dictionary", "data-governance", "conformed-dimension", "multi-currency", "data-quality-dimensions"]
---

Reference data is the shared code lists that many systems agree on: country codes, currency codes, language and unit codes, status values, product categories, payment methods. Each entry usually has a short code, a human-readable label and a definition, and the list changes rarely. Standard examples are ISO country and currency codes, though most organisations also keep internal lists for things like order status.

It matters because joins and totals depend on everyone writing the same code. The classic mistake: one system stores "US", another "USA" and a third "United States", so a join between them silently drops rows or a report shows three countries that are one. Or a new status is added to one team's list, and another team's dashboard quietly excludes the rows because its list is older.

## Reference data versus master data

They are related but different. Reference data is the shared code lists that classify and label; [master data](/t/master-data-management) is the core entities themselves (customers, products, suppliers). Both need an owner and a single authoritative version, but reference data is smaller and far slower to change.

## Managing it well

- Keep one authoritative source for each list, with an owner and a version ([data governance](/t/data-governance)).
- Give each entry a code, a label and a definition, and document what each status means ([data dictionary](/t/data-dictionary)).
- Add validity dates for entries that are retired or replaced; currencies and country codes do change over time ([multi-currency](/t/multi-currency)).
- Distribute copies to the systems that need them, and refresh them, rather than letting each team maintain its own.
- Validate incoming values against the list in the pipeline, so a typo or an unknown code fails loudly instead of entering the warehouse ([data quality dimensions](/t/data-quality-dimensions)).
- **Join on the code, and display the label.** Do not store free text where a code belongs.

## Trade-offs

Not every list deserves central management. A list used by one team, for one purpose, is not reference data; centralising it adds a dependency for no benefit. Reserve the effort for genuinely shared lists where inconsistency causes real joins and reporting errors. Also decide who can add entries: too open and the list sprawls, too closed and teams wait weeks for a new status.

Reference data is small, but it is the connective tissue that lets different systems talk about the same things.
