---
title: "Degenerate Dimension"
summary: "A dimension attribute, like an order number, stored directly in the fact table."
levels: { data-engineer: senior }
aliases: ["degenerate dimensions", "degenerate dimension key", "degenerate key", "order number dimension"]
prereqs: ["fact-table", "dimension-table"]
related: ["dimensional-modeling", "grain", "junk-dimension", "factless-fact-table", "surrogate-key-dw", "slowly-changing-dimension"]
---

A **degenerate dimension** is a dimension key that has **no attributes of its own**, so it stays as a column in the [fact table](/t/fact-table) instead of getting its own dimension table. Order numbers, invoice numbers and ticket IDs are the usual examples.

```
fact_order_items
order_number | order_line | product_key | date_key | quantity | amount
```

`order_number` identifies the order, but at the order-line grain there is nothing else to say about an order that isn't already in another dimension (the customer, the date). A `dim_order` table holding only `order_number` would have one meaningful column and no descriptive value, so you keep the key where it's used.

## Why it matters

Analysts group and filter by these keys all the time: `WHERE order_number = 'A-917'`, or counting distinct orders in a period. Keeping the key in the fact lets them do that without a pointless join. It also ties together the fact rows that belong to one transaction.

## Common mistakes

- Confusing it with the fact table's primary key. The degenerate dimension is the **business key** from the source (`order_number`), not the warehouse-generated row identifier.
- Counting rows when you mean distinct orders. At the line-item grain the order number repeats on every line, so `COUNT(order_number)` overcounts. Use `COUNT(DISTINCT order_number)`.
- Letting it grow attributes. The moment an order gains real descriptive fields — channel, status, sales rep — it deserves a proper dimension table, and the key moves there.
- Dumping unrelated codes into the fact. Small flags are usually better collected into a [junk dimension](/t/junk-dimension).

## Trade-offs

Storing the key in the fact is cheap and keeps the model honest: a dimension table is for describing things, and this key describes nothing. The cost is that you lose a single place to attach order-level attributes later, and text keys such as an invoice number take space in a very large table. If you find yourself adding the same non-key columns to the fact, that's the signal to promote it to a dimension.
