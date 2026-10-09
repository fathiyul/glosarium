---
title: "Surrogate Keys in the Warehouse"
summary: "Warehouse-generated keys that stay stable when source IDs change."
levels: { data-engineer: mid-level }
aliases: ["surrogate keys", "warehouse surrogate key", "dimension surrogate key", "surrogate key in data warehouse", "hash key"]
prereqs: ["primary-key", "dimension-table"]
related: ["natural-vs-surrogate-key", "scd-types", "slowly-changing-dimension", "dimension-table", "fact-table", "primary-key"]
core: [data-engineer]
---

A **surrogate key** in a warehouse is a **meaningless, warehouse-generated key** (an integer or a hash) that identifies a row in a dimension table. Fact tables reference dimensions through it, instead of through the source system's own ID (the **business** or **natural key**).

```
dim_customer
customer_key (surrogate) | customer_id (business key) | name | city
1001                     | CUST-42                    | Ana  | Jakarta
fact_orders
order_id | customer_key | amount
917      | 1001         | 5000
```

## Why use them

- **Independence from source systems.** Source IDs can be reused, reformatted, merged or reissued after a migration. The warehouse key stays stable.
- **Combining several sources.** The same customer might be `42` in the app, `C-9001` in the CRM and an email address in billing. A surrogate key gives them one identity once they're matched.
- **History with SCD Type 2.** Each *version* of a dimension row needs its own key, since the business key repeats across versions ([SCD types](/t/scd-types)).
- **Compact, fast joins.** Integers join and compress better than long strings or composite keys.
- **Handling unknowns.** You can create special rows (such as key `-1` for "unknown" and `-2` for "not applicable"), so that facts with missing or late dimensions still join and aren't dropped by an inner join.

## How they're generated

- **Sequences or auto-increment integers**: simple, but order-dependent and awkward in distributed or parallel loads, and keys differ between environments.
- **Hashes of the business key (and version)**: deterministic. The same input always produces the same key, in any environment, which makes loads idempotent and parallel-friendly, with a small risk of collisions to be aware of. Common in modern SQL-based transformation tools.

```sql
-- deterministic surrogate key from the business key and the validity start
SELECT MD5(CONCAT(customer_id, '|', CAST(valid_from AS VARCHAR))) AS customer_key, ...
```

## Practices

- **Keep the business key as an attribute** in the dimension, so you can trace back to the source.
- **Add an "unknown member" row** to each dimension, and map missing keys to it.
- **Handle late-arriving dimension data**: a fact may arrive before its dimension row. Create a placeholder ("inferred member") and fill it in later.
- **Never expose surrogate keys as meaningful identifiers** to users, and don't reuse them.
- **Test them**: unique, not null, and every fact key matches a dimension row.

They're an application of the general [natural vs surrogate key](/t/natural-vs-surrogate-key) idea, with data warehouse-specific reasons. See [dimension tables](/t/dimension-table) and [primary keys](/t/primary-key).
