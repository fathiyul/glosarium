---
title: "Dimensional Modeling"
summary: "Kimball's approach: facts surrounded by descriptive dimensions."
levels: { data-engineer: mid-level , data-analyst: mid-level , data-scientist: mid-level }
aliases: ["Kimball dimensional modeling", "Kimball method", "dimensional model", "dimensional modelling", "star schema design"]
prereqs: ["fact-table", "dimension-table"]
related: ["star-schema", "grain", "bus-matrix", "conformed-dimension", "scd-types", "inmon-vs-kimball"]
core: [data-engineer, data-scientist]
---

**Dimensional modeling**, popularized by Ralph Kimball, is the classic way to design analytical databases so they're **easy to understand and fast to query**. The data is organized into **fact tables** (measurable events) surrounded by **dimension tables** (the descriptive context), usually as a [star schema](/t/star-schema).

```
            dim_date
               │
 dim_customer ─┼─ fact_sales ─ dim_product       "revenue (fact) by month, region, category (dimensions)"
               │
            dim_store
```

The way business users think ("sales by product and region by month") maps directly onto it.

## Kimball's four-step design process

1. **Choose the business process** to model: order fulfillment, web sessions, support tickets.
2. **Declare the grain**: exactly what one row of the fact table means ("one row per order line") ([grain](/t/grain)). Do this before anything else.
3. **Identify the dimensions**: the who, what, where, when and how that describe each fact ([dimension tables](/t/dimension-table)).
4. **Identify the facts**: the numeric measurements at that grain ([fact tables](/t/fact-table)).

## Key ideas

- **Conformed dimensions**: a shared `dim_customer` or `dim_date` used by many fact tables, so different processes can be analyzed together consistently ([conformed dimensions](/t/conformed-dimension), [bus matrix](/t/bus-matrix)).
- **Surrogate keys** for dimensions ([surrogate keys](/t/surrogate-key-dw)).
- **Slowly changing dimensions** to keep or overwrite history of attributes ([SCD](/t/slowly-changing-dimension)).
- **Different kinds of fact tables**: transaction, periodic snapshot, accumulating snapshot ([fact table types](/t/fact-table-types)).
- **Denormalized dimensions**, favoring simplicity over storage savings.

## Why it endures

- **Business-friendly**: analysts and BI tools understand it quickly.
- **Consistent metrics** through shared dimensions and defined grain.
- **Performs well** on analytical engines.
- **Stable under change**: new attributes and new facts can be added without redesigning.

## Alternatives and context

- **Inmon's** approach models a normalized enterprise warehouse first ([Inmon vs Kimball](/t/inmon-vs-kimball)), and **Data Vault** focuses on auditability and flexible integration ([Data Vault](/t/data-vault)).
- Some modern teams skip heavy modeling for wide tables ([one big table](/t/one-big-table)) when it suffices.
- Dimensional models are typically built in a layer on top of cleaned data ([data transformation](/t/data-transformation)).

Even if you never build a full Kimball warehouse, the habit of **declaring the grain and separating facts from dimensions** improves any analytical table.
