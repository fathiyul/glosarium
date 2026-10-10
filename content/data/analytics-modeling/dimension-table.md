---
title: "Dimension Table"
summary: "A table describing the who, what, where of facts, like customers or products."
levels: { data-engineer: junior , data-analyst: mid-level }
aliases: ["dimension", "dimension tables", "dim table", "dim_customer", "dimensions"]
prereqs: ["fact-table"]
related: ["fact-table", "dimensional-modeling", "date-dimension", "conformed-dimension", "slowly-changing-dimension", "role-playing-dimension"]
core: [data-engineer]
---

In [dimensional modeling](/t/dimensional-modeling), a **dimension table** describes the **who, what, where, when and how** around the
measurements in a [fact table](/t/fact-table): customers, products, stores, dates, campaigns. Facts hold numbers; dimensions hold
the labels you slice those numbers by.

```
dim_customer                          fact_orders
customer_key | name | country | tier   order_id | customer_key | product_key | date_key | amount
```

```sql
SELECT c.country, p.category, SUM(f.amount) AS revenue
FROM fact_orders f
JOIN dim_customer c ON c.customer_key = f.customer_key
JOIN dim_product  p ON p.product_key  = f.product_key
GROUP BY c.country, p.category;
```

Every `GROUP BY` and `WHERE` in a report is usually a dimension attribute.

## What a good dimension looks like

- **A surrogate key**: a meaningless integer or hash used by facts to point at the row, independent of the source system's ID. The
  business ID (`customer_id`) is kept as an attribute ([natural vs surrogate keys](/t/natural-vs-surrogate-key)).
- **Wide and descriptive**: many text-like attributes (name, segment, region, category, flags). Wide is fine.
- **Denormalized**: product, subcategory and category stored together in one table rather than split across several, so queries need
  fewer joins and are easier to understand.
- **Human-readable values**, not codes, for reporting (`"Premium"`, not `3`).
- **Few rows relative to facts** (millions of customers against billions of events), though some dimensions get large.

## Handling change

What happens when a customer moves country? Options, called slowly changing dimensions
([SCD](/t/slowly-changing-dimension)): overwrite the value (lose history), or add a new row with validity dates (keep it), so that old facts still show
the country they had at the time.

## Related ideas

- **[Conformed dimensions](/t/conformed-dimension)**: the same customer dimension shared by every fact table, so
  different subjects can be compared.
- **[Date dimension](/t/date-dimension)**: a calendar table.
- **[Role-playing dimensions](/t/role-playing-dimension)**: one dimension used several ways (order date and ship date).
- **[Junk dimensions](/t/junk-dimension)** and **[degenerate dimensions](/t/degenerate-dimension)** for low-value flags and
  transaction identifiers.

When designing one, ask: **what would an analyst want to filter and group by?** Put those attributes in.
