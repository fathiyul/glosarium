---
title: "Junk Dimension"
summary: "Grouping small flags and indicators into one dimension."
levels: { data-engineer: senior }
aliases: ["junk dimensions", "junk dim", "miscellaneous dimension", "indicator dimension"]
prereqs: ["dimension-table", "fact-table"]
related: ["degenerate-dimension", "dimensional-modeling", "surrogate-key-dw", "grain", "slowly-changing-dimension", "conformed-dimension"]
---

A **junk dimension** collects a set of small, low-cardinality flags and codes — order status, payment type, is_gift, sales channel — into one [dimension table](/t/dimension-table), with a surrogate key. The fact table stores a single key instead of a column for each flag.

```
dim_order_flags
order_flags_key | order_status | payment_type | is_gift | channel
1               | shipped      | card         | false   | web
2               | pending      | invoice      | true    | store
```

Each row is one **distinct combination** of the flags. The table is usually tiny compared to the fact table, because it holds the cross-product of a few small attributes, not one row per transaction.

## Why it matters

The classic mistake is adding every small flag directly to the fact table. Ten flag columns bloat a table with billions of rows, mix descriptive attributes in with the measures, and make the fact table harder to read. The opposite mistake is creating a separate dimension for each flag, so every query picks up several extra joins.

A junk dimension groups these odds and ends into one place, keeps the fact narrow, and gives a single view of which combinations actually occur.

## When it works

- The flags are few and each has **low cardinality** (a handful of values).
- Their distinct combinations are manageable. If two flags each have ten values and they combine freely, that's up to a hundred rows — fine. Add more flags and the cross-product can explode.
- The attributes are genuinely miscellaneous: they describe the event but don't belong to an existing entity.

## When it doesn't

- Attributes that belong to a real dimension, such as a customer's tier or a product's category, should stay with that dimension.
- High-cardinality or mostly independent attributes turn the junk dimension into a large, awkward table; model them separately.
- If a flag's value changes over time and you need history, it needs the same treatment as any dimension attribute ([slowly changing dimensions](/t/slowly-changing-dimension)).

Some teams find junk dimensions add indirection for little gain and prefer a few flag columns in the fact. That's a reasonable call when the flags are stable and rarely queried — but keep them out of the measures.
