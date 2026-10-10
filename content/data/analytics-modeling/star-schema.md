---
title: "Star Schema"
summary: "One fact table joined directly to its dimension tables."
levels: { data-engineer: junior , data-analyst: mid-level }
aliases: ["star schema", "star model", "dimensional star", "fact and dimension tables star"]
prereqs: ["fact-table", "dimension-table"]
related: ["snowflake-schema", "star-vs-snowflake", "dimensional-modeling", "grain", "conformed-dimension", "one-big-table"]
core: [data-engineer, data-analyst]
---

A **star schema** has one central **fact table** surrounded by **dimension tables**, each joined directly to the fact through a key. Drawn out,
it looks like a star.

```
            dim_date
               │
 dim_customer ─┼─ fact_orders ─ dim_product
               │
            dim_store
```

```sql
SELECT d.year, p.category, c.country, SUM(f.amount) AS revenue
FROM fact_orders f
JOIN dim_date     d ON d.date_key     = f.date_key
JOIN dim_product  p ON p.product_key  = f.product_key
JOIN dim_customer c ON c.customer_key = f.customer_key
GROUP BY d.year, p.category, c.country;
```

Every analytical question has the same shape: **pick a measure from the fact table, then slice it by dimension attributes.** That
predictability is the point.

## What makes it a star

- The fact table holds **measures and foreign keys** at a declared [grain](/t/grain).
- Each dimension is **denormalized**: all the attributes (product, subcategory, category) live in one wide table, so there's only one join from
  the fact to each dimension.
- Dimensions don't link to other dimensions (that would make a snowflake).

## Why people use it

- **Simple queries**: few joins, easy to learn and for BI tools to generate.
- **Fast**: warehouses are tuned for this pattern, with a big fact table joined to small dimensions.
- **Understandable**: business people can read the model.
- **Consistent**: shared [conformed dimensions](/t/conformed-dimension) let several stars be combined.

## Trade-offs

- **Redundancy**: denormalized dimensions repeat values (the category name is stored on every product). Storage is cheap, and the
  trade is worth it for readability. Updating a name means updating many rows.
- **Not for operational workloads.** A star is for analysis, not for an app that writes orders. Application databases are normalized
  ([normalization](/t/normalization)).
- **Change handling**: dimension attributes change over time, so you must decide how to keep history
  ([slowly changing dimensions](/t/slowly-changing-dimension)).

The alternative with normalized dimensions is the [snowflake schema](/t/snowflake-schema). Compare them in
[star vs snowflake](/t/star-vs-snowflake). Some modern setups skip modeling entirely and use one wide table
([one big table](/t/one-big-table)).
