---
title: "Star vs Snowflake Schema"
summary: "Simpler queries vs less duplication."
levels: { data-engineer: mid-level , data-analyst: mid-level }
aliases: ["star schema vs snowflake schema", "snowflake vs star", "star or snowflake", "normalized dimensions vs denormalized dimensions"]
prereqs: ["star-schema", "normalization"]
related: ["star-schema", "snowflake-schema", "normalization", "denormalization", "dimension-table", "one-big-table"]
core: [data-engineer]
---

Both are dimensional models: a central fact table with dimension tables around it. The difference is whether the **dimensions are denormalized (star)** or **normalized into sub-tables (snowflake)**.

```
STAR: each dimension is one flat table
 fact_sales ─► dim_product (product_id, name, subcategory, category, department)

SNOWFLAKE: the dimension is split into related tables
 fact_sales ─► dim_product ─► dim_subcategory ─► dim_category ─► dim_department
```

| | **Star** | **Snowflake** |
|---|---|---|
| Dimension tables | Flat, denormalized | Normalized into hierarchy tables |
| Joins per query | Fewer (fact to each dimension) | More (chains of joins) |
| Query simplicity | Simple, easy for analysts and BI tools | More complex |
| Redundancy | Repeats values (the category name appears on every product) | Minimal duplication |
| Updating a shared value | Update many rows | Update one row |
| Storage | Slightly more | Slightly less |
| Query speed | Usually faster | Usually slower (more joins) |

## Which to choose

**Star is the usual default.** Today's analytical engines are columnar and compress repeated values very well, so the storage saved by snowflaking is small, while the extra joins cost query time and make the model harder to use. Simplicity matters because many people write queries against it.

Snowflaking can make sense when:

- A **sub-dimension is shared** by several dimensions, or is big and changes often, so maintaining it separately has real value.
- You have a **very large dimension with a very low-cardinality hierarchy** and strict storage or update constraints.
- You need to **enforce consistency** of a reference hierarchy from one source of truth.

Often, you can keep the **physical design** normalized in an earlier layer, and present a **star** to users in the final layer ([staging, intermediate and marts](/t/staging-intermediate-marts)).

## Related

- The star is a [denormalized](/t/denormalization) design on purpose. See [normalization](/t/normalization) for what is being traded off.
- At the far end is the [one big table](/t/one-big-table).
- Definitions: [star schema](/t/star-schema), [snowflake schema](/t/snowflake-schema).

Don't agonize over it. Pick the simplest model that answers your questions clearly, and keep it consistent.
