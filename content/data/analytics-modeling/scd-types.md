---
title: "SCD Types 1, 2 and 3"
summary: "Overwrite, add a versioned row, or keep a previous-value column."
levels: { data-engineer: mid-level , data-analyst: mid-level , data-scientist: mid-level }
aliases: ["SCD Type 1", "SCD Type 2", "SCD Type 3", "slowly changing dimension types", "Type 2 dimension"]
prereqs: ["slowly-changing-dimension", "dimension-table"]
related: ["slowly-changing-dimension", "surrogate-key-dw", "dimension-table", "merge-statement", "fact-table", "append-vs-merge"]
core: [data-engineer, data-scientist]
---

When a dimension attribute changes (a customer moves from Jakarta to Singapore), you choose **how to record it**. The standard options are called SCD types.

Starting row: customer 42, city = Jakarta. The customer moves to Singapore.

| Type | Approach | Result | History kept? |
|---|---|---|---|
| **Type 0** | Never change it | Stays Jakarta | Original value only |
| **Type 1** | **Overwrite** the old value | city = Singapore | **No.** Old facts now appear to belong to Singapore |
| **Type 2** | **Add a new row** with validity dates | Two rows: Jakarta (until the move) and Singapore (from the move) | **Full history** |
| **Type 3** | Keep a **previous-value column** | `city = Singapore`, `previous_city = Jakarta` | Only the last change |

## Type 2 in detail (the most important)

```
customer_key | customer_id | city      | valid_from | valid_to   | is_current
1001         | 42          | Jakarta   | 2022-01-10 | 2024-05-31 | false
1002         | 42          | Singapore | 2024-06-01 | 9999-12-31 | true
```

- Each version gets its own **surrogate key** (`customer_key`), while `customer_id` is the business key ([surrogate keys](/t/surrogate-key-dw)).
- A **fact row stores the surrogate key of the version that was current when the event happened**, so an order from 2023 joins to the Jakarta row, and a 2024-06-15 order to Singapore. Reports show history as it was.
- Querying current state: `WHERE is_current`. Point-in-time analysis: join on the key stored in the fact, or on `valid_from <= event_date < valid_to`.

A simplified load:

```sql
-- 1. close the current row of changed customers
UPDATE dim_customer d SET valid_to = CURRENT_DATE - 1, is_current = false
FROM staging s WHERE d.customer_id = s.customer_id AND d.is_current AND d.city <> s.city;

-- 2. insert new versions for changed or brand-new customers
INSERT INTO dim_customer (customer_id, city, valid_from, valid_to, is_current)
SELECT s.customer_id, s.city, CURRENT_DATE, DATE '9999-12-31', true
FROM staging s LEFT JOIN dim_customer d ON d.customer_id = s.customer_id AND d.is_current
WHERE d.customer_id IS NULL OR d.city <> s.city;
```

(Real implementations usually use `MERGE`, and handle all tracked columns and deletes.)

## Choosing

- **Type 1** for corrections and attributes where history doesn't matter (fixing a typo).
- **Type 2** when analysis needs the attribute **as it was at the time** (region, segment, plan).
- **Type 3** rarely, when you only need "current and previous".
- You can mix types per column in one dimension. There are hybrids too (Type 6).

Type 2 grows the table and complicates joins, and needs reliable change detection. Track only the attributes whose history matters. See [slowly changing dimensions](/t/slowly-changing-dimension).
