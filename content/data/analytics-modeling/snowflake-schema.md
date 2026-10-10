---
title: "Snowflake Schema"
summary: "A star schema whose dimensions are normalized into sub-tables."
levels: { data-engineer: mid-level }
aliases: ["snowflake schema", "snowflaked schema", "normalized star schema", "snowflake model"]
prereqs: ["star-schema", "normalization"]
related: ["star-vs-snowflake", "dimensional-modeling", "dimension-table", "denormalization", "one-big-table", "fact-table"]
---

A **snowflake schema** is a [star schema](/t/star-schema) whose dimensions are **normalized into sub-tables**. Instead of one flat `dim_product`, the product hierarchy is split into related tables: `dim_product` points at `dim_subcategory`, which points at `dim_category`.

```
fact_sales ─► dim_product ─► dim_subcategory ─► dim_category
```

It's the same fact-and-dimension shape as a star, but the dimensions branch out like a snowflake.

## Why people snowflake

- Less duplication. The category name is stored once in `dim_category`, not repeated on every product row.
- A shared hierarchy in one place. If a sub-dimension is used by several dimensions, or is large and changes often, keeping it separate avoids updating many rows.
- Consistency. A reference hierarchy owned by one source can be represented as one table.

## The classic mistake

Snowflaking every dimension "to be tidy" and then finding that each query needs a chain of joins, is slower, and is harder for analysts and BI tools to use. On modern columnar engines, repeated strings compress very well, so the storage saved is usually small, while the extra joins cost query time on every report.

## Trade-offs

| Star | Snowflake |
|---|---|
| One flat table per dimension | Dimensions split into sub-tables |
| Fewer joins, simpler queries | More joins per query |
| Repeats attribute values | Minimal duplication |
| Update many rows to rename a value | Update one row |

Snowflaking can be worth it when a sub-dimension is **shared** by several dimensions, is **large and changes often**, or must stay consistent with a source system of record. Otherwise the star is usually the better default.

## Where it fits

Many teams keep the data normalized in an earlier staging layer and present a star to users in the final layer, getting the storage and consistency benefits without the query cost. Compare the two designs in [star vs snowflake](/t/star-vs-snowflake), and see [dimensional modeling](/t/dimensional-modeling) for the process.

Note the name clash: a snowflake schema is unrelated to the Snowflake cloud data platform. The schema pattern predates the company.
