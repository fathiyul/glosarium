---
title: "Dataset"
summary: "A named collection of related data, like a table or a set of files."
levels: { data-engineer: junior, backend: junior }
aliases: ["data set", "table", "data collection"]
prereqs: ["database"]
related: ["data-pipeline", "structured-semi-unstructured", "documenting-datasets", "data-catalog", "data-product", "schema"]
---

A dataset is a named collection of related data, treated as one unit: a database table, a CSV file, a folder of Parquet files, the results of a query. Examples: `orders`, `customers`, or "all clickstream events for 2026".

What makes it a dataset rather than a pile of bytes is that you can **name it, describe it and rely on its shape**. Someone should be able to say what each row represents, what columns it has, where it lives and how fresh it is.

```
Dataset: orders
Row = one customer order
Columns: order_id, customer_id, total_amount, currency, created_at, status
Location: warehouse.sales.orders
Updated: every hour
```

## Why this matters for a data engineer

Most of the job is producing, moving, combining and maintaining datasets. Pipelines take datasets as input and output new ones. When someone downstream asks "can I use this?", the answer depends on the dataset's definition.

## Questions to be able to answer about any dataset

- **What does one row mean?** (the grain: one order? one line item? one day per customer?)
- **Where does it come from**, and how often does it update?
- **Who owns it** and who do you ask about it?
- What are the columns, types and any known quirks?
- How reliable is it? Missing data, duplicates, late arrivals.

Skipping these questions is the classic mistake: two analysts use two similar tables and report different numbers, because nobody wrote down what each contains. Short written documentation helps a lot. See [documenting datasets](/t/documenting-datasets) and the [data catalog](/t/data-catalog).

The term is used loosely; in some tools "dataset" means a collection of tables, so check the local meaning.
