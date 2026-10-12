---
title: "Bridge Table"
summary: "Handling many-to-many relationships in a dimensional model."
levels: { data-engineer: senior , data-scientist: senior }
aliases: ["bridge tables", "many-to-many table", "associative table", "weighting table"]
prereqs: ["fact-table", "dimension-table"]
related: ["dimensional-modeling", "grain", "surrogate-key-dw", "star-schema", "slowly-changing-dimension", "conformed-dimension"]
---

A **bridge table** sits between a [fact table](/t/fact-table) and a [dimension](/t/dimension-table) when the relationship between them is **many-to-many**. Instead of one dimension key per fact row, it stores one row per pairing.

The classic case: a product belongs to several categories, and a category contains many products. A fact row can point at one `product_key`, but you can't squeeze three category keys into one column. A bridge resolves it:

```
dim_product ──┐
              ├── bridge_product_category ── dim_category
fact_sales ───┘

bridge_product_category
product_key | category_key | weight
```

## The fan-out problem

Joining a fact to a bridge **duplicates each fact row once per pairing**. If a product is in two categories, every sale of it appears twice, and `SUM(amount)` grouped by category double-counts the product's sales.

You have two honest choices:

- Accept the duplication when the question is "how much did each category's products sell?". Each category legitimately gets the full amount, and categories overlap. Say so in the report.
- Add a weighting factor so the amounts across categories add back to the original total. For a product in two categories, each pairing might carry a weight of `0.5`. Multiply the measure by the weight when aggregating. The right weights are a business decision, not a technical one, and they must be maintained.

```sql
SELECT c.category_name, SUM(f.amount * b.weight) AS allocated_revenue
FROM fact_sales f
JOIN bridge_product_category b ON b.product_key = f.product_key
JOIN dim_category c ON c.category_key = b.category_key
GROUP BY c.category_name;
```

## When to use it

- A genuinely many-to-many relationship the business needs to analyze: products to categories, accounts to customers, patients to diagnoses.
- A multi-valued dimension: one dimension attribute with several values per entity.

## Trade-offs

- It adds a table and a join, and the fan-out is an easy source of wrong totals, so document the grain and the weighting.
- A bridge is often factless — it records combinations, not measures ([factless fact table](/t/factless-fact-table)).
- Before building one, ask whether the relationship can be modeled as a proper dimension instead. A "primary category" attribute on the product dimension is simpler if the business only needs one.
- Weights and pairings change over time, which raises the same history questions as any dimension ([slowly changing dimensions](/t/slowly-changing-dimension)).
