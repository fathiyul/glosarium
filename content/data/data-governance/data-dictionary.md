---
title: "Data Dictionary / Business Glossary"
summary: "Definitions of tables, columns and business terms."
levels: { data-engineer: junior , data-analyst: mid-level , data-scientist: junior }
aliases: ["business glossary", "data glossary", "column definitions", "metadata documentation", "data definitions"]
prereqs: ["documenting-datasets"]
related: ["data-catalog", "metric-definitions", "metadata-types", "data-ownership", "data-classification", "documenting-datasets"]
core: [data-engineer, data-scientist]
---

A **data dictionary** describes the tables and columns in your data: what each one means, its type, allowed values and where it comes from.
A **business glossary** defines the *business terms* people use ("active customer", "churn", "net revenue") in plain language. Together they let
people understand data without asking the person who built it.

A data dictionary entry:

| Field | Example |
|---|---|
| **Table** | `analytics.orders` |
| **Column** | `total_cents` |
| **Type** | integer |
| **Description** | Order total in cents, after discounts, before tax and shipping |
| **Allowed values / range** | ≥ 0 |
| **Source** | `app_db.orders.total_cents` |
| **Sensitivity** | Not personal data |
| **Owner** | Payments team |
| **Notes** | Refunds are recorded as separate rows, not as negative totals |

A glossary entry:

> **Active customer**: A customer with at least one paid order in the last 90 days. Excludes test accounts and employees.

## Why it matters

Column names mislead. What does `status = 3` mean? Is `date` the order date or the ship date? Is revenue before or after refunds? Without written
definitions, each analyst guesses and **different dashboards give different answers** for the same word
([metric definitions](/t/metric-definitions)).

## Making it useful

- **Write the non-obvious things**: units, time zones, how NULL is used, caveats and known problems. "Customer ID" needs no explanation, and "adjusted
  amount" does.
- **Keep it close to the code.** Descriptions in the same files as the models and schemas are updated more often than a wiki that nobody opens.
- **Generate what can be generated**: types and lineage from the platform, and write human descriptions on top.
- **Make it searchable** in a [data catalog](/t/data-catalog), so people find it where they work.
- **Name owners** ([data ownership](/t/data-ownership)), so that questions and corrections have a destination.
- **Mark sensitive columns** ([data classification](/t/data-classification)).
- **Review it** when a table changes, as part of the pull request, or it goes stale.
- **Use the glossary to settle arguments** once, instead of in every meeting.

A dictionary that's out of date is worse than none, because people trust it. Treat documentation as part of finishing the work
([documenting datasets](/t/documenting-datasets)).
