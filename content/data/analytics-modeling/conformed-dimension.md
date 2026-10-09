---
title: "Conformed Dimension"
summary: "One shared dimension used by many fact tables so numbers line up."
levels: { data-engineer: senior }
aliases: ["conformed dimensions", "shared dimension", "conformed dimension in warehouse", "master dimension"]
prereqs: ["dimension-table", "fact-table"]
related: ["bus-matrix", "dimensional-modeling", "dimension-table", "master-data-management", "date-dimension", "role-playing-dimension"]
core: [data-engineer]
---

A **conformed dimension** is a dimension that's **shared, identical in meaning and structure, across multiple fact tables** (and often multiple data marts). The same `dim_customer` or `dim_date` is used by sales, support, returns and marketing, with the same keys, the same attribute names and the same definitions.

```
                    dim_date (conformed)
                   /        |         \
   fact_sales ────┤   fact_returns ────┤   fact_support_tickets ────┐
                   \        |         /                              │
                    dim_customer (conformed) ◄───────────────────────┘
```

## Why it matters

It's what lets you **combine data from different business processes** and get answers that line up. Because both facts point at the **same** customer dimension, you can ask: *"revenue, returns and support tickets per customer segment per month"*, by querying each fact separately and joining the results on the shared dimension attributes. This is called **drill-across**.

Without conformance:

- Sales calls a customer's region "APAC", and support calls it "Asia Pacific". The two numbers can't be put side by side.
- Customer IDs differ between systems, so the same person is counted twice.
- The "month" in one report starts on the 1st, and in another on the fiscal period boundary.

Everyone ends up arguing about whose numbers are right ([metric discrepancies](/t/metric-discrepancy)).

## What "conformed" requires

- **The same keys**: a shared surrogate key, with consistent mapping from each source's customer ID ([surrogate keys](/t/surrogate-key-dw)).
- **The same attribute names and meanings**, and the same permitted values.
- **The same granularity** (or a clearly defined subset of attributes shared at a coarser level, often called a rollup dimension).
- **A single owner** and a defined process for changes.

## How it's planned

The **[bus matrix](/t/bus-matrix)** lists business processes (rows) against shared dimensions (columns). Dimensions used by several processes are the ones to conform first. It guides incremental building of a warehouse: each new process reuses existing conformed dimensions, so the result is integrated, not a set of silos ([dimensional modeling](/t/dimensional-modeling)).

## Practical challenges

- **Source systems disagree**: multiple definitions of customer or product, duplicate records and inconsistent hierarchies. Conforming means **deciding and resolving**: matching records across systems, choosing the golden version ([master data management](/t/master-data-management)).
- **Organizational work**: agreeing on definitions across departments is harder than the technology. It needs sponsorship and governance.
- **Change management**: modifying a conformed dimension affects every fact that uses it, so changes must be coordinated and versioned.
- **Slowly changing attributes** must be handled consistently ([SCD types](/t/scd-types)).
- **Role-playing**: the same dimension may serve several roles (order date, ship date) in one fact ([role-playing dimensions](/t/role-playing-dimension)). That's conformance too.

Date and time dimensions are the easiest to conform, and a good first example ([date dimension](/t/date-dimension)). The principle also applies outside Kimball-style warehouses, wherever shared reference data and consistent definitions make numbers line up.
